import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import AppLayout from "@components/layout/AppLayout";
import { api } from "../utils/api";
import '@tremor/react/dist/esm/tremor.css';
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppLayout>

      <Component {...pageProps} />
      </AppLayout>
   </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
