import { User } from "../entities/user";

export interface UserForUpdateDto extends User{
    imageUrl:string;
    firstName:string;
    lastName:string;
    email:string;
}
