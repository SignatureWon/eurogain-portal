export async function load({ locals, url, params }) {
    const page = url.searchParams.get("page") || 1;
    const search = url.searchParams.get("search") || "";
    const sort = url.searchParams.get("sort") || "-name";
  
    const records = await locals.db.records.getList("data", page, 20, {
      filter: `(name~"${search}"&&service="${params.sub_id}")`,
      sort: sort,
    });
  
    return {
      params: params,
      search: search,
      sort: sort,
      link: `/admin/business/${params.id}/service/${params.sub_id}/data/`,
      records: JSON.parse(JSON.stringify(records)),
    };
  }
  