// this is a shared type between the frontend and backend
export interface IUser {
  id: string;
  username: string;
  isTyping?: boolean;
}
