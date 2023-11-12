import { useQuery } from "@tanstack/react-query";
import useApi from "../useAPI";
import { AdicionalSchema } from "../../../views/App/Portfolio/Portfolio";

function useGetAdicionals() {
  const api = useApi();
  return useQuery({
    queryKey: ["adicionals"],
    queryFn: async () => {
      const response = await api("/adicional/listar");
      return response.data as AdicionalSchema[];
    },
  });
}

export default useGetAdicionals;