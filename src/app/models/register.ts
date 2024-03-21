export interface Register {
    name:string;
    email:string;
    password:string;
    password_confirmation:string;

}

export interface Login {
    email:string;
    password:string;
}