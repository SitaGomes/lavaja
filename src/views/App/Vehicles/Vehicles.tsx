import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import VehiclesTable, {
  RowObj,
} from "../../../components/Dashboard/Table/VehiclesTable";

import { AiFillPlusCircle } from "react-icons/ai";
import Card from "../../../components/Card/Card";
import { Row } from "@tanstack/react-table";

import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useEffect, useState } from "react";
import AddVehicle from "./add";
import useVehicle from "../../../hooks/useVehicle";
import useJWT from "../../../hooks/custom/useJWT";
import { useNavigate } from "react-router-dom";
import InternalRoutes from "../../../utils/InternalRoutes";
import useApi from "../../../hooks/custom/useAPI";
import notify from "../../../hooks/custom/useNotify";

const schema = yup.object().shape({
  placa: yup.string().required("Placa é obrigatória"),
  modelo: yup.string().required("Modelo é obrigatório"),
  cor: yup.string().required("Cor é obrigatória"),
  dono: yup.string(),
});

export type VehicleSchema = {
  id: string;
  placa: string;
  modelo: string;
  cor: string;
  dono: string;
};

const Steps = {
  First: 0 as number,
  Second: 1 as number,
} as const;

function Vehicles() {
  const { isTokenValid } = useJWT();
  const navigateTo = useNavigate();
  const api = useApi()

  useEffect(() => {
    if (!isTokenValid()) {
      navigateTo(InternalRoutes.LOGIN);
    }
  }, [isTokenValid, navigateTo]);
  const [steps, setSteps] = useState<number>(Steps.First);

  const { vehicles, addVehicle } = useVehicle();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      placa: "",
      modelo: "",
      cor: "",
      dono: "",
    },
  });

  const onEdit = ({ original }: Row<RowObj>) => {
    navigateTo(`${InternalRoutes.VEHICLES_EDIT}/${original.placa}`);
  };

  const nextStep = () => {
    if (steps === Steps.First) {
      setSteps(Steps.Second);
    }
  };

  const prevStep = () => {
    if (steps === Steps.Second) {
      methods.reset({ cor: "", modelo: "", placa: "" });
      setSteps(Steps.First);
    }
  };

  const onSubmit = async (props: any) => {
    console.log(props)
    try {
      await api.post("/veiculo", {
        placa: props.placa,
        modelo: props.model,
        cor: props.cor,
        dono: props.dono,
      })
      addVehicle(props);
      notify({message: "Veiculo adicionado com sucesso"})
      prevStep();
    } catch (error) {
      console.log(error);
    }
  };

  const renderSteps = {
    [Steps.First]: (
      <Card>
        <VehiclesTable
          onEdit={onEdit}
          data={vehicles.map((v) => {
            return { ...v, edit: true };
          }) || []}
        />
      </Card>
    ),

    [Steps.Second]: <AddVehicle onCancel={prevStep} onSubmit={onSubmit} />,
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
          <Text paddingTop={"0.5"}>Adicionar veiculo</Text>
        </Flex>
      </Button>

      <Flex w="100%">
        <FormProvider {...methods}>{renderSteps[steps]}</FormProvider>
      </Flex>
    </Flex>
  );
}

export default Vehicles;
