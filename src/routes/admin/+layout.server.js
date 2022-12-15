export async function load({ locals, url }) {
    const path = url.pathname.split("/")
    let slug = []

    for (let index = 1; index < path.length; index++) {
        if (index === 4 || index === 6) {
            const rec = await locals.db.records.getOne(path[index-2], path[index-1]);
            slug.push(rec.name)
        } else {
            slug.push(undefined)
        }
    }
    return {slug: slug};
}