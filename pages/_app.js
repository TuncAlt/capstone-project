import LineChart from "@/components/Chart/chart";
import FooterNavBar from "@/components/Navigation/FooterNavBar/FooterNavBar";
import useLocalStorageDevices from "@/components/UseLocalStorage/UseLocalStorageDevices";
import GlobalStyle from "@/styles";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [devices, addDevice, deleteReading] = useLocalStorageDevices();
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component
        {...pageProps}
        devices={devices}
        addDevice={addDevice}
        deleteReading={deleteReading}
      />
      <FooterNavBar />
    </>
  );
}
