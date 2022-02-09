import { User } from "../../modules/user/entities/user.entity";

export interface ServiceMethodOptions {
    currentUser?: User;
    query?: any;
}