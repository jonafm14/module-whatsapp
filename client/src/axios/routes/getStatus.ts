import axios, { AxiosResponse } from "axios";
import { StatusResponse } from "../interface/axios.interface";

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
