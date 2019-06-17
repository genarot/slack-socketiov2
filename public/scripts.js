const socket = io('http://localhost:9000',{
    path: '/socket10',
});
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

socket.on('nsList', nsData => {
    console.log('The list of namespaces, received is', nsData);
    const DOMNamespaces =  document.querySelector('.namespaces');
    DOMNamespaces.innerHTML = '';
    function clickListener(evt) {
        const nsEndpoint = evt.target.parentElement.getAttribute('ns');
        console.log(`I should go to ${nsEndpoint}`)
    }
    nsData.forEach(ns => {
        nodeNamespace(ns, DOMNamespaces, clickListener);
    })
    joinNs('/wiki')
})
