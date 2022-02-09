import { Exclude, Expose } from "class-transformer";
import { AfterLoad, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("withdrawals")
export class Withdrawal {
  @Expose({name: 'uuid'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({type: "varchar" })
  walletId: string;

  @Column({type: "varchar" })
  userId: string;

  @Column({type: "varchar" })
  bankDetailId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  multiplyAmountBy100() {
    this.amount = this.amount * 100;
  }

  @AfterLoad()
  divideAmountBy100() {
    this.amount = this.amount / 100;
  }
}
