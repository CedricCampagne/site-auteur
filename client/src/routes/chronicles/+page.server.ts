import { getAllChronicles } from "$lib/api/chronicles";
import type { Chronicle } from "$lib/types";

export async function load(): Promise<{chronicles:Chronicle[]}>{
    const chronicles = await getAllChronicles();
    return { chronicles };
}