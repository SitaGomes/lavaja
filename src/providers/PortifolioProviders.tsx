import React, { createContext, useEffect } from "react";
import { useLocalState } from "../hooks/custom/useLocalState";
import { PortifolioSchema } from "../views/App/Portfolio/Portfolio";
import useGetPortifolio from "../hooks/custom/query/useGetPortifolio";

type PortifolioContextType = {
  portifolio: PortifolioSchema[];
  addPortifolio: (vehicle: PortifolioSchema) => void;
  editPortifolio: (vehicle: PortifolioSchema) => void;
};

export const PortifolioContext = createContext<PortifolioContextType>({
  portifolio: [],
  addPortifolio: () => {},
  editPortifolio: () => {},
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

  const editPortifolio = (portifolio: PortifolioSchema) => {};

  useEffect(() => {
    setPortifolio(data || []);
  }, [data, setPortifolio]);

  return (
    <PortifolioContext.Provider
      value={{ portifolio, addPortifolio, editPortifolio }}
    >
      {children}
    </PortifolioContext.Provider>
  );
};

export default PortifolioProvider;
