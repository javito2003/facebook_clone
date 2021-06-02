module.exports = function(io) {
    io.on('connection', socket => {
        console.log('new connection');

        socket.on('disconnect', data => {
            console.log('user disconnected');
        })
    })
}