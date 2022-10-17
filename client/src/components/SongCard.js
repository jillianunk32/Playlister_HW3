import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const [ songMarked, setSongMarked ] = useState(false);
    const { song, index } = props;

    function handleDragStart(event){
        event.dataTransfer.setData("song", props.index);
    }

    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDragEnter(event){
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event){
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event){
        event.preventDefault();
        let targetIndex = props.index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);
        store.addMoveSongTransaction(targetIndex, sourceIndex);
    }
    function handleDeleteSong(event){
        event.stopPropagation();
        let song = event.target.id;
        song = ("" + song).substring("remove-song-".length)
        setSongMarked(store.currentList.songs[song]);
        store.markSongForDeletion(song);
    }
    function handleEditSong(event){
        if(event.detail===2){
            store.setSongEditActive(props.index);
        }
    }

    let cardClass = "list-card unselected-list-card";
    if(draggedTo){
        cardClass = "list-card selected-list-card";
    }
    if(songMarked){
        cardClass = "list-card selected-list-card";
    }
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleEditSong}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleDeleteSong}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;