import './App.css';
import  React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar } from './components'
import { GlobalStoreContext } from './store';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    const {store} = useContext(GlobalStoreContext);
    function handleKeyDown(event){
        if(event.key==="z" && event.ctrlKey){
            if (store.tps.hasTransactionToUndo()) {
                store.undo();
            }
        }
        else if(event.key==="y" && event.ctrlKey){
            if (store.tps.hasTransactionToRedo()) {
                store.redo();
            }
        }
    }
    return (
        <div id="app-root" onKeyDown={handleKeyDown}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Tangerine"></link> 
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
        </Router>
        </div>
    )
}

export default App