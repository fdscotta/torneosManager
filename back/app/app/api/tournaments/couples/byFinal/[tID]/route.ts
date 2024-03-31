import { getCouplesByFinal } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const { params } = context;

  const couples = await getCouplesByFinal(params.tID);

  return NextResponse.json({
    couples,
  });
}
