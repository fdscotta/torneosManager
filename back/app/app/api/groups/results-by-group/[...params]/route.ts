import { getLostByCouple, getResultsByGroups } from "@/app/lib/apiFunctions";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
  const { params } = context;

  const groupsResults = await getResultsByGroups(
    params.params[0],
    params.params[1]
  );

  const updatedGroupsResults = await Promise.all(
    groupsResults.map(async (x) => {
      const lost = await getLostByCouple(x.tournament_id, x.couple_id);
      return { ...x, lost };
    })
  );

  return NextResponse.json({
    updatedGroupsResults,
  });
}
