import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {
  const id = params.id;
  let data = {
    name: "",
    location: "",
    started: "",
    website: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    postcode: "",
    city: "",
    state: "",
    country: "Malaysia",
  };

  if (id !== "add") {
    data = await locals.db.records.getOne("franchisees", id);
  }
  return {...data};
}
export const actions = {
  add: async ({ locals, request }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.create("franchisees", entries);
		throw redirect(303, `/admin/franchisees`);
  },
  edit: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.update("franchisees", params.id, entries);
		throw redirect(303, `/admin/franchisees`);
  },
  delete: async ({ locals, request, params }) => {
    const data = await locals.db.records.delete("franchisees", params.id);
		// throw redirect(303, `/admin/franchisees/`);
  },
};
