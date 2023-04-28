import { Request, Response, response } from "express";
import { StatusSend } from "../../application/whatsapp.create";

export default class StatusController {
  constructor(private readonly statusSend: StatusSend) {}

  public sendStatus = async (req: Request, res: Response) => {
    const response = this.statusSend.getStatus();
    res.status(response ? 200 : 500).send({ success: response });
  };
}
