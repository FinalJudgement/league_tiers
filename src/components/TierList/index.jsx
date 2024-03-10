import { useDroppable } from "@dnd-kit/core";
import styles from "./TierList.module.css";

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
        {Object.entries(tierListState).map(([tierLabel, champsInTier]) => {
          return (
            <DroppableTier
              key={tierLabel}
              tierLabel={tierLabel}
              champsInTier={champsInTier}
            />
          );
        })}
      </div>
    </div>
  );
};

const DroppableTier = ({ tierLabel, champsInTier }) => {
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
        {champsInTier.map((championId) => {
          return <p key={championId}>{championId}</p>;
        })}
      </section>
    </article>
  );
};

export default TierList;
