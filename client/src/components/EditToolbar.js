import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";
    let disabledButtonClass = "playlister-button-disabled";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAddSong(){
        store.createNewSong();
    }
    let editStatus = false;
    if (store.listNameActive || store.songEditActive || store.songMarkedForDeletion) {
        editStatus = true;
    }
    return (
        <div id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={(store.currentList!=null && !editStatus) ? enabledButtonClass : disabledButtonClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={(store.tps.hasTransactionToUndo() && !editStatus) ? enabledButtonClass : disabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={(store.tps.hasTransactionToRedo() && !editStatus) ? enabledButtonClass : disabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={(store.currentList!=null && !editStatus) ? enabledButtonClass : disabledButtonClass}
                onClick={handleClose}
            />
        </div>);
}

export default EditToolbar;