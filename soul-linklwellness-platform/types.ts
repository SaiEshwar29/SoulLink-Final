
export enum Sender {
  User = 'user',
  Astha = 'astha',
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  message: string;
  createdAt: Date;
}

export interface Resource {
  title: string;
  description: string;
  link: string;
}
export enum FormState {
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export enum UserRole {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
}