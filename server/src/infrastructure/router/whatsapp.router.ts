import express, { Router } from "express";
import MessageController from "../controller/message.controller";
import container from "../ioc";
import StatusController from "../controller/status.controller";
import QrController from "../controller/qr.controller";
import FirebaseController from "../controller/firebase.controller";
const router = Router();

const messageControllerPost: MessageController =
  container.get("message.controller");
router.post("/whatsapp", messageControllerPost.sendController);

const statusControllerGet: StatusController =
  container.get("status.controller");
router.get("/whatsapp/status", statusControllerGet.sendStatus);

const qrControllerGet: QrController = container.get("qr.controller");
router.get("/whatsapp/qr", qrControllerGet.sendQr);

const messageControllerGet: FirebaseController = container.get(
  "firebase.controller",
);
router.get("/firebase/messages", messageControllerGet.getMessage);

const ordersControllerGet: FirebaseController = container.get(
  "firebase.controller",
);
router.get("/firebase/orders", ordersControllerGet.getOrders);

const ordersMessageControllerGet: FirebaseController = container.get(
  "firebase.controller",
);
router.get(
  "/firebase/ordersMessages",
  ordersMessageControllerGet.getOrderesMessage,
);

export { router };
