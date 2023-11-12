import { useContext } from "react";
import { AdicionalContext } from "../providers/AdicionaProvider";

function useAdicional() {
  return useContext(AdicionalContext);
}

export default useAdicional;
