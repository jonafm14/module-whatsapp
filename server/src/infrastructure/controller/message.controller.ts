import { Request, Response } from "express";
import { MessageCreate } from "../../application/lmessage.create";

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
