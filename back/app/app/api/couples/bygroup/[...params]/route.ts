import { getCouplesByGroup } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function POST( request: Request, context: any) {
  const { params } = context;

  const couples = await getCouplesByGroup(params.params[0], params.params[1]);

  return NextResponse.json({
    couples
  })
}