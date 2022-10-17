import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction'
import EditSong_Transaction from '../transactions/EditSong_Transaction'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    SET_SONG_EDIT_ACTIVE: "SET_SONG_EDIT_ACTIVE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listMarkedForDeletion: null,
        songMarkedForDeletion: null,
        songEditActive: null
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songEditActive: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songEditActive: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songEditActive: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songEditActive: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: payload,
                    songMarkedForDeletion: null,
                    songEditActive: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songEditActive: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songEditActive: null
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: payload,
                    songEditActive: null
                });
            }
            case GlobalStoreActionType.SET_SONG_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listMarkedForDeletion: null,
                    songMarkedForDeletion: null,
                    songEditActive: payload,
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    store.createNewList = function () {
        let playlist = {"name": "Untitled","songs": []};
        async function asyncCreateNewPlaylist(playlist){
            let response = await api.createNewList(playlist);
            if(response.data.success){
                let newList = response.data.playlist;
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: newList
                    });
                    store.history.push("/playlist/" + newList._id);
            }
            else {
                console.log("API FAILED TO MAKE LIST");
            }
        }
        asyncCreateNewPlaylist(playlist);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.markListForDeletion = function (id) {
        async function markList(id){
            let response = await api.getPlaylistById(id);
            if(response.data.success){
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: response.data.playlist
                });
            }
        }
        markList(id);
    }

    store.hideDeleteListModal = function (){
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    store.deleteMarkedList = function (){
        async function asyncDeleteList(){
            let r = await api.deletePlaylistById(store.listMarkedForDeletion._id);
            if(r.data.success){
                store.history.go();
            }
            else{
                console.log("DID NOT DELETE");
            } 
        }
        asyncDeleteList();
    }

    store.addAddSongTransaction = function (index, title, artist, youTubeId){
        let newSong ={
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new AddSong_Transaction(store, index, newSong);
        tps.addTransaction(transaction);
    }

    store.createNewSong = function(){
        let index = store.getPlaylistSize();
        let newSong = {"title": "Untitled", "artist": "Unknown", "youTubeId": "dQw4w9WgXcQ"};
        store.addAddSongTransaction(index, newSong.title, newSong.artist, newSong.youTubeId);
    }

    store.addSong = function (index, title, artist, youTubeId){
        let newSong ={
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.currentList.songs.splice(index, 0, newSong);
        async function asyncUpdateSongs(){
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if(response.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: store.currentList
                    });
                    store.history.push("/playlist/"+store.currentList._id);
                }
        }
        asyncUpdateSongs();
    }

    store.addMoveSongTransaction = function (start, end){
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.moveSong = function (end, start){
        let list = store.currentList;
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }
        async function asyncUpdateSongs(){
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if(response.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: store.currentList
                    });
                    store.history.push("/playlist/"+store.currentList._id);
                }
        }
        asyncUpdateSongs();

    }

    store.addDeleteSongTransaction = function (index, song){
        let transaction = new DeleteSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }

    store.markSongForDeletion = function (index) {
        let song = store.currentList.songs[index];
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: song
        });
    }

    store.hideDeleteSongModal = function (){
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: null
        });
    }

    store.deleteMarkedSong = function (index){
        let list = store.currentList;
        console.log("index " + index);
        list.songs.splice(index, 1);
        async function asyncUpdateSongs(){
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if(response.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: store.currentList
                    });
                    store.history.push("/playlist/"+store.currentList._id);
                }
        }
        asyncUpdateSongs();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setSongEditActive = function (index) {
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_EDIT_ACTIVE,
            payload: this.currentList.songs[index]
        });
    }

    store.hideEditSongModal = function (){
        storeReducer({
            type: GlobalStoreActionType.SET_SONG_EDIT_ACTIVE,
            payload: null
        });
    }

    store.editSong = function (index, newSong){
        let list = store.currentList;
        let song = list.songs[index];
        song.title = newSong.title;
        song.artist = newSong.artist;
        song.youTubeId = newSong.youTubeId;
        async function asyncUpdateSongs(){
            let response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if(response.data.success){
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: store.currentList
                    });
                    store.history.push("/playlist/"+store.currentList._id);
                }
        }
        asyncUpdateSongs();
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}