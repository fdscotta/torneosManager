import { getCouplesBy4tos, getCouplesByGroup } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST( request: Request, context: any) {
  const { params } = context;

  const couples = await getCouplesBy4tos(params.params[0], params.params[1]);

  return NextResponse.json({
    couples
  })
}