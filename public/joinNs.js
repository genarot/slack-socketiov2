function joinNs(endpoint) {
    console.log('Joining to namespace', endpoint);
    nsSocket = io(`http://localhost:3000${endpoint}`, {
        // path: '/socket10'
    });

    nsSocket.on('nsRoomLoad', nsRooms => {
        console.log('nsRoomLoad', nsRooms);
        const DOMRoomList = document.querySelector('.room-list');
        DOMRoomList.innerHTML = '';
        nsRooms.forEach(room => {
            let glyph = room.privateRoom ? 'lock' : 'globe';
            DOMRoomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
        });
        //  Add click listener to each room
        let roomNodes = document.getElementsByClassName("room");
        Array.from(roomNodes).forEach(room => {
            room.addEventListener('click', (evt) => {

                console.log('Someone click on ', evt.target)
            })
        });
        // Add room automatically.... the first time
        const topRoom = roomNodes.item(0);
        const topRoomName = topRoom.innerText;
        console.log('topRoomName', topRoomName);
        joinRoom(topRoomName)
    });

    nsSocket.on('messageToClients', (msg) => {
        console.log('New Message to client: ', msg);
        const newMsg =  buildHTML(msg);
        document.querySelector('#messages').innerHTML += newMsg;
    });

    document.querySelector('#user-input').addEventListener('submit', evt => {
        evt.preventDefault();
        let message = document.querySelector('#user-message');
        console.log(message.value);
        nsSocket.emit('newMessageToServer', {text: message.value});
        console.log('submit form message')
    })
}

function buildHTML(msg) {
    const convertedDate = new Date(msg.time).toLocaleString();
    const newHTMl = `
        <li>
            <div class="user-image">
                <img src="${msg.avatar}" />
            </div>
            <div class="user-message">
                <div class="user-name-time">${msg.username}<span>${convertedDate}</span></div>
                <div class="message-text">${msg.text}</div>
            </div>
        </li>
    `
    return newHTMl;
}
