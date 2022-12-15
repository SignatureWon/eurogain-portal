import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {
  const id = params.id;
  let data = {
    name: "",
  };

  if (id !== "add") {
    data = await locals.db.records.getOne("businesses", id);
  }
  return {...data};
}
export const actions = {
  add: async ({ locals, request }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.create("businesses", entries);
		throw redirect(303, `/admin/businesses`);
  },
  edit: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.update("businesses", params.id, entries);
		throw redirect(303, `/admin/businesses`);
  },
  delete: async ({ locals, request, params }) => {
    const data = await locals.db.records.delete("businesses", params.id);
		// throw redirect(303, `/admin/businesses/`);
  },
};
