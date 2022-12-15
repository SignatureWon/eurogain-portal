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
  import { page } from "$app/stores";

  const params = $page.params;

  export let data;

  $: rows = data.items;
  $: perPage = data.perPage;
  $: currentPage = data.page;
  $: totalItems = data.totalItems;
  $: sort = "-name";

  let keyword = "";
</script>

<div class="flex justify-between mb-5">
  <div class="max-w-xs">
    <Search
      size="sm"
      value={keyword}
      on:change={async (e) => {
        keyword = e.target.value;
        goto(`?filter=(name~"${keyword}")&sort=${sort}&page=${currentPage}`, {
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
      href={`/admin/businesses/${params.id}/data/add/`}
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
  {currentPage}
  {rows}
  on:click:header={(e) => {
    sort = `${e.detail.sortDirection === "ascending" ? "" : "-"}${
      e.detail.header.key
    }`;
    goto(`?filter=(name~"${keyword}")&sort=${sort}&page=${currentPage}`, {
      replaceState: true,
    });
  }}
  on:click:row={(e) => {
    console.log(e);
    
    goto(`/admin/businesses/${params.id}/data/${e.detail.id}`);
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
  page={currentPage}
  pageSize={perPage}
  totalItems={totalItems}
  pageSizeInputDisabled
  on:update={(e) => {
    currentPage = e.detail.page
    goto(`?filter=(name~"${keyword}")&sort=${sort}&page=${currentPage}`, {
      replaceState: true,
    });
  }}
/>
