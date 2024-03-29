import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";

import styles from "./TierList.module.css";
import { BASE_URL, CHAMP_DATA } from "../../data/constants";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const initialState = ["S", "A", "B", "C", "D", "F"]
  .map((tierLetter) => {
    return {
      label: tierLetter,
      champions: [],
    };
  })
  .reduce((acc, v) => {
    return { ...acc, [v.label]: v.champions };
  }, {});

const tierColors = {
  S: "red",
  A: "orange",
  B: "yellow",
  C: "green",
  D: "blue",
  F: "pink",
};

const TierList = ({ tierListState }) => {
  return (
    <div>
      <h2>Tiers</h2>
      <div className={styles.tierListContainer}>
        {Object.entries(tierListState).map(([tierLabel, champsInTierSet]) => {
          return (
            <DroppableTier
              key={tierLabel}
              tierLabel={tierLabel}
              champsInTierSet={champsInTierSet}
            />
          );
        })}
      </div>
    </div>
  );
};

const DroppableTier = ({ tierLabel, champsInTierSet }) => {
  const { setAppState } = useContext(AppContext);
  const { isOver, setNodeRef } = useDroppable({
    id: tierLabel,
    data: { tierLabel },
  });

  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <article
      className={styles.tierContainer}
      // key={tierLabel}
      ref={setNodeRef}
      style={style}
    >
      <h3
        className={styles.tierListLabel}
        style={{
          backgroundColor: tierColors[tierLabel],
        }}
      >
        {tierLabel}
      </h3>
      <section className={styles.tierContent}>
        {[...champsInTierSet].map((championId) => {
          const championObj = CHAMP_DATA[championId];
          return (
            <div
              key={championId}
              onClick={() => {
                setAppState((prevState) => {
                  const newState = { ...prevState };
                  newState.championPool.add(championId);
                  newState.tierLists[tierLabel].delete(championId);
                  return newState;
                });
              }}
            >
              <DraggableChamp
                key={championId}
                championId={championId}
                championObj={CHAMP_DATA[championId]}
              />
            </div>
          );
        })}
      </section>
    </article>
  );
};

const DraggableChamp = ({ championId, championObj }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: championId,
    data: championObj,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img
        src={`${BASE_URL}${championObj.image.full}`}
        alt={championObj.name}
      />
    </div>
  );
};

export default TierList;
