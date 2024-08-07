import { User } from "../entities/user";

export interface UserForCreateDto extends User{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}
