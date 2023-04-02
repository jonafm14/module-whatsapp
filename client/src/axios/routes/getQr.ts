import axios, { AxiosResponse } from "axios";
import { QrResponse } from "../interface/axios.interface";

export async function getQr(): Promise<string> {
  try {
    const response: AxiosResponse<QrResponse> = await axios.get(
      "http://localhost:3001/whatsapp/qr",
    );
    let qr = response.data.success.response;
    return qr;
  } catch (error) {
    console.error(error);
    return "";
  }
}
