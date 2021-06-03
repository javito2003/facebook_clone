const { createNotif } = require("./utils/notification");
const { offlineUser, onlineUser } = require("./utils/offlineUser");

module.exports = function(io) {
    let users = {}
    io.on('connection', socket => {
        console.log('new connection');

        socket.on('new-user', async data => {
            await onlineUser(data._id)
            socket.userId = data._id
            socket.userData = data
            users[socket.userId] = socket
            console.log(users);
            updateUsers(users)
        })

        socket.on('request', async data => {
            console.log(data);
            if (data._id in users) {
                users[data._id].emit('new-request', 'hey')
                users[data._id].emit('notification', 'lol')
                return
            } 
        })

        socket.on('accepted', data => {
            if (data._id in users) {
                users[data._id].emit('updateUser', 'update')
            }
        })

        socket.on('disconnect',async data => {
            await offlineUser(socket.userId)
            delete users[socket.userId]
            updateUsers(users)
        })
    })

    function updateUsers(users){
        io.sockets.emit('users',Object.keys(users))
        io.sockets.emit('setStatus', 'hey')
    }
}