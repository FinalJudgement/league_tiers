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
      <div>
        {Object.entries(initialState).map(([tierLabel, champsInTier]) => {
          return (
            <article
              style={{ display: "flex", margin: "2rem" }}
              key={tierLabel}
            >
              <h3
                style={{
                  backgroundColor: tierColors[tierLabel],
                  width: "5rem",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "2rem",
                  padding: "20px",
                }}
              >
                {tierLabel}
              </h3>
              <section style={{ backgroundColor: "grey", width: "100px" }}>
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
