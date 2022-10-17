import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * CreateSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Jillian Unkenholz
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        this.store.addSong(this.index, this.song.title, this.song.artist, this.song.youTubeId);
    }
    
    undoTransaction() {
        this.store.deleteMarkedSong(this.index);
    }
}