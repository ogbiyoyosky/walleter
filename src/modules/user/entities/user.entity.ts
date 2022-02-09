import { Exclude, Expose } from "class-transformer";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { compareStringViaHash, hashString } from "../utils/string.utils";

@Entity("users")
export class User {
    @Expose({name: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Exclude()
    @Column({ type: 'varchar' })
    password: string;

    @Column({type: "varchar", unique: true })
    email: string

    @OneToOne(() => Wallet)
    @JoinColumn()
    wallet: Wallet;

    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hashString(this.password);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await compareStringViaHash(this.password, password)
    }


}