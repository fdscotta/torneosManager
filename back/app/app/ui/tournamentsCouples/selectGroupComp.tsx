import { getTournamentGroups } from "@/app/lib/data";

export async function SelectGroupComp({ tournamentID }: { tournamentID: string }) {
    const availablesGroups = await getTournamentGroups(tournamentID);
    return (
        <select
            id="group"
            name="group"
            placeholder={"Seleccione una Zona"}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        >
            <option key="0" value="" disabled>
                Seleccione una Zona
            </option>
            { availablesGroups.map(( group, index ) => (
                <option key={index} value={group.group_id}>{group.group_id}</option>
            ))}
        </select>
    );
}