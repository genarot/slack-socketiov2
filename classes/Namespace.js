let instanceCounter = 0;
class Namespace{
    // static instanceCounter;
    constructor( nsTitle, img, endpoint){
        this.id = ++instanceCounter;
        this.img = img;
        this.nsTitle = nsTitle;
        this.endpoint = endpoint;
        this.rooms = [];
    }

    addRoom(roomObj){
        this.rooms.push(roomObj);
    }

}

module.exports = Namespace;
