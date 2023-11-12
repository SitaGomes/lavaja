import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import { Controller, useFormContext } from "react-hook-form";
import FormSelect from "../../../../components/Form/FormSelect/FormSelect";
import useVehicle from "../../../../hooks/useVehicle";
import usePortifolio from "../../../../hooks/usePortifolio";

import ReactSelect from "react-select";

import makeAnimated from "react-select/animated";

type AddCalendarProps = {
  onCancel: () => void;
  onSubmit: (props: any) => void;
};

function AddCalendar({ onCancel, onSubmit }: AddCalendarProps) {
  const { register, handleSubmit, control, getValues } = useFormContext();

  const { vehicles } = useVehicle();
  const { portifolio } = usePortifolio();
  const animatedComponents = makeAnimated();

  return (
    <Card>
      <VStack w={"100%"}>
        <VStack w="100%" gap={"8"} mb={"12"}>
          <VStack align={"flex-start"} w="100%">
            <FormSelect name="service" label="Serviço" register={register}>
              {portifolio.map((p) => (
                <option value={p.titulo}>{p.titulo}</option>
              ))}
            </FormSelect>
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormSelect name="model" label="Modelo" register={register}>
              {vehicles.map((v) => (
                <option value={v.id}>{v.id}</option>
              ))}
            </FormSelect>
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <Text>Data</Text>
            <Input type="date" {...register("date")} />
          </VStack>

          {/* <VStack align={"flex-start"} w="100%">
            <Text>Adicionais</Text>
            <Controller
              control={control}
              name="adicionals"
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  isMulti
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={portifolio
                    .filter((p) => p.id !== getValues().service)
                    .map((p) => ({ value: p.adicionais., label: p.adicionais.label }))}
                />
              )}
            />
          </VStack> */}
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

export default AddCalendar;
