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
    if (event.over !== null) {
      const activeTier = event.over.data.current.tierLabel;
      setAppState((prevState) => {
        const newState = { ...prevState };

        Object.entries(newState.tierLists).forEach((key) => {
          if (key[1].has(activeChamp)) {
            key[1].delete(activeChamp);
          }
        });

        newState.tierLists[activeTier].add(activeChamp);
        newState.championPool.delete(activeChamp);
        return newState;
      });
    } else {
      setAppState((prevState) => {
        const newState = { ...prevState };

        Object.entries(newState.tierLists).forEach((key) => {
          if (key[1].has(activeChamp)) {
            key[1].delete(activeChamp);
          }
        });

        newState.championPool.add(activeChamp);

        return newState;
      });
    }
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
