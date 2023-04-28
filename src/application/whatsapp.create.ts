import WhatsappExternal from "../domain/whatsapp-external.interface";

export class MessageCreate {
  private messageExternal: WhatsappExternal;
  constructor(respositories: [WhatsappExternal]) {
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

export class StatusSend {
  private statusExternal: WhatsappExternal;
  constructor(repositories: [WhatsappExternal]) {
    const [statusExternal] = repositories;
    this.statusExternal = statusExternal;
  }

  public getStatus() {
    const response = this.statusExternal.getStatus();
    return { response };
  }
}

export class QrSend {
  private qrExternal: WhatsappExternal;
  constructor(repositories: [WhatsappExternal]) {
    const [qrExternal] = repositories;
    this.qrExternal = qrExternal;
  }

  public getQr() {
    const response = this.qrExternal.getQr();
    return { response };
  }
}
