import express, { Router } from "express";
import MessageController from "../controller/message.controller";
import container from "../ioc";
// import container from "../ioc";
const router: Router = Router();

/**
 * http://localhost/message POST
 */
const messageControllerPost: MessageController =
  container.get("message.controller");
router.post("/", messageControllerPost.sendController);

export { router };
