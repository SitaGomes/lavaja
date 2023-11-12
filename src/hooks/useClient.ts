import { useContext } from "react";
import { ClientContext } from "../providers/ClientProviders";

function useClient() {
  return useContext(ClientContext);
}

export default useClient;
