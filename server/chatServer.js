const io = require("socket.io")(8081, {
    cors: {
        origin: ["http://10.58.177.98:3000/"]
    }
})

io.on("connection", socket => {
    socket.on("send-message", (data) => {
        io.emit("recieve-message", data)
        console.log(data);
    });
});