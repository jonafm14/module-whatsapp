import { Request, Response, response } from "express";
import { MessageCreate } from "../../application/whatsapp.create";

class MessageController {
  constructor(private readonly messageCreator: MessageCreate) {}

  public sendController = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    const response = await this.messageCreator.sendMessage({
      message,
      phone,
    });
    res.send(response);
  };
}

export default MessageController;
