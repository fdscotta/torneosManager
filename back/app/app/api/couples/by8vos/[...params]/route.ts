import { getCouplesBy8vos } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST( request: Request, context: any) {
  const { params } = context;

  const couples = await getCouplesBy8vos(params.params[0]);

  return NextResponse.json({
    couples
  })
}