export default interface MessageExternal {
  sendMsg({ message, phone }: { message: string; phone: string }): Promise<any>;
}
