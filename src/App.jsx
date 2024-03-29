import { DndContext } from "@dnd-kit/core";
import "./App.css";
import ChampPool from "./components/ChampPool";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";

import TierList from "./components/TierList";

function App() {
  const { appState, setAppState } = useContext(AppContext);
  function handleDragEnd(event) {
    const activeChamp = event.active.data.current.id;
    const activeTier = event.over.data.current.tierLabel;
    let deleteChamp = false;
    setAppState((prevState) => {
      const newState = { ...prevState };
      console.log()
      Object.entries(newState.tierLists).forEach((key) => {
        if(key[1].has(activeChamp)){
          if(newState.tierLists[activeTier] === key[1]){
            deleteChamp = true;
            newState.championPool.add(activeChamp)
          } else{
            deleteChamp = false;
          }
          key[1].delete(activeChamp);
        }
      })

      if(deleteChamp){

      } else {
        newState.tierLists[activeTier].add(activeChamp);
        newState.championPool.delete(activeChamp);
      }
      
      return newState;
    });
  }

  return (
    <>
      <h1>Bad Boys Tier List</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <TierList tierListState={appState.tierLists} />
        <ChampPool champPoolState={appState.championPool} />
      </DndContext>
    </>
  );
}

export default App;
