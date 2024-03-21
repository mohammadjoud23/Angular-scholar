export interface ScholarshipsReports {
  id: number;
  scholarship_id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: ScholarhipsUsers;
  scholarship: Scholarships;
}
export interface ScholarhipsUsers {
  id: number;
  name: string;
}

export interface Scholarships {
  id: number;
  name: string;
}

export interface PostsReports {
  id: number;
  post_id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  user: PostsUsers;
  post: Posts;
}
export interface PostsUsers {
  id: number;
  name: string;
  image: string;
}
export interface Posts {
  id: number;
  body: string;
}
