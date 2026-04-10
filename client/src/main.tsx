import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import App from "@/App";
import "@/index.css";
import store from "@/store/store";
import RealtimeProvider from "@/components/realtime/RealtimeProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <RealtimeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RealtimeProvider>
          <Toaster richColors closeButton position="top-right" />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

