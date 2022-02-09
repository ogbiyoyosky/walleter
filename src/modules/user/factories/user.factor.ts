import { Wallet } from "src/modules/wallet/entities/wallet.entity";
import { User } from "../entities/user.entity";
import { CreateUserData } from "../interfaces/create-user.interface";

export class UserFactory {
    static createNew(data: CreateUserData): User {
    const user = new User();

    for (const [key, value] of Object.entries(data)) {
        user[key] = value;
    }

    return user;
    }

    static generateUserForJwt ({id, name, email, wallet}: User){
        return {
            id, name, email, wallet
        }
    }
} 