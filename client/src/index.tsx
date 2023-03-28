import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  getMessages,
  getOrders,
  handleCaptureOrderData,
} from "./firebase/firebase.controller";

const App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [jsonData, setJsonData] = useState<
    { name: string; phone: string | number; status: string }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      await getMessages();
      await getOrders();
      const newCsvData = await handleCaptureOrderData();
      setJsonData(newCsvData);
      setDataLoaded(true);
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
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
