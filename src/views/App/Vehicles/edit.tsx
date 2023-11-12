import { Button, Flex, VStack } from "@chakra-ui/react";
import Card from "../../../components/Card/Card";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormSelect from "../../../components/Form/FormSelect/FormSelect";
import useClient from "../../../hooks/useClient";
import { useNavigate, useParams } from "react-router-dom";
import InternalRoutes from "../../../utils/InternalRoutes";
import { useEffect, useState } from "react";
import useVehicle from "../../../hooks/useVehicle";
import { VehicleSchema } from "./Vehicles";
import notify from "../../../hooks/custom/useNotify";

function EditVehicle() {
  const { id } = useParams();

  const { getVehicle, editVehicle } = useVehicle();
  const { clients } = useClient();
  const [vehicle, setVehicle] = useState<VehicleSchema>({} as VehicleSchema)
  const navigateTo = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      placa: "",
      modelo: "",
      cor: "",
      dono: "",
      id: ""
    }, values: {
        placa: vehicle.placa,
        modelo: vehicle.modelo,
        cor: vehicle.cor,
        dono: vehicle.dono,
        id: vehicle.id
    }
  });

  useEffect(() => {
    if (!id) return navigateTo(InternalRoutes.VEHICLES);

    const vehicle = getVehicle(id);

    if (!vehicle) return navigateTo(InternalRoutes.VEHICLES);

    setVehicle(vehicle)

  }, [navigateTo, id, getVehicle]);

  const onCancel = () => navigateTo(InternalRoutes.VEHICLES);

  const onSubmit = (data: VehicleSchema) => {
    editVehicle(data);
    notify({message: "Veiculo editado com sucesso"})
    navigateTo(InternalRoutes.VEHICLES)
  };

  return (
    <Card>
      <VStack w={"100%"}>
        <VStack w="100%" gap={"8"} mb={"12"}>
          <VStack align={"flex-start"} w="100%">
            <FormInput name="placa" label="Placa" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="modelo" label="Modelo" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="cor" label="Cor" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormSelect name="dono" label="Dono" register={register}>
              {clients.map((client, index) => (
                <option key={index} value={client.id}>
                  {client.nome}
                </option>
              ))}
            </FormSelect>
          </VStack>
        </VStack>

        <Flex gap={"8"}>
          <Button colorScheme="blackAlpha" onClick={onCancel}>
            Voltar
          </Button>
          <Button colorScheme="yellow" onClick={handleSubmit(onSubmit)}>
            Atualizar veiculo
          </Button>
        </Flex>
      </VStack>
    </Card>
  );
}

export default EditVehicle;
