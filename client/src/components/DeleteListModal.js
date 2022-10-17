import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store'

function DeleteListModal(){
    const { store } = useContext(GlobalStoreContext);

    let playlistTitle = "";
    if(store.isListMarkedForDeletion){
        playlistTitle = store.listMarkedForDeletion.name;
    }

    function handleConfirmRemoveList (event){
        store.deleteMarkedList();
        store.hideDeleteListModal();
    }

    function handleCancelRemoveList (event){
        store.hideDeleteListModal();
    }

    let modalClass = "modal";
    if(store.listMarkedForDeletion!=null){
        modalClass = "modal is-visible";
        playlistTitle = store.listMarkedForDeletion.name;
    }

    return (
            <div
                id="remove-list-modal"
                className={modalClass}
                data-animation="slideInOutLeft">
                <div className="modal-dialog" id='verify-remove-list-root'>
                    <div className="dialog-header">
                        Remove {playlistTitle}?
                    </div>
                    <div className="modal-header">
                        <div className="modal-center-content">
                            Are you sure you wish to permanently delete the {playlistTitle} playlist?
                        </div>
                    </div>
                    <div className="modal-close" id="confirm-cancel-container">
                        <input type="button" id="remove-list-confirm-button" className="modal-button" onClick={handleConfirmRemoveList} value='Confirm' />
                        <input type="button" id="remove-list-cancel-button" className="close-modal-button" onClick={handleCancelRemoveList} value='Cancel' />
                    </div>
                </div>
            </div>
        );
}

export default DeleteListModal;