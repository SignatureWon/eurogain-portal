import { redirect } from '@sveltejs/kit';

const userRedirect = (rank) => {
	if (rank >= 1000) {
		throw redirect(303, "/admin");
	} else if (rank >= 100) {
		throw redirect(303, "/manage");
	} else {
		throw redirect(303, "/user");
	}
}

export const load = ({ locals }) => {
	const user = locals.db.authStore
	// user.clear()
	if (user.isValid) {
		userRedirect(user.model.profile.rank)
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const entries = Object.fromEntries([...formData]);

		const {user} = await locals.db.users.authViaEmail(entries.email, entries.password);
		userRedirect(user.profile.rank)
	}
};