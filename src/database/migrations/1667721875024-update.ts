import {MigrationInterface, QueryRunner} from "typeorm";

export class update1667721875024 implements MigrationInterface {
    name = 'update1667721875024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_credentials" ADD CONSTRAINT "UQ_09555f2fe4ad3a2e774d244a48d" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_credentials" DROP CONSTRAINT "UQ_09555f2fe4ad3a2e774d244a48d"`);
    }

}
