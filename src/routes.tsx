import { Suspense, lazy } from "react";
import AppRoutes from "./views/App";
import {
  BrowserRouter as Router,
  Routes as UserRoutes,
  Route,
} from "react-router-dom";
import InternalRoutes from "./utils/InternalRoutes";
import { Center, Spinner } from "@chakra-ui/react";

const Login = lazy(() => import("./views/Login/Login"));

const Loading = () => (
  <Center h={"100vh"}>
    <Spinner />
  </Center>
);

function Routes() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <UserRoutes>
          <Route path={InternalRoutes.LOGIN} element={<Login />} />
        </UserRoutes>
        <AppRoutes />
      </Router>
    </Suspense>
  );
}

export default Routes;
