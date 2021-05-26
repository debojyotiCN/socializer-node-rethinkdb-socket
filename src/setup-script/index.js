(async () => {
  const dotenv = require("dotenv");
  dotenv.config();
  try {
    // All other imports
    const rethinkDb = require("rethink-crud");

    await rethinkDb.startEngine({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    });

    // Create the db
    await rethinkDb.createDb(process.env.DB_NAME);
    // Select db
    const deepPocketDbRef = new rethinkDb(process.env.DB_NAME);
    // Create collections
    await deepPocketDbRef.createCollection("users");
    await deepPocketDbRef.createCollection("banks");
    await deepPocketDbRef.createCollection("tags");
    await deepPocketDbRef.createCollection("categories");
    await deepPocketDbRef.createCollection("account-logs");
    // Show all collections
    const collections = await deepPocketDbRef.listCollections();
    console.log("collections :>> ", collections);
  } catch (error) {
    console.log("error :>> ", error);
  }
})();
