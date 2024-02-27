import { getTournamentGroupsCouples } from "@/app/lib/data";

export async function SelectGroupComp({
    tournamentID,
    selectName,
}: {
    tournamentID: string,
    selectName: string
}) {
    const availablesGroups = await getTournamentGroupsCouples(tournamentID);
    return (
        <></>
/*         <select
            id={selectName}
            name={selectName}
            value="default"
            defaultValue="default"
            placeholder={"Seleccione una Zona"}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        >
            <option key="0" value="default" disabled>
                Seleccione una Pareja
            </option>
            {Array.isArray(availablesGroups) &&
                availablesGroups.map(( couple, index ) => (
                    <option key={index} value={couple.id}>{couple.couple} - {couple.group_id}</option>
            ))}
        </select> */
    );
}