import { redirect } from "@sveltejs/kit";

export async function load({ locals, url, params }) {
  const id = params.id;
  let records = {
    id: "",
    name: "",
  };

  if (id !== "add") {
    records = await locals.db.records.getOne("business", id);
  }
  return {
    records: JSON.parse(JSON.stringify(records)),
  };
}
export const actions = {
  add: async ({ locals, request }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.create("business", entries);
    throw redirect(303, `/admin/business`);
  },
  edit: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.update(
      "business",
      params.id,
      entries
    );
    throw redirect(303, `/admin/business`);
  },
  delete: async ({ locals, request, params }) => {
    const data = await locals.db.records.delete("business", params.id);
    // throw redirect(303, `/admin/business/`);
  },
};
