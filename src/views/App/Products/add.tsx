import { Button, Flex, VStack } from "@chakra-ui/react";
import Card from "../../../components/Card/Card";
import { useFormContext } from "react-hook-form";
import FormInput from "../../../components/Form/FormInput/FormInput";

type AddProductProps = {
  onCancel: () => void;
  onSubmit: (props: any) => void;
};

function AddProduct({ onCancel, onSubmit }: AddProductProps) {
  const { register, handleSubmit } = useFormContext();

  return (
    <Card>
      <VStack w={"100%"}>
        <VStack w="100%" gap={"8"} mb={"12"}>
          <VStack align={"flex-start"} w="100%">
            <FormInput name="name" label="Nome" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="price" label="Preço" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput name="quantity" label="Quantidade" register={register} />
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

export default AddProduct;
