import { useDraggable } from "@dnd-kit/core";
import styles from "./ChampPool.module.css";
import { BASE_URL, CHAMP_DATA } from "../../data/constants";

const ChampPool = ({ champPoolState }) => {
  return (
    <div>
      <h2>Champions</h2>
      <div className={styles.championsContainer}>
        {[...champPoolState]
          .sort((a, b) => {
            if (a > b) {
              return 1;
            }
            return -1;
          })
          .map((championId) => {
            return (
              <DraggableChamp
                key={championId}
                championId={championId}
                championObj={CHAMP_DATA[championId]}
              />
            );
          })}
      </div>
    </div>
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

export default ChampPool;
