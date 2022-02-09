import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
    constructor( @InjectRepository(User)private readonly userRepo: Repository<User>) {}

    async findByUserId(id: string): Promise<User | undefined> {
        const user = await this.userRepo.findOne({ where: { id }, relations: ['wallet'] });
        
        if (!user) return undefined
    
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) return undefined
    
        return user;
    }

    async save(user: User): Promise<User> {
        return await this.userRepo.save(user);
    }

    async update(user: User, data) {
        return await this.userRepo.save({ ...user,...data });
    }
}
