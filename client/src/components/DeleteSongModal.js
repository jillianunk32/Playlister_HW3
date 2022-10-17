import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store'

function DeleteSongModal(){
    const { store } = useContext(GlobalStoreContext);

    let songTitle = "";
    if(store.songMarkedForDeletion){
        songTitle = store.songMarkedForDeletion.title;
    }

    function handleConfirmRemoveSong (event){
        store.deleteMarkedSong();
        store.hideDeleteSongModal();
    }

    function handleCancelRemoveSong (event){
        store.hideDeleteSongModal();
    }

    let modalClass = "modal";
    if(store.songMarkedForDeletion!=null){
        console.log(store.currentList);
        modalClass = "modal is-visible";
    }

    return (
            <div
                id="remove-song-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
                <div className="modal-dialog" id='verify-remove-song-root'>
                    <div className="dialog-header">
                        Remove {songTitle}?
                    </div>
                    <div className="modal-header">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently remove {songTitle} from the playlist?
                        </div>
                    </div>
                    <div className="modal-close" id ="confirm-cancel-container">
                        <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={handleConfirmRemoveSong} value='Confirm' />
                        <input type="button" id="remove-song-cancel-button" className="close-modal-button" onClick={handleCancelRemoveSong} value='Cancel' />
                    </div>
                </div>
            </div>
        );
}

export default DeleteSongModal;