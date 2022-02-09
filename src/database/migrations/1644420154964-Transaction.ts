import {MigrationInterface, QueryRunner} from "typeorm";

export class Transaction1644420154964 implements MigrationInterface {
    name = 'Transaction1644420154964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` char(36) NOT NULL, \`amount\` decimal NOT NULL, \`walletId\` varchar(255) NOT NULL, \`remark\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`transactions\``);
    }

}
