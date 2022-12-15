<script>
  import {
    Button,
    DatePicker,
    DatePickerInput,
    FormGroup,
    Link,
    Modal,
    TextInput,
  } from "carbon-components-svelte";
  import { ArrowLeft, ArrowRight, TrashCan } from "carbon-icons-svelte";

  export let data;

  const title = data.name === "" ? "Add" : "Edit";

  let modalDelete = false;
  import { goto } from '$app/navigation';
</script>

<Link href="/admin/businesses"><ArrowLeft /> Back to list</Link>
<h1 class="mb-5">{title} Business</h1>
<form method="POST" action={data.name === "" ? "?/add" : "?/edit"}>
  <section class="md:flex bg-white p-5 mb-0.5">
    <div class="md:w-1/3">
      <h2 class="text-xl">General Information</h2>
    </div>
    <div class="flex-1 py-5">
      <FormGroup>
        <TextInput labelText="Company Name" name="name" value={data.name} />
      </FormGroup>
    </div>
  </section>
</form>

<Modal
  danger
  modalHeading="Delete businesse"
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
    goto(`/admin/businesses/`) 
  }}
>
  Do you want to delete this business?
</Modal>
