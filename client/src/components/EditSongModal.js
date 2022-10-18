import React, { useContext} from 'react';
import { GlobalStoreContext } from '../store'

function EditSongModal(){
    const { store } = useContext(GlobalStoreContext);

    let songTitle = "";
    let songArtist = "";
    let songYoutube = "";

    function handleConfirmEditSong(event){
        let newSongData = {
            title: songTitle,
            artist: songArtist,
            youTubeId: songYoutube
        };
        store.addEditSongTransaction(store.currentList.songs.indexOf(store.songEditActive), newSongData);
        store.hideEditSongModal();
    }

    function handleCancelEditSongModal(event){
        store.hideEditSongModal();
    }

    function handleUpdateTitle (event){
        songTitle = event.target.value;
    }

    function handleUpdateArtist (event){
        songArtist = event.target.value;
    }

    function handleUpdateYouTubeId (event){
        songYoutube = event.target.value;
    }

    let modalClass = "modal";
    if(store.songEditActive!=null){
        modalClass = "modal is-visible";
    }
    if(store.songEditActive!=null){
        return (
            <div
                id="edit-song-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
                <div
                    id='edit-song-root'
                    className="modal-dialog">
                    <div
                        id="edit-song-modal-header"
                        className="dialog-header">Edit Song</div>
                    <div
                        id="edit-song-modal-content"
                        className="modal-center">
                        <div id="title-prompt" className="modal-prompt">Title:</div>
                        <input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" defaultValue={store.songEditActive.title} onChange={handleUpdateTitle} />
                        <div id="artist-prompt" className="modal-prompt">Artist:</div>
                        <input id="edit-song-modal-artist-textfield" className='modal-textfield' type="text" defaultValue={store.songEditActive.artist} onChange={handleUpdateArtist} />
                        <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                        <input id="edit-song-modal-youTubeId-textfield" className='modal-textfield' type="text" defaultValue={store.songEditActive.youTubeId} onChange={handleUpdateYouTubeId} />
                    </div>
                    <div className="modal-close" id="confirm-cancel-container">
                        <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={handleConfirmEditSong} />
                        <input type="button" id="edit-song-cancel-button" className="close-modal-button" value='Cancel' onClick={handleCancelEditSongModal} />
                    </div>
                </div>
            </div>
        );
    }
    else{
        return null;
    }
}

export default EditSongModal;