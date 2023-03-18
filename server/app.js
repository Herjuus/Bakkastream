const NodeMediaServer = require('node-media-server');

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
      allow_origin: '*',
    },
  };

const activeStreams = {};

const nms = new NodeMediaServer(config);

nms.on('prePublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/').pop();
    const streamInfo = {
        startTime: new Date(),
    };
    activeStreams[streamKey] = streamInfo;
    console.log(`Stream ${streamKey} has started publishing at ${streamInfo.startTime}.`);
});
  
nms.on('donePublish', (id, StreamPath, args) => {
    const streamKey = StreamPath.split('/').pop();
    const streamInfo = activeStreams[streamKey];
    const endTime = new Date();
    const duration = endTime - streamInfo.startTime;
    console.log(`Stream ${streamKey} has ended publishing after ${(duration / 1000)} seconds.`);
    delete activeStreams[streamKey];
});

nms.run();