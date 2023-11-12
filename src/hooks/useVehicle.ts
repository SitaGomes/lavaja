import { useContext } from "react";
import { VehicleContext } from "../providers/VehicleProviders";

function useVehicle() {
    return useContext(VehicleContext);
}


export default useVehicle;