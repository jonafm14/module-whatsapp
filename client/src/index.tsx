import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  getMessages,
  getOrders,
} from "./firebase/controller/firebase.controller";
// import sendMessage from "./axios/routes/sendMessage";
import { getStatus } from "./axios/routes/getStatus";
import { getQr } from "./axios/routes/getQr";
import { handleCaptureOrderData } from "./firebase/service/firebase.service";

const App = () => {
  const [dataStatus, setDataStatus] = useState(false);
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
      const status = await getStatus();
      const qrData = await getQr();
      setDataStatus(status);
      setJsonData(newJsonData);
      setQrCode(qrData);
      // sendMessage();
      setDataLoaded(true);
    }
    fetchData();
  }, []);

  if (dataStatus === false)
    return <img src={`data:image/png;base64, ${qrCode}`} alt="QR Code" />;
  if (!dataLoaded) {
    return <div>Cargando datos...</div>;
  }
  if (dataStatus === true) {
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
      </div>
    );
  }
  return <div></div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
