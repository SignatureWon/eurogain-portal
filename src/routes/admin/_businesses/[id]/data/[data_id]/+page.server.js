import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {
  let data = {
    name: "",
    type: "",
  };

  if (params.data_id !== "add") {
    data = await locals.db.records.getOne("data", params.data_id);
  }
  return {...data};
}
export const actions = {
  add: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.create("data", entries);
		throw redirect(303, `/admin/businesses/${params.id}/data`);
  },
  edit: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.update("data", params.data_id, entries);
		throw redirect(303, `/admin/businesses/${params.id}/data`);
  },
  delete: async ({ locals, request, params }) => {
    const data = await locals.db.records.delete("data", params.data_id);
		// throw redirect(303, `/admin/businesses/${params.id}/data`);
  },
};
