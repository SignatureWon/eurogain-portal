<script>
  import {
    Button,
    ButtonSet,
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
          <TextInput labelText="Company Name" name="name" value={data.name} />
        </FormGroup>
        <FormGroup>
          <TextInput
            labelText="Location"
            name="location"
            value={data.location}
          />
        </FormGroup>
        <FormGroup>
          <DatePicker datePickerType="single">
            <DatePickerInput
              labelText="Date Started"
              name="started"
              value={data.started}
            />
          </DatePicker>
        </FormGroup>
      </article>
    </section>
    <section>
      <aside>
        <h2>Contact Information</h2>
      </aside>
      <article>
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
          <TextInput
            labelText="City"
            name="city"
            value={data.city}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            labelText="Country"
            name="country"
            value={data.country}
            type="text"
          />
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
        <Button kind="ghost" href="/admin/franchisees">Cancel</Button>
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
    goto(`/admin/franchisees/`);
  }}
>
  Do you want to delete this franchisee?
</Modal>
