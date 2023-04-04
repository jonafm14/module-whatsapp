import { initializeApp } from "firebase-admin/app";
import FirebaseExternal from "../../domain/firebase.interface";
const { db } = require("../utils/firebase.config");
import { QuerySnapshot } from "firebase-admin/firestore";
const { collection } = require("firebase-admin/firestore");
import { CollectionReference, Firestore } from "firebase-admin/firestore";

class Firebase implements FirebaseExternal {
  private db: Firestore;
  private messageCollection: CollectionReference;
  private ordersCollection: CollectionReference;
  private jsonFile: any;
  private message: any;
  private orders: any;

  constructor() {
    this.db = db;
    this.messageCollection = this.db.collection("message");
    this.ordersCollection = this.db.collection("orders");
  }

  async getOrders(): Promise<any> {
    try {
      const snapshot: QuerySnapshot<any> = await this.ordersCollection.get();
      this.orders = snapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return this.orders;
    } catch (e: any) {
      return { error: e.message };
    }
  }

  async getMessages(): Promise<any> {
    try {
      const snapshot: QuerySnapshot<any> = await this.messageCollection.get();
      this.message = snapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return this.message;
    } catch (e: any) {
      return { error: e.message };
    }
  }

  async getOrderesMessages(): Promise<any> {
    await this.getMessages();
    await this.getOrders();
    try {
      return new Promise((resolve) => {
        const newStatus = this.message[0];
        this.jsonFile = this.orders.map((item: any) => {
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
        resolve(this.jsonFile);
      });
    } catch (e: any) {
      return { error: e.message };
    }
  }
}

export default Firebase;
