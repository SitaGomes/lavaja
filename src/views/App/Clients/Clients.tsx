import { Button, Flex, Icon, Text } from "@chakra-ui/react";

import { AiFillPlusCircle } from "react-icons/ai";
import Card from "../../../components/Card/Card";

import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useEffect, useState } from "react";
import AddClient from "./components/AddClient";
import ClientsTable from "../../../components/Dashboard/Table/ClientsTable";
import useClient from "../../../hooks/useClient";
import useJWT from "../../../hooks/custom/useJWT";
import { useNavigate } from "react-router-dom";
import InternalRoutes from "../../../utils/InternalRoutes";
import notify from "../../../hooks/custom/useNotify";
import useApi from "../../../hooks/custom/useAPI";

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  pessoaDeConfianca: yup.string(),
  contatos: yup.array().of(
    yup.object({
      valor: yup.string().required("Contato é obrigatório"),
    })
  ),
});

export type Contact = {
  id: string;
  valor: string;
};

export type ClientSchema = {
  id: string;
  nome: string;
  pessoaDeConfianca: ClientSchema;
  contatos: Contact[];
  dataCriacao: string;
};

const Steps = {
  First: 0 as number,
  Second: 1 as number,
} as const;

function Clients() {
  const { isTokenValid } = useJWT();
  const navigateTo = useNavigate();
  const api = useApi();

  useEffect(() => {
    if (!isTokenValid()) {
      navigateTo(InternalRoutes.LOGIN);
    }
  }, [isTokenValid, navigateTo]);
  const [steps, setSteps] = useState<number>(Steps.First);

  const { clients, addClient } = useClient();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: "",
      pessoaDeConfianca: "",
      contatos: [],
    },
  });

  const nextStep = () => {
    if (steps === Steps.First) {
      setSteps(Steps.Second);
    }
  };

  const prevStep = () => {
    if (steps === Steps.Second) {
      methods.reset({ nome: "", contatos: [] });
      setSteps(Steps.First);
    }
  };

  const onSubmit = async (props: any) => {

    if(props?.contacts?.valor?.length === 0 || !props?.contacts) {
      notify({message: "É necessário adicionar ao menos um contato", type: "error"})
      return
    }

    const client = {
      nome: props.nome,
      pessoaDeConfianca: props.pessoaDeConfianca,
      contatos: props?.contacts
        ? props.contacts.valor?.filter(
            (v: string) => v.length !== 0 || v !== undefined || v !== null
          ).reduce((acc: Contact[], v: string) => {
            return `&contatos=${v}` + acc
          }, "")
        : [],
    };

    try {
      const { data } = await api.post(`/cliente?nome=${client.nome}${client.contatos}`);
      
      if (client.pessoaDeConfianca) {
        await api.post(`/cliente/confianca?cliente=${data.id}&pessoaDeConfianca=${client.pessoaDeConfianca}`);
      }

      addClient(data);
      prevStep();
    } catch (error) {
      console.error(error);
      notify({ message: "Erro ao adicionar cliente", type: "error" });
    }
  };

  console.log(clients)

  const renderSteps = {
    [Steps.First]: (
      <Card>
        <ClientsTable
          onEdit={() => {}}
          data={
            clients.map((c) => {
              return { ...c, edit: false };
            }) || []
          }
        />
      </Card>
    ),

    [Steps.Second]: <AddClient onCancel={prevStep} onSubmit={onSubmit} />,
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
          <Text paddingTop={"0.5"}>Adicionar cliente</Text>
        </Flex>
      </Button>

      <Flex w="100%">
        <FormProvider {...methods}>{renderSteps[steps]}</FormProvider>
      </Flex>
    </Flex>
  );
}

export default Clients;
