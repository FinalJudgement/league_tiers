import { useState, useEffect } from "react";
import champions from "../../data/champion.json";
import styles from "./ChampPool.module.css";
const BASE_URL = "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/";

const ChampPool = () => {
  const [originalChampPool, setOriginalChampPool] = useState([]);
  const [filteredChampPool, setFilteredChampPool] = useState([]);

  useEffect(() => {
    const objToArr = () => {
      const arr = Object.entries(champions.data).map((v) => v[1]);
      setOriginalChampPool(arr);
      setFilteredChampPool(arr);
    };
    objToArr();
  }, []);

  const sortPool = (searchText) => {
    if (searchText.trim() === "") {
      setFilteredChampPool(originalChampPool);
    } else {
      const updatedPool = originalChampPool.filter((obj) => {
        return obj.name
          .slice(0, searchText.length)
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      setFilteredChampPool(updatedPool);
    }
  };

  return (
    <div>
      <h2>Champions</h2>
      <button>Mid</button>
      <button>Top</button>
      <button>Bot</button>
      <button>Sup</button>
      <button>Jng</button>
      <form>
        <label htmlFor="search">
          Search:
          <input
            type="text"
            id="search"
            name="search"
            onChange={(e) => sortPool(e.target.value)}
          />
        </label>
      </form>
      <div className={styles.championsContainer}>
        {
          filteredChampPool.map((championObj) => {
            return (
              <div key={championObj.id}>
                <img
                  src={`${BASE_URL}${championObj.image.full}`}
                  alt={championObj.name}
                />
              </div>
            );
          })
          /* {Object.entries(champions.data).map(([championId, championObj]) => {
          return (
            <div key={championId}>
              <img
                src={`${BASE_URL}${championObj.image.full}`}
                alt={championObj.name}
              />
            </div>
          );
        })} */
        }
      </div>
    </div>
  );
};

export default ChampPool;
