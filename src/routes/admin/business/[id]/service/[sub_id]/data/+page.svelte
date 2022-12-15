<script>
    import Table from "$lib/components/table.svelte";
    export let data;
  </script>
  
  <Table records={data.records} sort={data.sort} search={data.search} link={data.link} />