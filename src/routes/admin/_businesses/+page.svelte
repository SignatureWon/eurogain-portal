<script>
  import {
    Button,
    DataTable,
    Pagination,
    Search,
  } from "carbon-components-svelte";
  import { Add } from "carbon-icons-svelte";
  import { goto } from "$app/navigation";
  import dayjs from "dayjs";

  export let data;

  $: rows = data.items;
  $: perPage = data.perPage;
  $: page = data.page;
  $: totalItems = data.totalItems;
  $: sort = "-name";

  let keyword = "";
</script>

<h1 class="mb-5">Businesses</h1>
<div class="flex justify-between mb-5">
  <div class="max-w-xs">
    <Search
      size="sm"
      value={keyword}
      on:change={async (e) => {
        keyword = e.target.value;
        goto(`?filter=(name~"${keyword}")&sort=${sort}&page=${page}`, {
          replaceState: true,
        });
      }}
    />
  </div>
  <div>
    <Button
      size="small"
      icon={Add}
      iconDescription="Add new"
      href="/admin/businesses/add/"
    />
  </div>
</div>
<DataTable
  sortable
  headers={[
    { key: "name", value: "Name" },
    { key: "updated", value: "Updated", width: "120px" },
    { key: "created", value: "Created", width: "120px" },
  ]}
  {perPage}
  {page}
  {rows}
  on:click:header={(e) => {
    sort = `${e.detail.sortDirection === "ascending" ? "" : "-"}${
      e.detail.header.key
    }`;
    goto(`?filter=(name~"${keyword}")&sort=${sort}&page=${page}`, {
      replaceState: true,
    });
  }}
  on:click:row={(e) => {
    goto(`/admin/businesses/${e.detail.id}`);
  }}
  class="cursor-pointer"
>
  <svelte:fragment slot="cell" let:row let:cell>
    {#if cell.key === "created" || cell.key === "updated"}
      {dayjs(cell.value).format("DD MMM YYYY")}
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>
</DataTable>
<Pagination
  page={page}
  pageSize={perPage}
  totalItems={totalItems}
  pageSizeInputDisabled
  on:update={(e) => {
    page = e.detail.page
    goto(`?filter=(name~"${keyword}")&sort=${sort}&page=${page}`, {
      replaceState: true,
    });
  }}
/>
