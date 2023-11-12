import { useContext } from "react";
import { PortifolioContext  } from "../providers/PortifolioProviders";

function usePortifolio() {
    return useContext(PortifolioContext);
}

export default usePortifolio;