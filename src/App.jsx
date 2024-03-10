import { DndContext } from "@dnd-kit/core";
import "./App.css";
import ChampPool from "./components/ChampPool";
import TierList, { initialState } from "./components/TierList";
import { useState } from "react";

function App() {
  const [tierListState, setTierListState] = useState(initialState);

  function handleDragEnd(event) {
    const draggedChampionId = event.active.data.current.id;
    const droppedTier = event.over.data.current.tierLabel;
    setTierListState((prevState) => {
      const currentTierState = prevState[droppedTier];
      return {
        ...prevState,
        [droppedTier]: [...currentTierState, draggedChampionId],
      };
    });
  }
  return (
    <>
      <h1>Bad Boys Tier List</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <TierList tierListState={tierListState} />
        <ChampPool />
      </DndContext>
    </>
  );
}

export default App;
