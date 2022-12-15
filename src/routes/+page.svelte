<script>
  import {
    Button,
    InlineNotification,
    PasswordInput,
    TextInput,
  } from "carbon-components-svelte";
  import ArrowRight from "carbon-icons-svelte/lib/ArrowRight.svelte";

  let errorMessage = false;
</script>

<div class="flex h-screen items-center bg-white">
  <div class="p-4 flex-1">
    <div class="max-w-sm mx-auto">
      <div class="text-center">
        <img src="/eurogain.svg" alt="Eurogain" class="w-48 mx-auto" />
        <h1 class="font-bold text-2xl mt-4 mb-16">Welcome to Eurogain</h1>
      </div>
      {#if errorMessage}
        <InlineNotification
          lowContrast
          title="Error:"
          subtitle="Incorrect email or password."
        />
      {/if}
      <form
        method="POST"
        action="?/login"
      >
        <div class="mb-5">
          <TextInput
            name="email"
            labelText="Email address"
            placeholder="Your email address"
            size="xl"
          />
        </div>
        <div class="mb-5">
          <PasswordInput
            name="password"
            labelText="Password"
            placeholder="Your password"
            size="xl"
          />
        </div>
        <div>
          <Button icon={ArrowRight} type="submit">Login</Button>
        </div>
      </form>
    </div>
  </div>
  <div
    class="flex-1 bg-cover bg-center h-full"
    style="background-image: url('https://images.unsplash.com/photo-1621109246687-10ae613f2d8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80')"
  />
</div>
