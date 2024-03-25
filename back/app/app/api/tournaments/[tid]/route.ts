import { getTournamentById } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const { params } = context;

  const tournament = await getTournamentById(params.tid);

  return NextResponse.json({
    tournament,
  });
}
