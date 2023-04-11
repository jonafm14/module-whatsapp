export default interface WhatsappExternal {
  sendMsg({ message, phone }: { message: string; phone: string }): Promise<any>;
  getStatus(): boolean;
  getQr(): string;
}
