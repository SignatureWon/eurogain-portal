export async function load({ locals, url }) {
  const page = url.searchParams.get("page") || 1;
  const filter = url.searchParams.get("filter") || "";
  const sort = url.searchParams.get("sort") || "-name";

  const data = await locals.db.records.getList("data", page, 20, {
    filter: filter,
    sort: sort,
  });

  return JSON.parse(JSON.stringify(data))
}
