import { writable } from "svelte/store";

export const flash = writable<string | null>(null);

export function setFlash(message: string){
    flash.set(message);
    setTimeout(()=> flash.set(null), 1500);
}

export function showFlash(message: string, duration = 2500) {
    flash.set(message);
    setTimeout(() => flash.set(null), duration);
}