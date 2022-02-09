import {MigrationInterface, QueryRunner} from "typeorm";

export class Wallet1644342433633 implements MigrationInterface {
    name = 'Wallet1644342433633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wallets\` (\`id\` char(36) NOT NULL, \`balance\` decimal(13,2) NOT NULL DEFAULT '0.00', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`walletId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_0a95e6aab86ff1b0278c18cf48\` (\`walletId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0a95e6aab86ff1b0278c18cf48\` ON \`users\` (\`walletId\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0a95e6aab86ff1b0278c18cf48e\` FOREIGN KEY (\`walletId\`) REFERENCES \`wallets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0a95e6aab86ff1b0278c18cf48e\``);
        await queryRunner.query(`DROP INDEX \`REL_0a95e6aab86ff1b0278c18cf48\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_0a95e6aab86ff1b0278c18cf48\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`walletId\``);
        await queryRunner.query(`DROP TABLE \`wallets\``);
    }

}
