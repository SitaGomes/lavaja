import { Button, Flex, Icon, Text } from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillPlusCircle } from "react-icons/ai";

import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect, useState } from "react";

import AddPortifolio from "./components/AddPortifolio";
import Adicionals from "./components/Adicionals/Adicionals";
import Card from "../../../components/Card/Card";
import PortifolioTable from "../../../components/Dashboard/Table/PortifolioTable";
import usePortifolio from "../../../hooks/usePortifolio";
import notify from "../../../hooks/custom/useNotify";
import useJWT from "../../../hooks/custom/useJWT";
import { useNavigate } from "react-router-dom";
import InternalRoutes from "../../../utils/InternalRoutes";
import useApi from "../../../hooks/custom/useAPI";

const schema = yup.object().shape({
  titulo: yup.string().required("Nome é obrigatório"),
  precoBase: yup
    .number()
    .typeError("Valor deve ser um numero")
    .required("Tempo base é obrigatório"),
  tempoBase: yup
    .number()
    .typeError("Valor deve ser um numero")
    .required("Preço base é obrigatório"),
  servicoIndicado: yup.string(),
  avaliacaoTecnica: yup.object({
    question: yup.array().of(
      yup.object({
        descricao: yup.string(),
        porcentagem: yup.number(),
      })
    ),
  }),
  porcentagemLimite: yup.array().of(yup.number()),
  adicionaisDescricao: yup.string(),
});

type TechnicalReviewQuestions = {
  id: string;
  descricao: string;
  porcentagem: number;
};

export type TechnicalReview = {
  id: string;
  perguntas: TechnicalReviewQuestions[];
  porcentage: number[];
  servicoIndicado: string;
  porcentagemLimite: number;
};

export type AdicionalSchema = {
  id: string;
  descricao: string;
  valor: number;
  tempo: number;
};

export type PortifolioSchema = {
  id: string;
  titulo: string;
  precoBase: number;
  tempoBase: number;
  adicionais: AdicionalSchema[];
  avaliacaoTecnica?: TechnicalReview;
};

const Steps = {
  First: 0 as number,
  Second: 1 as number,
} as const;

function Portifolio() {
  const api = useApi()
  const { isTokenValid } = useJWT();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      navigateTo(InternalRoutes.LOGIN);
    }
  }, [isTokenValid, navigateTo]);

  const [steps, setSteps] = useState<number>(Steps.First);

  const { portifolio, addPortifolio } = usePortifolio();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      titulo: "",
      precoBase: 0,
      tempoBase: 0,
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
        titulo: "",
        tempoBase: 0,
        precoBase: 0,
        servicoIndicado: "",
      });
      setSteps(Steps.First);
    }
  };

  const onSubmit = async (props: any) => {
    console.log(props);

    if (!props.precoBase || !props.tempoBase || !props.titulo) {
      notify({ message: "Preencha todos os campos", type: "error" });
      return;
    }

    if (props.precoBase < 0 || props.tempoBase < 0) {
      notify({ message: "Valores não podem ser negativos", type: "error" });
      return;
    }

    const technicalReview = props.avaliacaoTecnica
      ? {
          perguntas: props?.technicalReview?.porcentage.map(
            (p: number, index: number) => ({
              descricao: props?.technicalReview?.question[index],
              porcentagem: p,
            })
          ),
          porcentagemLimite: 0,
          servicoIndicado: props?.servicoIndicado,
        }
      : {};

    const portifolio = {
      titulo: props.titulo,
      precoBase: props.precoBase,
      tempoBase: props.tempoBase,
      avaliacaoTecnica: technicalReview,
      adicionais: props?.adicionalsDescricao?.map((a: any) => a.value),
    };

    try {
      await api.post("/portifolio", {
        titulo: portifolio.titulo,
        precoBase: portifolio.precoBase,
        tempoBase: portifolio.tempoBase,
        avaliacaoTecnica: portifolio.avaliacaoTecnica,
        adicionais: portifolio.adicionais,
      })

      // addPortifolio(portifolio);
      notify({ message: "Serviço adicionado com sucesso"});
      prevStep();
    } catch (err) {
      console.error(err)
      notify({ message: "Não foi possivel adicionar o serviço", type: "error" });
    }

    // addPortifolio(props);
    // prevStep();
  };

  const renderSteps = {
    [Steps.First]: (
      <Card>
        <PortifolioTable
          onEdit={() => {}}
          data={
            portifolio.map((v) => {
              return { ...v, edit: true };
            }) || []
          }
        />
      </Card>
    ),

    [Steps.Second]: <AddPortifolio onCancel={prevStep} onSubmit={onSubmit} />,
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
          <Text paddingTop={"0.5"}>Adicionar novo serviço</Text>
        </Flex>
      </Button>

      <Flex w="100%" mb={"32"}>
        <FormProvider {...methods}>{renderSteps[steps]}</FormProvider>
      </Flex>

      <Flex w="100%" mb="8">
        <Adicionals />
      </Flex>
    </Flex>
  );
}

export default Portifolio;
