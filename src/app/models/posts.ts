export interface Posts {
  id: number;
  user_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user: Users;
  postcomments: PostComments[];
  // user:{
  //     id: number;
  //     name:string;
  // };
}

export interface Users {
  id: number;
  name: string;
  image: string;
}

export interface PostsDto {
  current_page: number;
  data: Posts[];
  to: number;
  total: number;
}

export interface Post {
  id: number;
  body: string;
  user_id: number;
}

export interface PostComments {
  id: number;
  post_id: number;
  user_id: number;
  body: string;
  created_at: string;
  user: Users;
}
