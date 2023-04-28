import { Request, Response, response } from "express";
import { MessageCreate } from "../../application/whatsapp.create";

class MessageController {
  constructor(private readonly messageCreator: MessageCreate) {}

  public sendController = async ({ body }: Request, res: Response) => {
    const { message, phone } = body;
    try{const response = await this.messageCreator.sendMessage({
      message,
      phone,
    });
    res.send(response);
  }catch(e){
      console.log(e)
    }
  };
}

export default MessageController;
