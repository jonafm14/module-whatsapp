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

export default container;
