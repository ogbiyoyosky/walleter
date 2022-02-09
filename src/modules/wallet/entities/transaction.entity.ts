import { Exclude, Expose } from "class-transformer";
import { AfterLoad, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("transactions")
export class Transaction {
  @Expose({name: 'uuid'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({type: "varchar" })
  walletId: string;

  @Column({type: "varchar" })
  remark: string;

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
