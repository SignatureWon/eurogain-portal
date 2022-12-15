import { redirect } from "@sveltejs/kit";

export async function load({ locals, url, params }) {
  let records = {
    id: "add",
    name: "",
    description: "",
    recurrence: false,
    type: "",
    value: 0,
    recipient: "",
    subject: "",
    content: "",
    date: "",
    data: params.item_id,
  };

  if (params.subitem_id !== "add") {
    records = await locals.db.records.getOne("automation", params.subitem_id);
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
    const data = await locals.db.records.create("automation", entries);
    throw redirect(303, `/admin/business/${params.id}/service/${params.sub_id}/data/${params.item_id}/automation`);
  },
  edit: async ({ locals, request, params }) => {
    const formData = await request.formData();
    const entries = Object.fromEntries(formData.entries());
    const data = await locals.db.records.update(
      "automation",
      params.item_id,
      entries
    );
    throw redirect(303, `/admin/business/${params.id}/service/${params.sub_id}/data/${params.item_id}/automation`);
  },
  delete: async ({ locals, request, params }) => {
    const data = await locals.db.records.delete("automation", params.item_id);
    // throw redirect(303, `/admin/business/${params.id}/service/${params.sub_id}/data/${params.item_id}/automation`);
  },
};
