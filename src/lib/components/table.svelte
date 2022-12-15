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

  export let records = {
    page: 1,
    perPage: 20,
    totalItems: 2,
    totalPages: 1,
    items: [],
  };

  export let search = "";
  export let sort = "";
  export let link = "";
</script>

{#if records.items.length === 0}
  <div class="bg-white py-20 px-5 text-center">
    <div class="mb-5">No record yet</div>
    <div>
      <Button icon={Add} href={`${link}add`}>Add new</Button>
    </div>
  </div>
{:else}
  <div class="flex justify-between mb-5">
    <div class="max-w-xs">
      <Search
        size="sm"
        value={search}
        on:change={async (e) => {
          goto(`?search=${e.target.value}&sort=${sort}&page=${records.page}`, {
            replaceState: true,
          });
        }}
        on:clear={async (e) => {
          goto(`?search=&sort=${sort}&page=${records.page}`, {
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
        href={`${link}add`}
      />
    </div>
  </div>
  <DataTable
    sortable
    headers={[
      { key: "name", value: "Name" },
      { key: "updated", value: "Updated", width: "120px" },
      //   { key: "created", value: "Created", width: "120px" },
    ]}
    page={records.page}
    pageSize={records.perPage}
    rows={records.items}
    on:click:header={(e) => {
      sort = `${e.detail.sortDirection === "ascending" ? "" : "-"}${
        e.detail.header.key
      }`;
      goto(`?search=${search}&sort=${sort}&page=${records.page}`, {
        replaceState: true,
      });
    }}
    on:click:row={(e) => {
      goto(`${link}${e.detail.id}`);
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
    page={records.page}
    pageSize={records.perPage}
    totalItems={records.totalItems}
    pageSizeInputDisabled
    on:update={(e) => {
      // page = e.detail.page;
      goto(`?search=${search}&sort=${sort}&page=${e.detail.page}`, {
        replaceState: true,
      });
    }}
  />
{/if}
