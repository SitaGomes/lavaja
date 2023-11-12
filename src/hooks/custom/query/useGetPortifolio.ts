import { useQuery } from "@tanstack/react-query";
import useApi from "../useAPI";
import { PortifolioSchema } from "../../../views/App/Portfolio/Portfolio";

function useGetPortifolio() {
  const api = useApi();
  return useQuery({
    queryKey: ["portifolio"],
    queryFn: async () => {
      const response = await api("/portifolio/listar");
      return response.data as PortifolioSchema[];
    },
  });
}

export default useGetPortifolio;