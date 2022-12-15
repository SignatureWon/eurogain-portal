<script>
  import Form from "$lib/components/form.svelte";
  import { Button } from "carbon-components-svelte";
  import { ArrowRight } from "carbon-icons-svelte";
  export let data;
</script>

<Form
  records={data.records}
  title="business"
  backlink={`/admin/business/${data.records.business}/service`}
  layout={{
    groups: [
      {
        name: "General Information",
        fields: [
          {
            label: "Name",
            key: "name",
            type: "text",
          },
          {
            label: "Description",
            key: "description",
            type: "text",
          },
          {
            label: "Price",
            key: "price",
            type: "number",
          },
          {
            label: "Business",
            key: "business",
            type: "hidden",
          },
        ],
      },
    ],
  }}
/>
{#if data.records.id !== ""}
<div class="mt-5">
  <Button href={`/admin/business/${data.records.business}/service/${data.records.id}/data`} icon={ArrowRight}>Manage Data</Button>
</div>
{/if}
