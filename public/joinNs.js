function joinNs( endpoint) {
    nsSocket = io(`http://localhost:9000${endpoint}`, {
        path: '/socket10'
    });

    nsSocket.on('nsRoomLoad', nsRooms => {
        console.log('nsRoomLoad', nsRooms)
        const DOMRoomList = document.querySelector('.room-list');
        DOMRoomList.innerHTML = '';
        nsRooms.forEach(room => {
            let glyph = room.privateRoom ? 'lock' : 'globe';
            DOMRoomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
        })
        //  Add click listener to each room
        let roomNodes = document.getElementsByClassName("room");
        Array.from(roomNodes).forEach(room => {
            room.addEventListener('click', (evt) => {

                console.log('Someone click on ', evt.target)
            })
        })
        // Add room automatically.... the first time
        const topRoom = roomNodes.item(0);
        const topRoomName = topRoom.innerText;
        console.log('topRoomName', topRoomName)
        joinRoom(topRoomName)
    })
    document.querySelector('.message-form > form').addEventListener('submit', evt => {
        evt.preventDefault();
        nsSocket.emit('newMessageToServer', {text: evt.target.values})
        console.log('submit form message')
    })
}
