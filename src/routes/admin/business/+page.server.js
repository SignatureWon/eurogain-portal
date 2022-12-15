export async function load({ locals, url, params }) {
  const page = url.searchParams.get("page") || 1;
  const search = url.searchParams.get("search") || "";
  const sort = url.searchParams.get("sort") || "-name";

  const records = await locals.db.records.getList("business", page, 20, {
    filter: `(name~"${search}")`,
    sort: sort,
  });

  return {
    params: params,
    search: search,
    sort: sort,
    link: `/admin/business/`,
    records: JSON.parse(JSON.stringify(records)),
  };
}
