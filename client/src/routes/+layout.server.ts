import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ( event: {locals: App.Locals} ) => {
    return {
        user: event.locals.user,
        token: event.locals.token
    }; // user et token seront accessibles côté front via $page.data.user
};