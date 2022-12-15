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

<Link href="/admin/franchisees"><ArrowLeft /> Back to list</Link>
<h1 class="mb-5">{title} Franchisee</h1>
<form method="POST" action={data.name === "" ? "?/add" : "?/edit"}>
  <section class="md:flex bg-white p-5 mb-0.5">
    <div class="md:w-1/3">
      <h2 class="text-xl">General Information</h2>
    </div>
    <div class="flex-1 py-5">
      <FormGroup>
        <TextInput labelText="Company Name" name="name" value={data.name} />
      </FormGroup>
      <FormGroup>
        <TextInput labelText="Location" name="location" value={data.location} />
      </FormGroup>
      <FormGroup>
        <DatePicker datePickerType="single" on:change>
          <DatePickerInput
            labelText="Date Started"
            name="started"
            value={data.started}
          />
        </DatePicker>
      </FormGroup>
    </div>
  </section>
  <section class="md:flex bg-white p-5 mb-0.5">
    <div class="md:w-1/3">
      <h2 class="text-xl">Contact Information</h2>
    </div>
    <div class="flex-1 py-5">
      <FormGroup>
        <TextInput
          labelText="Email"
          name="email"
          value={data.email}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <TextInput
          labelText="Phone"
          name="phone"
          value={data.phone}
          type="phone"
        />
      </FormGroup>
      <FormGroup>
        <TextInput
          labelText="Website"
          name="website"
          value={data.website}
          type="url"
        />
      </FormGroup>
      <FormGroup>
        <TextInput
          labelText="Address"
          name="address1"
          value={data.address1}
          class="mb-5"
          type="text"
        />
        <TextInput name="address2" value={data.address2} type="text" />
      </FormGroup>
      <FormGroup>
        <TextInput
          labelText="Postcode"
          name="postcode"
          value={data.postcode}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <TextInput labelText="City" name="city" value={data.city} type="text" />
      </FormGroup>
      <FormGroup>
        <TextInput
          labelText="Country"
          name="country"
          value={data.country}
          type="text"
        />
      </FormGroup>
    </div>
  </section>
  <section class="bg-white p-5 flex">
    <div>
      <Button type="submit" icon={ArrowRight}
        >{data.name === "" ? "Create" : "Update"}</Button
      >
    </div>
    <div class="flex-1">
      <Button kind="ghost" href="/admin/franchisees">Cancel</Button>
    </div>
    {#if data.name !== ""}
      <div>
        <Button
          kind="danger"
          on:click={() => (modalDelete = true)}
          icon={TrashCan}
          iconDescription="Delete"
        />
      </div>
    {/if}
  </section>
</form>

<Modal
  danger
  modalHeading="Delete franchisee"
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
    goto(`/admin/franchisees/`) 
  }}
>
  Do you want to delete this franchisee?
</Modal>
