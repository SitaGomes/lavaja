import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

import { AiFillPlusCircle } from "react-icons/ai";
import { LuTrash } from "react-icons/lu";

import useAdicional from "../../../../hooks/useAdicional";
import usePortifolio from "../../../../hooks/usePortifolio";

import Card from "../../../../components/Card/Card";
import FormSelect from "../../../../components/Form/FormSelect/FormSelect";
import FormInput from "../../../../components/Form/FormInput/FormInput";

type AddPortifolioProps = {
  onCancel: () => void;
  onSubmit: (props: any) => void;
};

function AddPortifolio({ onCancel, onSubmit }: AddPortifolioProps) {
  const { register, handleSubmit, resetField, getValues, control } =
    useFormContext();
  const [numberOfQuestions, setNumberOfQuestions] = useState<number[]>([0]);
  const { adicionals } = useAdicional();
  const { portifolio } = usePortifolio();

  const animatedComponents = makeAnimated();

  const addQuestion = () =>
    setNumberOfQuestions((q) => {
      const last = q[q.length - 1];
      return last >= 0 ? [...q, q[q.length - 1] + 1] : [0];
    });

  const removeQuestion = (value: number) => {
    resetField(`technicalReview.question.${value}`);
    setNumberOfQuestions((number) =>
      number.filter((n) => n !== value).map((n) => (n > value ? n - 1 : n))
    );
  };

  const renderRecommendedProtifolio = () =>
    portifolio
      .filter((l) => l.id !== getValues().id)
      .map((value) => (
        <option key={value.id} value={value.id}>
          {value.titulo}
        </option>
      ));

  return (
    <Card>
      <VStack w={"100%"}>
        <VStack w="100%" gap={"8"} mb={"12"}>
          <VStack align={"flex-start"} w="100%">
            <FormInput name="titulo" label="Nome" register={register} />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput
              name="tempoBase"
              label="Tempo minimo"
              register={register}
            />
          </VStack>

          <VStack align={"flex-start"} w="100%">
            <FormInput
              name="precoBase"
              label="Preço minimo"
              register={register}
            />
          </VStack>

          <HStack align={"center"} w="100%" gap={8}>
            <Text>Adicionais:</Text>
            <Controller
              control={control}
              name="adicionalsDescricao"
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  isMulti
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  options={adicionals.map((a) => ({
                    value: a.id,
                    label: a.descricao,
                  }))}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      width: "100%",
                    }),
                  }}
                />
              )}
            />
          </HStack>

          <Accordion w={"100%"}>
            <AccordionItem>
              <AccordionButton>
                <Text>Avaliação tecnica</Text>
              </AccordionButton>
              <AccordionPanel>
                <Button colorScheme="yellow" onClick={addQuestion}>
                  <HStack gap={4}>
                    <Icon as={AiFillPlusCircle} />
                    <Text>Adicionar pergunta</Text>
                  </HStack>
                </Button>
                {numberOfQuestions.map((value, index) => (
                  <Flex
                    key={value}
                    padding={6}
                    backgroundColor={"Background"}
                    borderRadius={"lg"}
                    flexDir={"column"}
                  >
                    <Button
                      colorScheme="red"
                      alignSelf={"flex-end"}
                      onClick={() => removeQuestion(value)}
                    >
                      <HStack gap={4}>
                        <Icon as={LuTrash} />
                        <Text>Remover pergunta</Text>
                      </HStack>
                    </Button>
                    <Flex flexDir={"column"} gap={6}>
                      <FormInput
                        name={`technicalReview.question.${index}`}
                        label="Pergunta"
                        register={register}
                      />
                      <FormInput
                        name={`technicalReview.porcentage.${index}`}
                        label="Porcentagem da resposta"
                        register={register}
                      />
                    </Flex>
                  </Flex>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <VStack align={"flex-start"} w="100%">
            <FormSelect
              name="servicoIndicado"
              label="Serviço recomendado"
              register={register}
            >
              <option value="Não possui">Não possui</option>
              {renderRecommendedProtifolio()}
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

export default AddPortifolio;
