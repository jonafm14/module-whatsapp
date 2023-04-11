import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import MessageExternal from "../../domain/whatsapp-external.interface";
import fs from "fs";
class WsTransporter extends Client implements MessageExternal {
  private status = false;
  private qrPath = `${process.cwd()}/tmp/qr.png`;

  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true },
    });

    console.log("Iniciando....");

    console.log(this.initialize());

    this.on("ready", () => {
      this.status = true;
      console.log("LOGIN_SUCCESS");
    });

    this.on("auth_failure", () => {
      this.status = false;
      console.log("LOGIN_FAIL");
    });

    this.on("qr", (qr) => {
      console.log("Escanea el codigo QR que esta en la carepta tmp");
      this.generateImage(qr);
    });
  }

  async sendMsg(lead: { message: string; phone: string }): Promise<any> {
    console.log(this.status);
    try {
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const { message, phone } = lead;
      const response = await this.sendMessage(`${phone}@c.us`, message);
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  getStatus(): boolean {
    this.initialize();
    return this.status;
  }

  getQr(): string {
    try {
      const data = fs.readFileSync(this.qrPath);
      return Buffer.from(data).toString("base64");
    } catch (err) {
      console.error(err);
      return "";
    }
  }

  public generateImage = (base64: string) => {
    const qr_png = imageQr(base64, { type: "png", margin: 4 });
    qr_png.pipe(fs.createWriteStream(this.qrPath));
  };
}

export default WsTransporter;
