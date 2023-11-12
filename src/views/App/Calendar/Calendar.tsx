import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import CalendarTable, {
  CalendarRowObj,
} from "../../../components/Dashboard/Table/Calendartable";

import { AiFillPlusCircle } from "react-icons/ai";
import Card from "../../../components/Card/Card";
import { Row } from "@tanstack/react-table";

import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { AdicionalSchema } from "../Portfolio/Portfolio";
import AddCalendar from "./components/AddCalendar";
import useCalendar from "../../../hooks/useCalendar";
import useJWT from "../../../hooks/custom/useJWT";
import { useNavigate } from "react-router-dom";
import InternalRoutes from "../../../utils/InternalRoutes";

const schema = yup.object().shape({
  service: yup.string().required("Campo obrigatório"),
  vehicle: yup.string().required("Campo obrigatório"),
  date: yup.string().required("Campo obrigatório"),
  adicionals: yup
    .array()
    .of(yup.object({ label: yup.string(), value: yup.string() })),
});

export type CalendarSchema = {
  service: string;
  vehicle: string;
  date: string;
  adicionals: AdicionalSchema[];
};

const Steps = {
  First: 0 as number,
  Second: 1 as number,
} as const;

function Vehicles() {
  const { isTokenValid } = useJWT();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      navigateTo(InternalRoutes.LOGIN);
    }
  }, [isTokenValid, navigateTo]);
  const [steps, setSteps] = useState<number>(Steps.First);
  const [edit, setEdit] = useState<boolean>(false);
  const [service, setService] = useState("");
  const [vehicles, setVehicles] = useState("");
  const [date, setDate] = useState("");
  const [adicionals, setAdicionals] = useState<AdicionalSchema[]>(
    [] as AdicionalSchema[]
  );

  const { addToCalendar, calendar } = useCalendar();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      service: "",
      vehicle: "",
      date: "",
      adicionals: [],
    },
    values: {
      service: service,
      vehicle: vehicles,
      date: date,
      adicionals: adicionals,
    },
  });

  const onEdit = ({ original }: Row<CalendarRowObj>) => {
    console.log(original);
    setService(original.service);
    setVehicles(original.vehicle);
    setDate(original.date);
    setAdicionals(original.adicionals);
    setEdit(true);
    nextStep();
  };

  const nextStep = () => {
    if (steps === Steps.First) {
      setSteps(Steps.Second);
    }
  };

  const prevStep = () => {
    if (steps === Steps.Second) {
      methods.reset({ service: "", vehicle: "", date: "", adicionals: [] });
      setEdit(false);
      setSteps(Steps.First);
    }
  };

  const onSubmit = (props: any) => {
    if (edit) {
      prevStep();
      return;
    }
    addToCalendar(props);
    prevStep();
  };

  const renderSteps = {
    [Steps.First]: (
      <Card>
        <CalendarTable
          onEdit={onEdit}
          data={calendar.map((c) => ({ ...c, edit: true, id: "" })) || []}
        />
      </Card>
    ),

    [Steps.Second]: <AddCalendar onCancel={prevStep} onSubmit={onSubmit} />,
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
          <Text paddingTop={"0.5"}>Agendar serviço</Text>
        </Flex>
      </Button>

      <Flex w="100%">
        <FormProvider {...methods}>{renderSteps[steps]}</FormProvider>
      </Flex>
    </Flex>
  );
}

export default Vehicles;
