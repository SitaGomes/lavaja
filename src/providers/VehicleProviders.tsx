import React, { createContext } from "react";
import { VehicleSchema } from "../views/App/Vehicles/Vehicles";
import { useLocalState } from "../hooks/custom/useLocalState";
import useGetVehicle from "../hooks/custom/query/useGetVehicles";

type VehicleContextType = {
  vehicles: VehicleSchema[];
  addVehicle: (vehicle: VehicleSchema) => void;
  editVehicle: (vehicle: VehicleSchema) => void;
  getVehicle: (plate: string) => VehicleSchema;
};

export const VehicleContext = createContext<VehicleContextType>(
  {} as VehicleContextType
);

type VehicleProviderProps = React.PropsWithChildren<unknown>;

const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  const { data } = useGetVehicle();
  const [vehicles, setVehicles] = useLocalState<VehicleSchema[]>(
    "@vehicles",
    data || []
  );

  const addVehicle = (vehicle: VehicleSchema) => {
    console.log(vehicle, "vehicle");
    setVehicles((v) => [...v, vehicle]);
  };

  const editVehicle = (vehicle: VehicleSchema) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicle.id ? { ...v, ...vehicle } : v))
    );
  };

  const getVehicle = (id: string) => {
    return (
      vehicles.find((vehicle) => vehicle.id === id) || ({} as VehicleSchema)
    );
  };

  return (
    <VehicleContext.Provider
      value={{ vehicles, addVehicle, editVehicle, getVehicle }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleProvider;
