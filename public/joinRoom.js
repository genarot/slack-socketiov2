function joinRoom( roomName) {
    // Send the room name to the server
    nsSocket.emit('joinRoom', roomName, (newNumberOfUsers) => {
        // We want to update the room meber total now that we have joined
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfUsers} <span class="glyphicon glyphicon-user">`
    })
}
