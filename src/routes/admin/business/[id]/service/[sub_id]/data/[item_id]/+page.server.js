import { redirect } from "@sveltejs/kit";

export async function load({ locals, url, params }) {
  let records = {
    id: "add",
    name: "",
    type: "text",
    service: params.sub_id,
  };

  if (params.item_id !== "add") {
    records = await locals.db.records.getOne("data", params.item_id);
  }
  return {
    records: JSON.parse(JSON.stringify(records)),
    pathname: url.pathname,
    // backlink: `/admin/business/${params.id}/service/${params.sub_id}/data`
  };
}
export const actions = {
  add: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.create("data", entries);
    throw redirect(303, `/admin/business/${params.id}/service/${params.sub_id}/data`);
  },
  edit: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.update(
      "data",
      params.item_id,
      entries
    );
    throw redirect(303, `/admin/business/${params.id}/service/${params.sub_id}/data`);
  },
  delete: async ({ locals, request, params }) => {
    const data = await locals.db.records.delete("data", params.item_id);
    // throw redirect(303, `/admin/business/${params.id}/service/${params.sub_id}/data`);
  },
};
