import { IArticle } from "./IArticle";

export interface IUser {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  photo: string;
  favoritePosts: IArticle[];
}
