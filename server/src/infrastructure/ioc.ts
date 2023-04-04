import { ContainerBuilder } from "node-dependency-injection";
import {
  MessageCreate,
  QrSend,
  StatusSend,
} from "../application/whatsapp.create";
import MessageController from "./controller/message.controller";
import WsTransporter from "./repositories/ws.external";
import StatusController from "./controller/status.controller";
import QrController from "./controller/qr.controller";
import Firebase from "./repositories/firebase.external";
import { FirebaseGet } from "../application/firestore.create";
import FirebaseController from "./controller/firebase.controller";

const container = new ContainerBuilder();

container.register("ws.transporter", WsTransporter);
const wsTransporter = container.get("ws.transporter");

container
  .register("message.creator", MessageCreate)
  .addArgument([wsTransporter]);
const messageCreator = container.get("message.creator");
container
  .register("message.controller", MessageController)
  .addArgument(messageCreator);

container.register("status.send", StatusSend).addArgument([wsTransporter]);
const statusSend = container.get("status.send");
container
  .register("status.controller", StatusController)
  .addArgument(statusSend);

container.register("qr.send", QrSend).addArgument([wsTransporter]);
const qrSend = container.get("qr.send");
container.register("qr.controller", QrController).addArgument(qrSend);

container.register("firebase.transporter", Firebase);
const firebaseTransporter = container.get("firebase.transporter");

container
  .register("firebase.get", FirebaseGet)
  .addArgument([firebaseTransporter]);
const messageGet = container.get("firebase.get");
container
  .register("firebase.controller", FirebaseController)
  .addArgument(messageGet);
const orderGet = container.get("firebase.get");
container
  .register("firebase.controller", FirebaseController)
  .addArgument(orderGet);

const orderMessageGet = container.get("firebase.get");
container
  .register("firebase.controller", FirebaseController)
  .addArgument(orderMessageGet);

export default container;
