import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity("bank_details")
export class BankDetail {
    @Expose({name: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    accountNumber: string;

    @Column({ type: 'varchar' })
    accountName: string;

    @Column({type: "varchar" })
    bankCode: string;

    @Column({type: "varchar" })
    bankName: string;

    @Exclude()
    @Column({type: "varchar" })
    recipientCode: string;

    @Exclude()
    @Column({type: "varchar" })
    userId: string;

    @Exclude()
    @Column({ type: "boolean", default: false })
    isDeleted: boolean;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;
}
