import PocketBase from "pocketbase";
import { PUBLIC_DB_HOST, PUBLIC_SECURE } from "$env/static/public";

export const handle = async ({ event, resolve }) => {
	event.locals.db = new PocketBase(PUBLIC_DB_HOST);
	event.locals.db.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.db.authStore.isValid) {
		event.locals.user = event.locals.db.authStore.model;
	}

	const response = await resolve(event);

	// TODO: secure before deployment
	response.headers.set('set-cookie', event.locals.db.authStore.exportToCookie({ secure: PUBLIC_SECURE }));

	return response;
};