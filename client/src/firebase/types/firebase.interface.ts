export interface Message {
  id?: string;
  send?: string;
  pending?: string;
  cancel?: string;
}

export interface Orders {
  id?: string;
  name?: string;
  phone?: string | number;
  status?: string;
  price?: string;
}
