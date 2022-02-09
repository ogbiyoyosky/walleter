import {MigrationInterface, QueryRunner} from "typeorm";

export class BankDetail1644430048595 implements MigrationInterface {
    name = 'BankDetail1644430048595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bank_details\` (\`id\` char(36) NOT NULL, \`accountNumber\` varchar(255) NOT NULL, \`accountName\` varchar(255) NOT NULL, \`bankCode\` varchar(255) NOT NULL, \`bankName\` varchar(255) NOT NULL, \`recipientCode\` varchar(255) NOT NULL, \`userId\` char(36) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`bank_details\` ADD CONSTRAINT \`FK_d566e3c5f9b1b1c497d709c1fcc\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bank_details\` DROP FOREIGN KEY \`FK_d566e3c5f9b1b1c497d709c1fcc\``);
        await queryRunner.query(`DROP TABLE \`bank_details\``);
    }

}
