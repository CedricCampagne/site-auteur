import type { Chronicle } from "$lib/types";
import { getByIdChronicle } from "$lib/api/chronicles.js";


export async function load({params}) : Promise<{ chronicle: Chronicle}> {
    const { id, slug } = params;
    const chronicle = await getByIdChronicle(Number(id), slug);
    console.log(chronicle);
    return { chronicle };
}