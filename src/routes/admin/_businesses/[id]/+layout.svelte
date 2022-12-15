<script>
  import { page } from "$app/stores";
  import { Link, Tab, Tabs } from "carbon-components-svelte";
  import { ArrowLeft } from "carbon-icons-svelte";
  import { goto } from "$app/navigation";

  const id = $page.params.id;
  const title = id === "add" ? "Add" : "Edit";
  let path = $page.url.pathname.split("/")[4] || "information";
  const selected = {
    information: 0,
    services: 1,
    data: 2,
    automation: 3,
  };
</script>

<Link href="/admin/businesses" class="!text-gray-600">Back to list</Link>
<h1 class="mb-5">{title} Business</h1>
<Tabs autoWidth selected={selected[path]} class="mb-5">
  <Tab
    label="Information"
    on:click={() => {
      goto(`/admin/businesses/${id}`);
    }}
  />
  <Tab
    label="Services"
    on:click={() => {
      goto(`/admin/businesses/${id}/services`);
    }}
  />
  <Tab
    label="Data"
    on:click={() => {
      goto(`/admin/businesses/${id}/data`);
    }}
  />
  <Tab
    label="Automation"
    on:click={() => {
      goto(`/admin/businesses/${id}/automation`);
    }}
  />
</Tabs>
<slot />
