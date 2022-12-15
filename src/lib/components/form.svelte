<script>
  import {
    Button,
    FormGroup,
    InlineNotification,
    Modal,
    NumberInput,
    Select,
    SelectItem,
    TextInput,
  } from "carbon-components-svelte";
  import { ArrowRight, TrashCan } from "carbon-icons-svelte";
  import { goto } from "$app/navigation";
  import { applyAction, enhance } from "$app/forms";

  export let records = {};
  export let layout = [];
  export let title = "";
  export let backlink = "/admin";

  let action = records.id === "add" ? "add" : "edit";
  let modalDelete = false;
  let errorMessage = false;
</script>

{#if errorMessage}
  <InlineNotification
    lowContrast
    title="Error:"
    subtitle="Something went wrong. Please try again."
  />
{/if}

<form
  method="POST"
  action={`?/${action}`}
  use:enhance={({ form, data, action, cancel }) => {
    return async ({ result }) => {
      if (result.type === "redirect") {
        await applyAction(result);
      } else if (result.type === "error") {
        errorMessage = true;
      }
    };
  }}
>
  <div class="form">
    {#each layout.groups as group}
      <section>
        <aside>
          <h2>{group.name}</h2>
        </aside>
        <article>
          {#each group.fields as field}
            {#if field.type === "text"}
              <FormGroup>
                <TextInput
                  labelText={field.label}
                  name={field.key}
                  value={records[field.key]}
                />
              </FormGroup>
            {:else if field.type === "number"}
              <FormGroup>
                <NumberInput
                  label={field.label}
                  name={field.key}
                  value={records[field.key]}
                />
              </FormGroup>
            {:else if field.type === "select"}
              <FormGroup>
                <Select
                  labelText={field.label}
                  name={field.key}
                  selected={records[field.key]}
                  on:change={(e) => {
                    if (e.detail === "select") {
                      document
                        .getElementById(`${field.key}_options`)
                        .classList.remove("hidden");
                    } else {
                      document
                        .getElementById(`${field.key}_options`)
                        .classList.add("hidden");
                    }
                  }}
                >
                  {#each field.options as option}
                    <SelectItem value={option.value} text={option.label} />
                  {/each}
                </Select>
              </FormGroup>
            {:else if field.type === "options"}
              <FormGroup
                id={field.key}
                class={records[field.key.replace("_options", "")] === "select"
                  ? ""
                  : "hidden"}
              >
                <TextInput
                  labelText={field.label}
                  name={field.key}
                  value={records[field.key]}
                />
              </FormGroup>
            {:else if field.type === "hidden"}
              <input
                name={field.key}
                value={records[field.key]}
                type="hidden"
              />
            {/if}
          {/each}
        </article>
      </section>
    {/each}
    <footer>
      <div>
        {#if action === "edit"}
          <Button
            kind="danger-tertiary"
            icon={TrashCan}
            iconDescription="Delete"
            on:click={() => (modalDelete = true)}
          />
        {/if}
      </div>
      <div>
        <Button kind="ghost" href={backlink}>Cancel</Button>
        <Button
          type="submit"
          icon={ArrowRight}
          class="[&>svg]:hidden [&>svg]:md:block pl-3 pr-3 md:pr-10"
        >
          {action === "add" ? "Create" : "Update"}
        </Button>
      </div>
    </footer>
  </div>
</form>

<Modal
  danger
  modalHeading={`Delete ${title}`}
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
        id: records.id,
      }),
    });
    goto(backlink);
  }}
>
  Do you want to delete this {title}?
</Modal>
