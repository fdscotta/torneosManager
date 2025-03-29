import { getCouplesBy16vos } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const { params } = context;

  const couples = await getCouplesBy16vos(params.tID);

  return NextResponse.json({
    couples,
  });
}
