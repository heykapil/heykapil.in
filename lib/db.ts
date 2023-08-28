import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { DB } from "types/db-types";

export const queryBuilder = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.DURL,
  }),
});
