import { Button, Flex, VStack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import Card from "../../../../../../components/Card/Card";
import FormInput from "../../../../../../components/Form/FormInput/FormInput";

type AddAdicionalProps = {
  onCancel: () => void;
  onSubmit: (props: any) => void;
};

function AddAdicional({ onCancel, onSubmit }: AddAdicionalProps) {
  const { register, handleSubmit } = useFormContext();

  return (
    <Card>
      <VStack w={"100%"}>
        <VStack w="100%" gap={"8"} mb={"12"}>
          <VStack align={"flex-start"} w="100%">
            <FormInput name="descricao" label="Nome" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="valor" label="Preço" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="tempo" label="Tempo" register={register} />
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

export default AddAdicional;
