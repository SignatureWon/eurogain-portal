<script>
  import {
    Button,
    FormGroup,
    Modal,
    Select,
    SelectItem,
    TextInput,
  } from "carbon-components-svelte";
  import { ArrowRight, TrashCan } from "carbon-icons-svelte";

  export let data;

  let modalDelete = false;
  import { goto } from "$app/navigation";

  import { page } from '$app/stores';
  const params = $page.params

  const action = data.name === "" ? "add" : "edit"


</script>

<form method="POST" action={`?/${action}`}>
  <div class="form">
    <section>
      <aside>
        <h2>{action} Data</h2>
      </aside>
      <article>
        <FormGroup>
          <TextInput labelText="Name" name="name" value={data.name} />
        </FormGroup>
        <FormGroup>
          <Select labelText="Type" name="type" value={data.type}>
            <SelectItem value="text" text="Text" />
            <SelectItem value="date" text="Date" />
            <SelectItem value="number" text="Number" />
            <SelectItem value="bool" text="Yes/No" />
            <SelectItem value="file" text="File" />
          </Select>
        </FormGroup>
      </article>
    </section>
    <footer>
      <div>
        {#if data.name !== ""}
          <Button
            kind="danger-tertiary"
            icon={TrashCan}
            iconDescription="Delete"
            on:click={() => (modalDelete = true)}
          />
        {/if}
      </div>
      <div>
        <Button kind="ghost" href={`/admin/businesses/${params.id}/data`}>Cancel</Button>
        <Button
          type="submit"
          icon={ArrowRight}
          class="[&>svg]:hidden [&>svg]:md:block pl-3 pr-3 md:pr-10"
        >
          {data.name === "" ? "Create" : "Update"}
        </Button>
      </div>
    </footer>
  </div>
</form>

<Modal
  danger
  modalHeading="Delete business"
  primaryButtonText="Delete"
  secondaryButtonText="Cancel"
  bind:open={modalDelete}
  on:click:button--secondary={() => {
    modalDelete = false;
  }}
  on:submit={async () => {
    await fetch("?/delete", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });
    goto(`/admin/businesses/${params.id}/data`);
  }}
>
  Do you want to delete this business?
</Modal>
