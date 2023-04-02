import {
  collection,
  getDocs,
  getFirestore,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { Message, Orders } from "../types/firebase.interface";
import { app } from "../firebase.config";

export const firestore = getFirestore(app);
export const messageColection = collection(firestore, "message");
export const ordersCollection = collection(firestore, "orders");

export let messages: Message[] = [];
export let orders: Orders[] = [];

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
