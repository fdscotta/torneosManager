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
        date DATE NOT NULL
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
        match_date DATE
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

async function main () {
  const client = await db.connect();

  await seedUsers(client);
  //await createTorneos(client);
  //await createJugadores(client);
  //await createParejasTorneo(client);
  //await createParejasZona(client);
  //await createResultadosZona(client);


  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
