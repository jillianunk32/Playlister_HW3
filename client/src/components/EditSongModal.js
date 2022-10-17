import React, { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'

function EditSongModal (){
    const { store } = useContext(GlobalStoreContext);
    const [ changeTitle, setChangeTitle] = useState(0);
    const [ changeArtist, setChangeArtist] = useState(0);
    const [ changeYoutube, setChangeYoutube] = useState(0);

    let songTitle = "";
    let songArtist = "";
    let songYoutube = "";
    if(store.songEditActive!=null){
        songTitle = store.songEditActive.title;
        songArtist = store.songEditActive.artist;
        songYoutube = store.songEditActive.youTubeId;
    }

    function handleConfirmEditSong(){
        let newSongData = {
            title: changeTitle,
            artist: changeArtist,
            youTubeId: changeYoutube
        };
        console.log(newSongData);
        console.log(store.songEditActive);
        store.addEditSongTransaction(store.currentList.songs.indexOf(store.songEditActive), newSongData);
        store.hideEditSongModal();
    }

    function handleCancelEditSongModal(){
        store.hideEditSongModal();
    }

    function handleUpdateTitle (event){
        setChangeTitle(event.target.value);
    }

    function handleUpdateArtist (event){
        setChangeArtist(event.target.value);
    }

    function handleUpdateYouTubeId (event){
        setChangeYoutube(event.target.value);
    }

    let modalClass = "modal";
    if(store.songEditActive!=null){
        modalClass = "modal is-visible";
    }

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
                        <input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" defaultValue={songTitle} onChange={handleUpdateTitle} />
                        <div id="artist-prompt" className="modal-prompt">Artist:</div>
                        <input id="edit-song-modal-artist-textfield" className='modal-textfield' type="text" defaultValue={songArtist} onChange={handleUpdateArtist} />
                        <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                        <input id="edit-song-modal-youTubeId-textfield" className='modal-textfield' type="text" defaultValue={songYoutube} onChange={handleUpdateYouTubeId} />
                    </div>
                    <div className="modal-close" id="confirm-cancel-container">
                        <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={handleConfirmEditSong} />
                        <input type="button" id="edit-song-cancel-button" className="close-modal-button" value='Cancel' onClick={handleCancelEditSongModal} />
                    </div>
                </div>
            </div>
        );
    }

export default EditSongModal;