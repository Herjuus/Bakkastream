const express = require('express');
const mongoose = require('mongoose');
const Parser = require("body-parser");

const app = express();
app.use(express.json());
app.use(Parser.json());
const port = 8888;

require('dotenv').config();

const streamDB = mongoose.createConnection(process.env.STREAM_URL);
const authDB = mongoose.createConnection(process.env.AUTH_URL);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const StreamSchema = streamDB.model('stream', mongoose.Schema({
  user: String,
  streamName: String,
  streamDescription: String,
  streamThumbnail: String,
}));

app.get('/streams', async (req, res) => {
    try {
        const streams = await StreamSchema.find();
        res.json(streams);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(port, () => console.log(`Api listening on port ${port}`));