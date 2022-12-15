<script>
  import Form from "$lib/components/form.svelte";
  import { Button } from "carbon-components-svelte";
  import { ArrowRight } from "carbon-icons-svelte";
  export let data;
</script>

<Form
  records={data.records}
  title="business"
  backlink="/admin/business"
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
        ],
      },
    ],
  }}
/>
{#if data.records.id !== ""}
  <div class="mt-5">
    <Button
      href={`/admin/business/${data.records.id}/service`}
      icon={ArrowRight}>Manage Services</Button
    >
  </div>
{/if}
