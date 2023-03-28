import MessageExternal from "../domain/message-external.repository";

export class MessageCreate {
  private messageExternal: MessageExternal;
  constructor(respositories: [MessageExternal]) {
    const [messageExternal] = respositories;
    this.messageExternal = messageExternal;
  }

  public async sendMessage({
    message,
    phone,
  }: {
    message: string;
    phone: string;
  }) {
    const response = await this.messageExternal.sendMsg({ message, phone });
    return { response, phone, message };
  }
}
