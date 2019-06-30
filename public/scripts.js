const socket = io('http://localhost:3000');
let nsSocket = "";

const nodeNamespace = (nsInfo, nsDOM, clickListener) => {
    const node = document.createElement('div');
    node.classList.add('namespace');
    node.setAttribute('ns', nsInfo.endpoint);
    const img = document.createElement('img');
    img.setAttribute('src', nsInfo.img);
    node.appendChild(img);
    node.addEventListener('click', clickListener);
    nsDOM.appendChild(node);
};
socket.on("connect" , ()=> {
    socket.emit('REGISTER_USER','genaro' )
})
socket.on("CLOSE_SESSION", () =>{
    alert('ya vali verga')
})
socket.on('group-activity-10', (newUser) => {
    console.log('Activity en el grupo 10')
})
socket.on("disconnect", () => {
    console.log("malditos me desconectaron")
})
socket.on('nsList', nsData => {
    console.log('The list of namespaces, received is', nsData);
    const DOMNamespaces =  document.querySelector('.namespaces');
    DOMNamespaces.innerHTML = '';
    function clickListener(evt) {
        // if (event.currentTarget !== event.target) {
        //     return;
        // }
        console.log(event.currentTarget, event.target)
        const nsEndpoint = evt.currentTarget.getAttribute('ns');
        console.log(`I should go to ${nsEndpoint}`)
        // joinNs(nsEndpoint);
    }
    nsData.forEach(ns => {
        nodeNamespace(ns, DOMNamespaces, clickListener);
    })
    // joinNs('/wiki')
})
