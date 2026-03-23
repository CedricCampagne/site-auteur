import { getAllChronicles } from "$lib/api/chronicles";
import type { Chronicle } from "$lib/types";

export const load = async({ fetch }): Promise<{chronicles:Chronicle[]}> => {
    const chronicles = await getAllChronicles(fetch);
    return { chronicles };
}