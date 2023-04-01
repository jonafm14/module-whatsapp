import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  getMessages,
  getOrders,
  handleCaptureOrderData,
} from "./firebase/firebase.controller";
import sendMessage from "./axios/sendMessage";
import { getStatus, getQr } from "./axios/getRoutes";

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [jsonData, setJsonData] = useState<
    { name: string; phone: string | number; status: string }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      await getMessages();
      await getOrders();
      const newJsonData = await handleCaptureOrderData();
      setJsonData(newJsonData);
      setDataLoaded(true);
      sendMessage();
      await getStatus();
      const qrData = await getQr();
      setQrCode(qrData);
    }
    fetchData();
  }, []);
  console.log("jsonData", jsonData);
  if (!dataLoaded) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div>
      <h2>Modulo Whatsapp</h2>
      {jsonData.map((e) => {
        return (
          <div key={e.name}>
            <h4>
              {e.name} - {e.phone} - {e.status}
            </h4>
            <h4></h4>
          </div>
        );
      })}
      <img src={`data:image/png;base64, ${qrCode}`} alt="QR Code" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
