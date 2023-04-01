import axios, { AxiosResponse } from "axios";

interface StatusResponse {
  success: {
    response: boolean;
  };
}

interface QrResponse {
  success: {
    response: string;
  };
}

export async function getStatus(): Promise<boolean> {
  try {
    const response: AxiosResponse<StatusResponse> = await axios.get(
      "http://localhost:3001/whatsapp/status",
    );
    let success = response.data.success.response;
    console.log(success);
    return success;
  } catch (error) {
    console.error(error);
    return false;
  }
}

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
