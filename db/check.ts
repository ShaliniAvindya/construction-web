import { getDb } from "../api/queries/connection";

async function checkSchema() {
  const db = getDb();
  const result = await db.execute("SHOW CREATE TABLE users");
  console.log(JSON.stringify(result, null, 2));
}

checkSchema().catch(console.error);
