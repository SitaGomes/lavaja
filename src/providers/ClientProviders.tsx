import React, { createContext, useEffect } from "react";
import { ClientSchema } from "../views/App/Clients/Clients";
import { useLocalState } from "../hooks/custom/useLocalState";
import useGetClients from "../hooks/custom/query/useGetClients";

type ClientContextType = {
  clients: ClientSchema[];
  addClient: (client: ClientSchema) => void;
  editClient: (client: ClientSchema) => void;
};

export const ClientContext = createContext<ClientContextType>({
  clients: [],
  addClient: () => {},
  editClient: () => {},
});

type ClientProviderProps = React.PropsWithChildren<unknown>;

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const {data} = useGetClients()
  const [clients, setClients] = useLocalState<ClientSchema[]>(
    "@clients",
    data || []
  );


  const addClient = (client: ClientSchema) => {
    setClients((v) => [...v, client]);
  };

  const editClient = (client: ClientSchema) => {
    setClients((prev) =>
      prev.map((v) => v.id === client.id ? { ...v, ...client } : v)
    );
  };

  useEffect(() => {
    setClients(data || [])
  }, [data, setClients])

  return (
    <ClientContext.Provider value={{ clients, addClient, editClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
