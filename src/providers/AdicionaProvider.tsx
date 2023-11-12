import React, { createContext, useEffect } from "react";
import { useLocalState } from "../hooks/custom/useLocalState";
import useGetAdicionals from "../hooks/custom/query/useGetAdicionals";
import { AdicionalSchema } from "../views/App/Portfolio/Portfolio";

type AdicionalContextType = {
  adicionals: AdicionalSchema[];
  addAdicional: (Adicional: AdicionalSchema) => void;
  editAdicional: (Adicional: AdicionalSchema) => void;
};

export const AdicionalContext = createContext<AdicionalContextType>({
  adicionals: [],
  addAdicional: () => {},
  editAdicional: () => {},
});

type AdicionalProviderProps = React.PropsWithChildren<unknown>;

const AdicionalProvider: React.FC<AdicionalProviderProps> = ({ children }) => {
  const {data} = useGetAdicionals();
  const [adicionals, setAdicionals] = useLocalState<AdicionalSchema[]>(
    "@adicionals",
    []
  );

  const addAdicional = (adicional: AdicionalSchema) => {
    setAdicionals((v) => [...v, adicional]);
  };

  const editAdicional = (adicional: AdicionalSchema) => {
    setAdicionals((prev) =>
      prev.map((v) => v.id === adicional.id ? { ...v, ...adicional } : v)
    );
  };

  useEffect(() => {
    setAdicionals(data || []);
  }, [data, setAdicionals])

  return (
    <AdicionalContext.Provider value={{ adicionals, addAdicional, editAdicional }}>
      {children}
    </AdicionalContext.Provider>
  );
};

export default AdicionalProvider;
