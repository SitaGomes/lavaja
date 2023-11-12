import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import MiniStats from "../../../components/Dashboard/MiniStats/MiniStats";
import { Flex } from "@chakra-ui/react";
import { BsBag, BsBagCheck } from "react-icons/bs";
import InternalRoutes from "../../../utils/InternalRoutes";
import useJWT from "../../../hooks/custom/useJWT";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Card from "../../../components/Card/Card";
import { Bar } from "react-chartjs-2";

import { useBreakpointValue } from "@chakra-ui/react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Agendamentos mensais",
    },
  },
};

const data = {
  labels: months,
  datasets: [
    {
      label: "Nº de agendamentos",
      data: months.map(() => Number(Math.random() * 10)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function Dashboard() {
  const { isTokenValid } = useJWT();
  const navigateTo = useNavigate();

  const isMobile = useBreakpointValue({ base: true, md: false });
  console.log(isMobile);
  useEffect(() => {
    if (!isTokenValid()) {
      navigateTo(InternalRoutes.LOGIN);
    }
  }, [isTokenValid, navigateTo]);

  return (
    <>
      <Flex
        w={"100%"}
        justifyContent={"space-evenly"}
        gap={"8"}
        flexWrap={["wrap", "wrap", "nowrap"]}
        mb={12}
      >
        <MiniStats
          title="Total de clientes"
          value="20"
          icon={AiOutlineUser}
          href={InternalRoutes.VEHICLES}
        />
        <MiniStats
          title="Serviços no portifolio"
          value="10"
          icon={BsBag}
          href={InternalRoutes.PORTFOLIO}
        />
        <MiniStats title="Serviços prestados" value="25" icon={BsBagCheck} />
        <MiniStats
          title="Total de agendamentos"
          value="7"
          icon={AiOutlineCalendar}
          href={InternalRoutes.CALENDAR}
        />
      </Flex>
      <Flex>
        <Card>
          <Bar width={1200} height={300} options={options} data={data} />
        </Card>
      </Flex>
    </>
  );
}

export default Dashboard;
