import { ContainerBuilder } from "node-dependency-injection";
import { MessageCreate } from "../application/lmessage.create";
import MessageController from "./controller/message.controller";
import WsTransporter from "./repositories/ws.external";

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

export default container;
