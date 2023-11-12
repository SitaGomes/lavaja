import { Button, Flex, VStack } from "@chakra-ui/react";
import Card from "../../../components/Card/Card";
import { useFormContext } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormSelect from "../../../components/Form/FormSelect/FormSelect";
import useClient from "../../../hooks/useClient";

type AddVehicleProps = {
  onCancel: () => void;
  onSubmit: (props: any) => void;
};

function AddVehicle({ onCancel, onSubmit }: AddVehicleProps) {
  const { register, handleSubmit } = useFormContext();

  const { clients } = useClient();

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
            Adicionar
          </Button>
        </Flex>
      </VStack>
    </Card>
  );
}

export default AddVehicle;
