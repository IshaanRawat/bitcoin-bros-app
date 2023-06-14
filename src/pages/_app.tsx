import { AuthProvider } from "@/contexts/auth";
import { Web3Provider } from "@/contexts/web3";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
};

export default App;
