import {MigrationInterface, QueryRunner} from "typeorm";

export class Withdrawal1644425528339 implements MigrationInterface {
    name = 'Withdrawal1644425528339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`withdrawals\` (\`id\` char(36) NOT NULL, \`amount\` decimal NOT NULL, \`walletId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`bankDetailId\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`withdrawals\``);
    }

}
