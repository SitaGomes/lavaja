import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes.tsx";

import { ChakraProvider } from "@chakra-ui/react";
import VehicleProvider from "./providers/VehicleProviders.tsx";
import ClientProvider from "./providers/ClientProviders.tsx";
import PortifolioProvider from "./providers/PortifolioProviders.tsx";
import NotificationProvider from "./providers/NotificationProvider.tsx";
import AdicionalProvider from "./providers/AdicionaProvider.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <VehicleProvider>
          <ClientProvider>
            <PortifolioProvider>
              <AdicionalProvider>
                <>
                  <NotificationProvider />
                  <Routes />
                </>
              </AdicionalProvider>
            </PortifolioProvider>
          </ClientProvider>
        </VehicleProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
