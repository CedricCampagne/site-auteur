import { writable } from "svelte/store";

export const flash = writable<string | null>(null);

export function setFlash(message: string){
    flash.set(message);
    setTimeout(()=> flash.set(null), 2000);
}