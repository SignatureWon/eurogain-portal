import { redirect } from "@sveltejs/kit";

export async function load({ locals, url, params }) {
  let records = {
    id: "",
    name: "",
    description: "",
    price: 0,
    business: params.id,
  };

  if (params.sub_id !== "add") {
    records = await locals.db.records.getOne("service", params.sub_id);
  }
  return {
    records: JSON.parse(JSON.stringify(records)),
  };
}
export const actions = {
  add: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.create("service", entries);
    throw redirect(303, `/admin/business/${params.id}/service`);
  },
  edit: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.update(
      "service",
      params.sub_id,
      entries
    );
    throw redirect(303, `/admin/business/${params.id}/service`);
  },
  delete: async ({ locals, request, params }) => {
    const data = await locals.db.records.delete("service", params.sub_id);
    throw redirect(303, `/admin/business/${params.id}/service`);
  },
};
