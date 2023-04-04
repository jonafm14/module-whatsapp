import FirebaseExternal from "../domain/firebase.interface";

export class FirebaseGet {
  private firebaseExternal: FirebaseExternal;
  constructor(repositories: [FirebaseExternal]) {
    const [firebaseExternal] = repositories;
    this.firebaseExternal = firebaseExternal;
  }

  public async getOrders() {
    const response = await this.firebaseExternal.getOrders();
    return { response };
  }

  public async getMessages() {
    const response = await this.firebaseExternal.getMessages();
    return { response };
  }

  public async getOrderesMessages() {
    const response = await this.firebaseExternal.getOrderesMessages();
    return { response };
  }
}
