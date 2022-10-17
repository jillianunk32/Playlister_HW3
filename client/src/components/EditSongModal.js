import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store'

function EditSongModal (){
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmEditSong (event){
        let newSongData = {
            title: this.state.title,
            artist: this.state.artist,
            youTubeId: this.state.youTubeId
        };
        store.updateSong(this.props.songIndex, newSongData);
    }

    function handleCancelEditSongModal (event){
        store.hideEditSongModal();
    }

    function handleUpdateTitle (event){
        this.setState(
            { title: event.target.value }
        );
    }

    function handleUpdateArtist (event){
        this.setState(
            { artist: event.target.value }
        );
    }

    function handleUpdateYouTubeId (event){
        this.setState(
            { youTubeId: event.target.value }
        );
    }

        return (
            <div
                id="edit-song-modal"
                className="modal"
                data-animation="slideInOutLeft">
                <div
                    id='edit-song-root'
                    className="modal-root">
                    <div
                        id="edit-song-modal-header"
                        className="modal-north">Edit Song</div>
                    <div
                        id="edit-song-modal-content"
                        className="modal-center">
                        <div id="title-prompt" className="modal-prompt">Title:</div>
                        <input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" defaultValue={""} onChange={handleUpdateTitle} />
                        <div id="artist-prompt" className="modal-prompt">Artist:</div>
                        <input id="edit-song-modal-artist-textfield" className='modal-textfield' type="text" defaultValue={""} onChange={handleUpdateArtist} />
                        <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                        <input id="edit-song-modal-youTubeId-textfield" className='modal-textfield' type="text" defaultValue={""} onChange={handleUpdateYouTubeId} />
                    </div>
                    <div className="modal-south">
                        <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={handleConfirmEditSong} />
                        <input type="button" id="edit-song-cancel-button" className="modal-button" value='Cancel' onClick={handleCancelEditSongModal} />
                    </div>
                </div>
            </div>
        );
    }

export default EditSongModal;