import { Button, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Card from "../../../../components/Card/Card";
import { useFormContext } from "react-hook-form";
import FormInput from "../../../../components/Form/FormInput/FormInput";
import { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { LuTrash } from "react-icons/lu";
import useClient from "../../../../hooks/useClient";
import FormSelect from "../../../../components/Form/FormSelect/FormSelect";

type AddClientProps = {
  onCancel: () => void;
  onSubmit: (props: any) => void;
};

function AddClient({ onCancel, onSubmit }: AddClientProps) {
  const { register, handleSubmit, resetField, getValues, unregister } = useFormContext();
  const [numberOfQuestions, setNumberOfQuestions] = useState<number[]>([0]);

  useEffect(() => {
    setNumberOfQuestions([getValues().contacts?.label?.length || 0]);
  }, [getValues]);

  const addQuestion = () =>
    setNumberOfQuestions((n) => {
      const last = n[n.length - 1];
      return last >= 0 ? [...n, n[n.length - 1] + 1] : [0];
    });

  const removeQuestion = (value: number) => {
    resetField(`contacts.valor.${value}`);
    unregister(`contacts.valor.${value}`);
    setNumberOfQuestions((number) =>
      number.filter((n) => n !== value).map((n) => (n > value ? n - 1 : n))
    );
  };

  const { clients } = useClient();

  const renderSecureClientsOptions = () =>
    clients
      .filter((c) => c.id !== getValues().id)
      .map((client, index) => (
        <option key={index} value={client.id}>
          {client.nome}
        </option>
      ));

  return (
    <Card>
      <VStack w={"100%"}>
        <VStack w="100%" gap={"8"} mb={"12"}>
          <VStack align={"flex-start"} w="100%">
            <FormInput name="nome" label="Nome" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormSelect
              name="pessoaDeConfianca"
              label="Contato de Segurança
            "
              register={register}
            >
              <option value={""}>Não informado</option>
              {renderSecureClientsOptions()}
            </FormSelect>
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <Button onClick={addQuestion} colorScheme="yellow">
              <HStack gap={4}>
                <Icon as={AiFillPlusCircle} />
                <Text>Adicionar novo contato</Text>
              </HStack>
            </Button>
            {numberOfQuestions.map((value, index) => (
              <Flex
                key={value}
                padding={6}
                backgroundColor={"Background"}
                borderRadius={"lg"}
                w="100%"
                flexDir={"column"}
                alignItems={"flex-start"}
                gap={"6"}
              >
                <Button
                  alignSelf={"flex-end"}
                  onClick={() => removeQuestion(index)}
                  colorScheme="red"
                >
                  <HStack gap={4}>
                    <Icon as={LuTrash} />
                    <Text>Remover contato</Text>
                  </HStack>
                </Button>
                <Flex
                  w={"100%"}
                  flexDir={"column"}
                  alignItems={"flex-start"}
                  gap={"6"}
                >
                  <VStack align={"flex-start"} w="100%">
                    <FormInput
                      name={`contacts.valor.${index}`}
                      label="Contato"
                      register={register}
                    />
                  </VStack>
                </Flex>
              </Flex>
            ))}
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

export default AddClient;
