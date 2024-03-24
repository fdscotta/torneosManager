import { getCouplesBySemis } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const { params } = context;

  const couples = await getCouplesBySemis(params.tID);

  return NextResponse.json({
    couples,
  });
}
