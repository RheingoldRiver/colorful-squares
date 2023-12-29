import { Dispatch, SetStateAction, useState } from "react";
import "./App.css";
import { range } from "lodash";

const CELLS_THAT_EXIST = [
  {
    i: 0,
    j: 0,
  },
  {
    i: 0,
    j: 1,
  },
  {
    i: 0,
    j: 2,
  },
  {
    i: 0,
    j: 3,
  },
  {
    i: 0,
    j: 4,
  },
  {
    i: 1,
    j: 2,
  },
  {
    i: 2,
    j: 2,
  },
  {
    i: 3,
    j: 2,
  },
  {
    i: 4,
    j: 2,
  },
  {
    i: 1,
    j: 1,
  },
  {
    i: 3,
    j: 3,
  },
  {
    i: 4,
    j: 4,
  },
];

type Coordinates = {
  i: number;
  j: number;
};

type Bingos = Coordinates[][];

const containsObjectLoosely = (arr, obj) => {
  return arr.some((element) => {
    return Object.keys(obj).every((key) => obj[key] === element[key]);
  });
};

function App() {
  const [bingosHovered, setBingosHovered] = useState<Bingos>([]);

  const bingos: Bingos = [];
  range(5).forEach((i) => {
    if (
      range(0, 5).filter((j) => {
        return containsObjectLoosely(CELLS_THAT_EXIST, { i, j });
      }).length === 5
    ) {
      bingos.push(range(0, 5).map((j) => ({ i, j })));
    }
    if (
      range(0, 5).filter((j) => {
        return containsObjectLoosely(CELLS_THAT_EXIST, { j: i, i: j });
      }).length === 5
    ) {
      bingos.push(range(0, 5).map((j) => ({ j: i, i: j })));
    }
  });

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto auto",
          gridAutoFlow: "row",
          width: "250px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {range(5).map((i) =>
          range(5).map((j) => (
            <Cell
              i={i}
              j={j}
              bingos={bingos.filter((x) => containsObjectLoosely(x, { i, j }))}
              bingosHovered={bingosHovered}
              setBingosHovered={setBingosHovered}
              key={`${i}_${j}`}
            />
          ))
        )}
      </div>
    </>
  );
}

const Cell = ({
  i,
  j,
  bingos,
  bingosHovered,
  setBingosHovered,
}: {
  i: number;
  j: number;
  bingos: Bingos;
  bingosHovered: Bingos;
  setBingosHovered: Dispatch<SetStateAction<Bingos>>;
}) => {
  const defaultBgColor = containsObjectLoosely(CELLS_THAT_EXIST, { i, j }) ? "green" : "blue";
  let shown = false;
  bingosHovered.forEach((b) => {
    if (containsObjectLoosely(b, { i, j })) shown = true;
  });
  return (
    <div
      onMouseEnter={() => {
        setBingosHovered(bingos);
      }}
      onMouseLeave={() => {
        setBingosHovered([]);
      }}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: shown ? "red" : defaultBgColor,
      }}
    ></div>
  );
};

export default App;
