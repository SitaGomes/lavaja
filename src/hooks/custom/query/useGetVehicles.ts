import { useQuery } from "@tanstack/react-query";
import useApi from "../useAPI";
import { VehicleSchema } from "../../../views/App/Vehicles/Vehicles";

function useGetVehicle() {
  const api = useApi();
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await api("/veiculo/listar");
      return response.data as VehicleSchema[];
    },
  });
}

export default useGetVehicle;