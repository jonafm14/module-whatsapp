import { messages, orders } from "../controller/firebase.controller";

export let jsonFile: any[] = [];

export function handleCaptureOrderData(): Promise<any[]> {
  return new Promise((resolve) => {
    const newStatus = messages[0];
    jsonFile = orders.map((item) => {
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
    resolve(jsonFile);
  });
}
