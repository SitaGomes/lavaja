import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiFillPlusCircle } from "react-icons/ai";

import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import AdicionalsTable from "../../../../../components/Dashboard/Table/AdicionalsTable";
import Card from "../../../../../components/Card/Card";
import AddAdicional from "./components/AddAdicional";

import * as yup from "yup";
import useAdicional from "../../../../../hooks/useAdicional";
import { AdicionalSchema } from "../../Portfolio";
import useApi from "../../../../../hooks/custom/useAPI";
import notify from "../../../../../hooks/custom/useNotify";

const schema = yup.object().shape({
  descricao: yup.string().required("Nome é obrigatório"),
  valor: yup.number().typeError("Preço deve ser um numero").positive(),
  tempo: yup.number().typeError("Tempo deve ser um numero").positive(),
});

const Steps = {
  First: 0 as number,
  Second: 1 as number,
} as const;

function Portifolio() {
  const api = useApi();
  const [steps, setSteps] = useState<number>(Steps.First);

  const { adicionals, addAdicional } = useAdicional();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      descricao: "",
      tempo: 0,
      valor: 0,
    },
  });

  const nextStep = () => {
    if (steps === Steps.First) {
      setSteps(Steps.Second);
    }
  };

  const prevStep = () => {
    if (steps === Steps.Second) {
      methods.reset({
        descricao: "",
        tempo: 0,
        valor: 0,
      });
      setSteps(Steps.First);
    }
  };

  const onSubmit = async (props: AdicionalSchema) => {
    console.log(props);

    try {
      await api.post("/adicional", {
        descricao: props.descricao,
        tempo: props.tempo,
        valor: props.valor,
      });

      addAdicional(props);
      notify({ message: "Adicional adicionado com sucesso" });
      prevStep();
    } catch (error) {
      console.error(error);
    }
  };

  const renderSteps = {
    [Steps.First]: (
      <Card>
        <AdicionalsTable
          data={adicionals.map((a) => ({ ...a, edit: true }))}
          onEdit={() => {}}
        />
      </Card>
    ),

    [Steps.Second]: <AddAdicional onCancel={prevStep} onSubmit={onSubmit} />,
  };

  return (
    <Flex flexDir={"column"} w={"100%"} gap={"10"}>
      <Button
        bgColor={"white"}
        _hover={{ bgColor: "gray.200" }}
        onClick={nextStep}
      >
        <Flex gap={"4"}>
          <Icon as={AiFillPlusCircle} w="20px" h="20px" />
          <Text paddingTop={"0.5"}>Criar um adicional</Text>
        </Flex>
      </Button>

      <Flex w="100%">
        <FormProvider {...methods}>{renderSteps[steps]}</FormProvider>
      </Flex>
    </Flex>
  );
}

export default Portifolio;
