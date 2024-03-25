import { getTournaments } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const groups = await getTournaments();

  return NextResponse.json({
    groups,
  });
}
