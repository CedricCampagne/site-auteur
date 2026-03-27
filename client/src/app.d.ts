// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { User } from '$lib/types';

declare global {
	namespace App {
		//Locals disponibles côté serveur (hooks, load, actions)
		interface Locals {
			//Prends tout ce qu’il y a dans User et ajoute un champ token facultatif
			user: (User & { token?: string }) | null;
		}

		//PageData disponible côté front (load retournant data)
		interface PageData {
			user: (User & { token?: string }) | null;
			flash?: string;
		}
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
