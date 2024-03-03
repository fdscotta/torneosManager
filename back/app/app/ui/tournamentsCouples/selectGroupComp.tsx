import { getTournamentGroupsCouples } from "@/app/lib/data";
import {Select, SelectItem} from "@nextui-org/react";

export async function SelectGroupComp({
    couples,
    selectName,
}: {
    couples: [],
    selectName: string
}) {
    return (
        <>
{/*             <Select
                label="Select an animal"
                className="max-w-xs"
            >
                {couples.map((couple) => (
                <SelectItem key={couple.id} value={couple.id}>
                    {couple.couple} - {couple.group_id}
                </SelectItem>
                ))}
            </Select> */}
        </>
    );
}