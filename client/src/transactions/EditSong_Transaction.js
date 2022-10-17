import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * UpdateSong_Transaction
 * 
 * This class represents a transaction that updates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author Jillian Unkenholz
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldSongData, initNewSongData) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.oldSongData = initOldSongData;
        this.newSongData = initNewSongData;
    }

    doTransaction() {
        this.store.editSong(this.index, this.newSongData);
    }
    
    undoTransaction() {
        this.store.editSong(this.index, this.oldSongData);
    }
}