import { useDraggable } from "@dnd-kit/core";
import champions from "../../data/champion.json";
import styles from "./ChampPool.module.css";

const BASE_URL = "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/";

const ChampPool = () => {
  return (
    <div>
      <h2>Champions</h2>
      <div className={styles.championsContainer}>
        {Object.entries(champions.data).map(([championId, championObj]) => {
          return (
            <DraggableChamp
              key={championId}
              championId={championId}
              championObj={championObj}
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
