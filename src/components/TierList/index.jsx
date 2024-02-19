import styles from "./TierList.module.css";

const initialState = ["S", "A", "B", "C", "D", "F"]
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

console.log("Object.entries:", Object.entries(initialState));
const TierList = () => {
  return (
    <div>
      <h2>Tiers</h2>
      <div className={styles.tierListContainer}>
        {Object.entries(initialState).map(([tierLabel, champsInTier]) => {
          return (
            <article className={styles.tierContainer} key={tierLabel}>
              <h3
                className={styles.tierListLabel}
                style={{
                  backgroundColor: tierColors[tierLabel],
                }}
              >
                {tierLabel}
              </h3>
              <section className={styles.tierContent}>
                {champsInTier.map(({ champName, champImgUrl }) => {
                  return <h4 key={champName}>champName</h4>;
                })}
              </section>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default TierList;
