import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import InternalRoutes from "../../utils/InternalRoutes";
import Clients from "./Clients/Clients";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Portfolio = lazy(() => import("./Portfolio/Portfolio"));
const Calendar = lazy(() => import("./Calendar/Calendar"));
const Vehicles = lazy(() => import("./Vehicles/Vehicles"));
const EditVehicle = lazy(() => import("./Vehicles/edit"));
const Products = lazy(() => import("./Products/Products"));

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={InternalRoutes.DASHBOARD}
        element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        }
      />
      <Route
        path={InternalRoutes.PORTFOLIO}
        element={
          <AppLayout>
            <Portfolio />
          </AppLayout>
        }
      />
      <Route
        path={InternalRoutes.CALENDAR}
        element={
          <AppLayout>
            <Calendar />
          </AppLayout>
        }
      />
      <Route
        path={InternalRoutes.VEHICLES}
        element={
          <AppLayout>
            <Vehicles />
          </AppLayout>
        }
      />

      <Route
        path={`${InternalRoutes.VEHICLES_EDIT}/:id`}
        element={
          <AppLayout>
            <EditVehicle />
          </AppLayout>
        }
      />

      <Route
        path={InternalRoutes.CLIENTS}
        element={
          <AppLayout>
            <Clients />
          </AppLayout>
        }
      />

      <Route
        path={InternalRoutes.PRODUCT}
        element={
          <AppLayout>
            <Products />
          </AppLayout>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
