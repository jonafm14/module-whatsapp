import { Request, Response, response } from "express";
import { FirebaseGet } from "../../application/firestore.create";

class FirebaseController {
  constructor(private readonly firestoreGet: FirebaseGet) {}

  public getMessage = async (req: Request, res: Response) => {
    const response = await this.firestoreGet.getMessages();
    res.send(response);
  };

  public getOrders = async (req: Request, res: Response) => {
    const response = await this.firestoreGet.getOrders();
    res.send(response);
  };

  public getOrderesMessage = async (req: Request, res: Response) => {
    const response = await this.firestoreGet.getOrderesMessages();
    res.send(response);
  };
}

export default FirebaseController;
