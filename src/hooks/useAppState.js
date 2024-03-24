import { useState } from "react";
import { CHAMP_DATA } from "../data/constants";

const keys = Object.keys(CHAMP_DATA);

const initialState = {
  tierLists: {
    S: new Set([]),
    A: new Set([]),
    B: new Set([]),
    C: new Set([]),
    D: new Set([]),
    F: new Set([]),
  },
  championPool: new Set(keys),
};

function useAppState() {
  const [appState, setAppState] = useState(initialState);

  return { appState, setAppState };
}

export { useAppState };
