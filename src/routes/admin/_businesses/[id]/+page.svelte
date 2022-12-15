<script>
  import {
    Button,
    FormGroup,
    Modal,
    TextInput,
  } from "carbon-components-svelte";
  import { ArrowRight, TrashCan } from "carbon-icons-svelte";

  export let data;

  let modalDelete = false;
  import { goto } from "$app/navigation";
</script>

<form method="POST" action={data.name === "" ? "?/add" : "?/edit"}>
  <div class="form">
    <section>
      <aside>
        <h2>General Information</h2>
      </aside>
      <article>
        <FormGroup>
          <TextInput labelText="Business Name" name="name" value={data.name} />
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
        <Button kind="ghost" href="/admin/businesses">Cancel</Button>
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
    goto(`/admin/businesses/`);
  }}
>
  Do you want to delete this business?
</Modal>
