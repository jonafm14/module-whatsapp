export default interface FirebaseExternal {
  getOrders(): Promise<any>;
  getMessages(): Promise<any>;
  getOrderesMessages(): Promise<any>;
}
