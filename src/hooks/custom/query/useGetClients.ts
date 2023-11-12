import { useQuery } from "@tanstack/react-query";
import useApi from "../useAPI";
import { ClientSchema } from "../../../views/App/Clients/Clients";

function useGetClients() {
  const api = useApi();
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await api("/cliente/listar");
      return response.data as ClientSchema[];
    },
  });
}

export default useGetClients;