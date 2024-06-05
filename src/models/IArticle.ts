export interface IArticle {
  id: number;
  author: string;
  authorId: number;
  authorPhoto: string;
  organization: string;
  categories: string;
  likeCount: string;
  photo: string;
  title: string;
  subtitle: string;
  body: {
    [key: string]: string;
  };
  viewCount: number;
  readTime: number;
  status: "draft" | "published";
  approved: boolean;
  updated: string;
  created: string;
  likes: number[];
}
