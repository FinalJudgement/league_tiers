import champions from "../../data/champion.json";
import styles from "./ChampPool.module.css";
const BASE_URL = "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/";

const ChampPool = () => {
  return (
    <div>
      <h2>Champions</h2>
      <button>Mid</button>
      <button>Top</button>
      <button>Bot</button>
      <button>Sup</button>
      <button>Jng</button>
      <div className={styles.championsContainer}>
        {Object.entries(champions.data).map(([championId, championObj]) => {
          return (
            <div key={championId}>
              <img
                src={`${BASE_URL}${championObj.image.full}`}
                alt={championObj.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChampPool;
