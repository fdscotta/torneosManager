import { getGroupsByTournament } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function POST( request: Request, context: any ) {
  const { params } = context;

  const groups = await getGroupsByTournament(params.tid);

  return NextResponse.json({
    groups
  })
}
