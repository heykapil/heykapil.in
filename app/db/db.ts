import { Kysely } from "kysely";
import { XataDialect, Model } from "@xata.io/kysely";
import { DatabaseSchema, getXataClient } from "./xata"; // Generated client
const xata = getXataClient();

export const queryBuilder = new Kysely<Model<DatabaseSchema>>({
  dialect: new XataDialect({ xata }),
});
