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
    // services: 1,
    // automation: 2,
  };
</script>

<Link href="/admin/franchisees" class="!text-gray-600">Back to list</Link>
<h1 class="mb-5">{title} Franchisee</h1>
<Tabs autoWidth selected={selected[path]} class="mb-5">
  <Tab
    label="Information"
    on:click={() => {
      goto(`/admin/franchisees/${id}`);
    }}
  />
  <!-- <Tab
    label="Services"
    on:click={() => {
      goto(`/admin/franchisees/${id}/services`);
    }}
  />
  <Tab
    label="Automation"
    on:click={() => {
      goto(`/admin/franchisees/${id}/automation`);
    }}
  /> -->
</Tabs>
<slot />
