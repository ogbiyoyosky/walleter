import { Exclude, Expose } from "class-transformer";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PaymentStatus } from "../enum/payment.enum";

@Entity("payments")
export class Payment {
  @Expose({name: 'uuid'})
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  reference: string;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({type: "varchar", default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({type: "varchar", default: null })
  failureReason: string;

  @Column({type: "varchar" })
  metadata: any;

  @Column({ type: 'varchar' })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  stringifyMetadataOnInsert() {
    if (this.metadata) {
      this.metadata = JSON.stringify(this.metadata);
    }
  }

  @BeforeUpdate()
  stringifyMetadataOnUpdate() {
    if (this.metadata) {
      this.metadata = JSON.stringify(this.metadata);
    }
  }

  @AfterLoad()
  parseMetadata() {
    if (this.metadata) {
      this.metadata = JSON.parse(this.metadata);
    }
  }

  @BeforeInsert()
  multiplyAmountBy100() {
    this.amount = this.amount * 100;
  }

  @AfterLoad()
  divideAmountBy100() {
    this.amount = this.amount / 100;
  }
}
