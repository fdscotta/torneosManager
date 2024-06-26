import { sql } from "@vercel/postgres";
import { CouplesSelect, GroupsSelect, Tournaments, User } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchActiveTournaments() {
  noStore();
  try {
    const data = await sql<Tournaments>`
      SELECT *
      FROM tournaments
      WHERE status = 0
      LIMIT 1`;

    return data.rows;
    //return activeTournaments?.id;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the active tournaments.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTournaments(
  query: string,
  currentPage: number,
  userRole?: string
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  if (query == undefined) {
    query = "";
  }
  try {
    const tournaments = await sql<Tournaments>`
      SELECT *
      FROM tournaments
      WHERE
        lower(name::text) LIKE lower(${`%${query}%`})
        AND (
          CASE
              WHEN ${userRole} = 'admin' THEN 1=1
              ELSE tournament_type = ${userRole}
          END
        )
      ORDER BY status,date
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tournaments.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tournaments.");
  }
}

export async function fetchTournamentsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tournaments`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of tournaments.");
  }
}

export async function fetchTournamentById(id: string) {
  noStore();
  try {
    const data = await sql<Tournaments>`
      SELECT *
      FROM tournaments
      WHERE id = ${id};
    `;

    const tournament = data.rows;

    return tournament[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tournament.");
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql<User>`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
