import {MigrationInterface, QueryRunner} from "typeorm";

export class init1587697959952 implements MigrationInterface {
    name = 'init1587697959952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastModified" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "published" TIMESTAMP NOT NULL DEFAULT '2020-04-24T03:17:25.120Z', "lastModified" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "genre_books_book" ("genreId" uuid NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_597207e8a8ab547a0615df86cb6" PRIMARY KEY ("genreId", "bookId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0690591237ade3109687a5afec" ON "genre_books_book" ("genreId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_56a73217b062dfedfb221dd7ec" ON "genre_books_book" ("bookId") `, undefined);
        await queryRunner.query(`ALTER TABLE "genre_books_book" ADD CONSTRAINT "FK_0690591237ade3109687a5afec1" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "genre_books_book" ADD CONSTRAINT "FK_56a73217b062dfedfb221dd7eca" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genre_books_book" DROP CONSTRAINT "FK_56a73217b062dfedfb221dd7eca"`, undefined);
        await queryRunner.query(`ALTER TABLE "genre_books_book" DROP CONSTRAINT "FK_0690591237ade3109687a5afec1"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_56a73217b062dfedfb221dd7ec"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0690591237ade3109687a5afec"`, undefined);
        await queryRunner.query(`DROP TABLE "genre_books_book"`, undefined);
        await queryRunner.query(`DROP TABLE "book"`, undefined);
        await queryRunner.query(`DROP TABLE "genre"`, undefined);
    }

}
