import { Exclude, Expose, Transform } from "class-transformer";
import {Column,  Entity,  PrimaryGeneratedColumn,} from "typeorm";


@Entity("wallets")
export class Wallet {
    @Expose({name: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Transform(Number)
    @Column('decimal', { precision: 13, scale: 2, default: 0.0 })
    balance: number;
}