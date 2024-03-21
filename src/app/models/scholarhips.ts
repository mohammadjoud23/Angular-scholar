export interface Scholarships {
  id: number;
  user_id: number;
  name: string;
  salary: number;
  lang_certificate: boolean;
  country: string;
  opening: string;
  closing: string;
  duration: number;
  thumpnail: string;
  created_at: string;
  updated_at: string;
  number_of_seats: number;
  allowed_to_work: boolean;
  study_program: string;
  traveling_costs: boolean;
  further_description: string;
  college_score_needed: number;
  requirments: Requirments[];
}

export interface ScholarshipsDto {
  current_page: number;
  data: Scholarships[];
  to: number;
  total: number;
}

export interface Requirments {
  id: number;
  user_id: number;
  scholarship_id: number;
  description: string;
  created_at: string;
}

// export interface Posts{
//     id: number;
//     user_id: number;
//     body: string;
//     created_at: string;
//     updated_at: string;
//     user: Users;
//     // user:{
//     //     id: number;
//     //     name:string;
//     // };
// }

// export interface Users {
//     id: number;
//     name: string;
// }

// export interface PostsDto{
//     current_page: number;
//     data: Posts[];
//     to:number;
//     total:number;
// }

// export interface Post{
//     id:number;
//     body: string;
//     user_id: number;
// }
