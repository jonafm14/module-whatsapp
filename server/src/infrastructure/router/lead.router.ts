import express, { Router } from "express";
import LeadController from "../controller/lead.controller";
import container from "../ioc";
// import container from "../ioc";
const router: Router = Router();

/**
 * http://localhost/lead POST
 */
const leadCtrl: LeadController = container.get("lead.controller");
router.post("/", leadCtrl.sendCtrl);

export { router };
//https://github.com/leifermendez/api-whatsapp-ts/tree/main/src/domain
