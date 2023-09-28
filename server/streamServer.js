const mongoose = require('mongoose');
const NodeMediaServer = require('node-media-server');

const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

require('dotenv').config();

const streamDB = mongoose.createConnection(process.env.STREAM_URL);

const StreamSchema = streamDB.model('stream', mongoose.Schema({
  user: String,
  streamName: String,
  streamDescription: String,
  streamThumbnail: String,
}));

const config = {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 60,
      ping_timeout: 30,
      applications: {},
    },
    http: {
      port: 8000,
      mediaroot: './media',
      allow_origin: '*',
    },
    trans: {
      ffmpeg: '/usr/bin/ffmpeg',
      tasks: [
        {
          // vc: 'libx264',
          app: 'live',
          ac: 'aac',
          hls: true,
          // hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
          dash: true,
        }
      ]
    }  
  };

const activeStreams = {};

const nms = new NodeMediaServer(config);

nms.on('prePublish', async (id, StreamPath, args) => {
  let session = nms.getSession(id);

  const streamKey = StreamPath.split('/').pop();
  const streamInfo = {
      startTime: new Date(),
  };
  activeStreams[streamKey] = streamInfo;
  console.log(`Stream ${streamKey} has started publishing at ${streamInfo.startTime}.`);

  const [app, stream] = await StreamPath.split('/');

  await prisma.user.findFirst({ where: {streamKey: streamKey} })
   .then(user => {
    const doc = new StreamSchema({
      user: user.username,
      streamName: user.streamName,
      streamDescription: user.streamDescription,
      streamThumbnail: user.streamThumbnail,
    });
    doc.save();
   })
   .catch(err => {
    session.reject();
    console.log(err);
   });

});
  
nms.on('donePublish', async (id, StreamPath, args) => {
  const streamKey = StreamPath.split('/').pop();
  const streamInfo = activeStreams[streamKey];
  const endTime = new Date();
  const duration = endTime - streamInfo.startTime;
  console.log(`Stream ${streamKey} has ended publishing after ${(duration / 1000)} seconds.`);
  delete activeStreams[streamKey];

  const streamString = streamKey.toString();
  console.log(streamString);

  await prisma.user.findFirst({ where: {streamKey: streamKey} })
   .then(user => {
    StreamSchema.findOneAndRemove({ user: user.username })
     .then((stream) => {
      if(!stream){
        console.log("Stream not found")
      } else {
        console.log(`Stream ${stream} was removed`);
      }
     })
     .catch(err => console.log(err));
   })
   .catch(err => console.log(err));
  
});
  
nms.run();