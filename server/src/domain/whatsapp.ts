import { v4 as uuid } from "uuid";

export class Message {
  readonly uuid: string;
  readonly message: string;
  readonly phone: string;

  constructor({ message, phone }: { message: string; phone: string }) {
    this.uuid = uuid();
    this.message = message;
    this.phone = phone;
  }
}

export class Status {
  readonly status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
