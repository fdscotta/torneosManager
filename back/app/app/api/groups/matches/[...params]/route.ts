import { getMatchesByGroups } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const { params } = context;

  const matches = await getMatchesByGroups(params.params[0], params.params[1]);

  return NextResponse.json({
    matches,
  });
}
