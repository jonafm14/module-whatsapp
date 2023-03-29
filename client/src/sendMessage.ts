import { csvFile } from "./firebase/firebase.controller";

import axios from "axios";

export default function sendMessage() {
  csvFile.forEach((person) => {
    const { phone, name, status } = person;
    const message = `Hola ${name}, estado del pedido: ${status}`;
    const payload = {
      phone: phone,
      message: message,
    };

    axios
      .post("http://localhost:3001/message", payload)
      .then((response) => {
        console.log(`Mensaje enviado a ${name} con estado: ${status}`);
      })
      .catch((error) => {
        console.error(`Error al enviar mensaje a ${name}: ${error.message}`);
      });
  });
}
