const { db } = require('@vercel/postgres');
const {
  users,
} = require('../lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers (client) {
  try {
    // await client.sql`DROP TABLE users`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, phone, email, password)
        VALUES (${user.id}, ${user.name}, ${user.phone}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function createTorneos (client) {
  try {
    await client.sql`DROP TABLE tournaments`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tournaments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        status INT NOT NULL,
        type TEXT,
        image VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        tournament_type VARCHAR,
        param_q_per_group VARCHAR;
      );
    `;

    console.log(`Created "tournaments" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating tournaments:', error);
    throw error;
  }
}

async function createParejasTorneo (client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tournament_couples (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        player1 VARCHAR(255) NOT NULL,
        player2 VARCHAR(255) NOT NULL,
        tournament_id VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "tournament_couples" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating tournament_couples:', error);
    throw error;
  }
}

async function createParejasZona (client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS group_couples (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        group_id VARCHAR(255) NOT NULL,
        couple_id VARCHAR(255) NOT NULL UNIQUE
      );
    `;

    console.log(`Created "group_couples" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating group_couples:', error);
    throw error;
  }
}

async function createResultadosZona (client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS group_results (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        group_id VARCHAR(255) NOT NULL,
        couple1_id VARCHAR(255) NOT NULL,
        couple2_id VARCHAR(255) NOT NULL,
        winner VARCHAR(255),
        set_1_c1 VARCHAR(255),
        set_2_c1 VARCHAR(255),
        set_3_c1 VARCHAR(255),
        set_1_c2 VARCHAR(255),
        set_2_c2 VARCHAR(255),
        set_3_c2 VARCHAR(255),
        match_date TIMESTAMP
      );
    `;

    console.log(`Created "tournaments" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating tournaments:', error);
    throw error;
  }
}

async function createQualifiers (client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS qualifiers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        couple_id VARCHAR(255) NOT NULL,
        rel_from VARCHAR(255),
        rel_to VARCHAR(255),
        winner VARCHAR(255)
      );
    `;

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating qualifiers table:', error);
    throw error;
  }
}

async function createCoupleNamesView (client) {
  try {
    const createTable = await client.sql`
      CREATE OR REPLACE VIEW couple_names_view AS
        SELECT id, CONCAT(player1, '-', player2) as couple_name
        FROM tournament_couples;
      );
    `;

    console.log(`Created "couple_names_view" view`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating couple_names_view:', error);
    throw error;
  }
}

async function createGroupTableResultsView (client) {
  try {
    const createTable = await client.sql`
      CREATE OR REPLACE VIEW tournament_results_view AS
      SELECT
          b.id AS couple_id,
          CONCAT(b.player1, '-', b.player2) AS couple_names,
          SUM(
              CASE WHEN a.couple1_id = b.id::text THEN
                  CASE WHEN a.set_1_c1 > a.set_1_c2 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_2_c1 > a.set_2_c2 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_3_c1 > a.set_3_c2 THEN 1 ELSE 0 END
              ELSE
                  CASE WHEN a.set_1_c2 > a.set_1_c1 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_2_c2 > a.set_2_c1 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_3_c2 > a.set_3_c1 THEN 1 ELSE 0 END
              END
          ) -
          SUM(
              CASE WHEN a.couple1_id = b.id::text THEN
                  CASE WHEN a.set_1_c1 < a.set_1_c2 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_2_c1 < a.set_2_c2 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_3_c1 < a.set_3_c2 THEN 1 ELSE 0 END
              ELSE
                  CASE WHEN a.set_1_c2 < a.set_1_c1 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_2_c2 < a.set_2_c1 THEN 1 ELSE 0 END +
                  CASE WHEN a.set_3_c2 < a.set_3_c1 THEN 1 ELSE 0 END
              END
          ) AS sets_total,
          (SUM(
              CASE WHEN a.couple1_id = b.id::text THEN COALESCE(NULLIF(a.set_1_c1, ''), '0') ::integer + COALESCE(NULLIF(a.set_2_c1, ''), '0')::integer +
              COALESCE(NULLIF(a.set_3_c1, ''), '0')::integer
              ELSE COALESCE(NULLIF(a.set_1_c2, ''), '0')::integer END +
              COALESCE(NULLIF(a.set_2_c2, ''), '0')::integer +
              COALESCE(NULLIF(a.set_3_c2, ''), '0')::integer
          ) -
          SUM(
              CASE WHEN a.couple1_id = b.id::text THEN COALESCE(NULLIF(a.set_1_c2, ''), '0')::integer + COALESCE(NULLIF(a.set_2_c2, ''), '0')::integer +
              COALESCE(NULLIF(a.set_3_c2, ''), '0')::integer
              ELSE COALESCE(NULLIF(a.set_1_c1, ''), '0')::integer END +
              COALESCE(NULLIF(a.set_2_c1, ''), '0')::integer +
              COALESCE(NULLIF(a.set_3_c1, ''), '0')::integer
          )) AS total_games,
          SUM(
              CASE WHEN a.couple1_id = b.id::text THEN COALESCE(NULLIF(a.set_1_c1, ''), '0')::integer + COALESCE(NULLIF(a.set_2_c1, ''), '0')::integer +
              COALESCE(NULLIF(a.set_3_c1, ''), '0')::integer
              ELSE COALESCE(NULLIF(a.set_1_c2, ''), '0')::integer END +
              COALESCE(NULLIF(a.set_2_c2, ''), '0')::integer +
              COALESCE(NULLIF(a.set_3_c2, ''), '0')::integer
          ) AS games_positive,
          SUM(
              CASE WHEN a.couple1_id = b.id::text AND a.winner = 'couple_1' THEN 1
                  WHEN a.couple2_id = b.id::text AND a.winner = 'couple_2' THEN 1 ELSE 0 END
          ) AS wins,
          b.tournament_id,
          a.group_id
      FROM
          group_results AS a
      INNER JOIN
          tournament_couples AS b ON a.couple1_id = b.id::text OR a.couple2_id = b.id::text
      GROUP BY
          b.id,
          b.player1,
          b.player2,
          a.group_id
      ORDER BY
          sets_total DESC,
          total_games DESC,
          games_positive DESC;
    `;

    console.log(`Created "createGroupTableResultsView" view`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error creating createGroupTableResultsView:', error);
    throw error;
  }
}

async function main () {
  const client = await db.connect();

  //await seedUsers(client);
  //await createTorneos(client);
  //await createJugadores(client);
  //await createParejasTorneo(client);
  //await createParejasZona(client);
  //await createResultadosZona(client);
  //await createGroupTableResultsView(client);
  //await createQualifiers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
