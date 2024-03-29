import express, { Router } from "express";
import MessageController from "../controller/message.controller";
import container from "../ioc";
import StatusController from "../controller/status.controller";
import QrController from "../controller/qr.controller";
const router = Router();

const messageControllerPost: MessageController =
  container.get("message.controller");
router.post("/whatsapp", messageControllerPost.sendController);

const statusControllerGet: StatusController =
  container.get("status.controller");
router.get("/whatsapp/status", statusControllerGet.sendStatus);

const qrControllerGet: QrController = container.get("qr.controller");
router.get("/whatsapp/qr", qrControllerGet.sendQr);

export { router };
