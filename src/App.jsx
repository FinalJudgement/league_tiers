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

    setAppState((prevState) => {
      const newState = { ...prevState };
      newState.tierLists[activeTier].add(activeChamp);
      newState.championPool.delete(activeChamp);
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
