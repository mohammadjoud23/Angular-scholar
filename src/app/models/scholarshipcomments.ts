export interface Users {
  id: number;
  name: string;
  image: string;
}

export interface Comments {
  id: number;
  scholarship_id: number;
  user_id: number;
  body: string;
  created_at: string;
  user: Users;
}

export interface ScholarshipsComments {
  id: number;
  body: string;
  user_id: number;
  scholarship_id: number;
}
