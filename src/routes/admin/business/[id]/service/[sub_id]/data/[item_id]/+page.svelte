<script>
  import Form from "$lib/components/form.svelte";
  import { Button } from "carbon-components-svelte";
  import { ArrowRight } from "carbon-icons-svelte";
  export let data;
</script>

<Form
  records={data.records}
  title="data"
  backlink={`${data.pathname.replace(data.records.id, "")}`}
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
            label: "Type",
            key: "type",
            type: "select",
            options: [
              { label: "Text", value: "text" },
              { label: "Number", value: "number" },
              { label: "Date", value: "date" },
              { label: "File", value: "file" },
              { label: "Select", value: "select" },
            ],
          },
          {
            label: "Type Options",
            key: "type_options",
            type: "options",
          },
          {
            label: "Service",
            key: "service",
            type: "hidden",
          },
        ],
      },
    ],
  }}
/>
{#if data.records.id !== "add"}
  <div class="mt-5">
    <Button href={`${data.pathname}/automation`} icon={ArrowRight}
      >Manage Automation</Button
    >
  </div>
{/if}
