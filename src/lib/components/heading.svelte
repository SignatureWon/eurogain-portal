<script>
  import { Breadcrumb, BreadcrumbItem } from "carbon-components-svelte";

  export let path = [];
  export let slug = []

  let breadcrumbs, link, title;

  $: {
    breadcrumbs = [];
    link = "";
    title = "Home";

    for (let index = 1; index < path.length - 1; index++) {
      link += `/${path[index]}`;
      breadcrumbs.push({
        name: slug[index] ? slug[index] : path[index],
        link: link,
      });
    }
    if (path.length % 2 === 0) {
      title =
        path[path.length - 1] === "add"
          ? `Add ${path[path.length - 2]}`
          : `Edit ${path[path.length - 2]}`;
    } else {
      title = `${path[path.length - 1]} List`;
    }
  }
</script>

<svelte:head>
  <title>{title[0].toUpperCase() + title.substring(1)}</title>
</svelte:head>

<Breadcrumb>
  {#each breadcrumbs as breadcrumb}
    <BreadcrumbItem href={breadcrumb.link} class="capitalize">
      {breadcrumb.name}
    </BreadcrumbItem>
  {/each}
</Breadcrumb>
<h1>
  {title}
</h1>
