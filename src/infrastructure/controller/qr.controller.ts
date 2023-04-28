import { Request, Response, response } from "express";
import { QrSend } from "../../application/whatsapp.create";

class QrController {
  constructor(private readonly qrSend: QrSend) {}

  public sendQr = async (req: Request, res: Response) => {
    const response = this.qrSend.getQr();
    res.status(response ? 200 : 500).send({ success: response });
  };
}

export default QrController;
