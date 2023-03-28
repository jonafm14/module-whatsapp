import {
  collection,
  getDocs,
  getFirestore,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { Message, Orders } from "./types";

import { app } from "./firebase";

//Estructura DB
// orders: {
//   id: {
//     "name": "name",
//     "phone": "phone",
//     "status": "estado del pedido (cancel, pending, send)",
//     "price": "precio total"
//   }
// }
// message: {
//   id: {
//   "cancel": "mensaje personalizado",
//   "pending": "mensaje personalizado",
//   "send": "mensaje personalizado"
//   }
// }

export const firestore = getFirestore(app);
export const messageColection = collection(firestore, "message");
export const ordersCollection = collection(firestore, "orders");

export let messages: Message[] = [];
export let csvFile: any[] = [];

export async function getMessages() {
  const messageQuery = query(messageColection);
  const snapshot: QuerySnapshot<Message> = await getDocs(messageQuery);
  messages = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

export let orders: Orders[] = [];

export async function getOrders() {
  const ordersQuery = query(ordersCollection);
  const snapshot: QuerySnapshot<Orders> = await getDocs(ordersQuery);
  orders = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

export function handleCaptureOrderData(): Promise<any[]> {
  return new Promise((resolve) => {
    const newStatus = messages[0];
    csvFile = orders.map((item) => {
      if (item.status === "send") {
        return {
          name: item.name,
          phone: item.phone,
          status: newStatus.send,
        };
      }
      if (item.status === "pending") {
        return {
          name: item.name,
          phone: item.phone,
          status: newStatus.pending,
        };
      }
      if (item.status === "cancel") {
        return {
          name: item.name,
          phone: item.phone,
          status: newStatus.cancel,
        };
      }
      return console.log("error");
    });
    resolve(csvFile);
  });
}
