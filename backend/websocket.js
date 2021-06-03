module.exports = function(io) {
    let users = {}
    io.on('connection', socket => {
        console.log('new connection');

        socket.on('new-user', data => {
            socket.userId = data._id
            socket.userData = data
            users[socket.userId] = socket
            console.log(users);
            updateUsers(users)
        })

        socket.on('request', data => {
            if (data._id in users) {
                users[data._id].emit('new-request', 'hey')
                return
            } 
        })

        socket.on('disconnect', data => {
            console.log('user disconnected');
        })
    })

    function updateUsers(users){
        io.sockets.emit('users',Object.keys(users))
    }
}