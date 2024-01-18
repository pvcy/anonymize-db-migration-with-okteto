const { Client } = require("pg");
const fs = require("fs").promises;

const connectToDatabase = async () => {
  let client;
  let retries = 0;
  while (retries < 5) {
    retries++;
    console.log(`Attempt ${retries} to connect to database`);
    client = new Client({
      host: process.env.DB_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
    try {
      await client.connect();
      console.log("Connected successfully to the database");
      break;
    } catch (error) {
      console.log("Waiting on database.");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  await client.query("DROP TABLE IF EXISTS users;");

  await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            user_id int NOT NULL UNIQUE,
            first_name varchar(255),
            last_name varchar(255),
            phone varchar(15),
            city varchar(255),
            state varchar(30),
            zip varchar(12),
            age int,
            gender varchar(10),
            dob varchar(255)
        );
    `);

  const usersJson = await fs.readFile("users.json", "utf-8");
  const usersData = JSON.parse(usersJson);

  const insertSql = `
        INSERT INTO users
        SELECT * FROM json_populate_recordset(NULL::users, $1)
    `;
  await client.query(insertSql, [JSON.stringify(usersData)]);

  await client.end();

  console.log("Done loading");
};

connectToDatabase();
