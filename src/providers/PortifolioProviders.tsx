import React, { createContext, useEffect } from "react";
import { useLocalState } from "../hooks/custom/useLocalState";
import { PortifolioSchema } from "../views/App/Portfolio/Portfolio";
import useGetPortifolio from "../hooks/custom/query/useGetPortifolio";

type PortifolioContextType = {
  portifolio: PortifolioSchema[];
  addPortifolio: (vehicle: PortifolioSchema) => void;
};

export const PortifolioContext = createContext<PortifolioContextType>({
  portifolio: [],
  addPortifolio: () => {},
});

type PortifolioProviderProps = React.PropsWithChildren<unknown>;

const PortifolioProvider: React.FC<PortifolioProviderProps> = ({
  children,
}) => {
  const { data } = useGetPortifolio();
  const [portifolio, setPortifolio] = useLocalState<PortifolioSchema[]>(
    "@portifolio",
    []
  );

  const addPortifolio = (portifolio: PortifolioSchema) => {
    setPortifolio((v) => [...v, portifolio]);
  };


  useEffect(() => {
    setPortifolio(data || []);
  }, [data, setPortifolio]);

  return (
    <PortifolioContext.Provider
      value={{ portifolio, addPortifolio }}
    >
      {children}
    </PortifolioContext.Provider>
  );
};

export default PortifolioProvider;
