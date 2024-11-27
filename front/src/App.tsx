import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { CustomerProvider } from "./contexts/CustomerContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CustomerProvider>
            <Router />
          </CustomerProvider>
        </BrowserRouter>
        
        <Toaster richColors toastOptions={{ className: "custom-toast" }} />
      </QueryClientProvider>
      
      <GlobalStyle />
    </ThemeProvider>
  )
}
