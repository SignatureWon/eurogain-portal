<script>
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    Content,
  } from "carbon-components-svelte";
  import {
    Apps,
    Building,
    ChartBar,
    Enterprise,
    Home,
    PhraseSentiment,
    ToolBox,
    UserMultiple,
  } from "carbon-icons-svelte";
  import { page } from "$app/stores";
  import Heading from "$lib/components/heading.svelte"

  export let data;

  let isSideNavOpen = false;

  $: path = $page.url.pathname.split('/')
</script>

<Header company="Eurogain" platformName="Portal" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen} rail>
  <SideNavItems>
    <SideNavLink
      icon={Home}
      text="Home"
      href="/admin"
      class="mb-2"
      isSelected={path[2] === undefined}
    />
    <SideNavLink
      icon={Enterprise}
      text="Franchisees"
      href="/admin/franchisee"
      class="mb-2"
      isSelected={path[2] === "franchisee"}
    />
    <SideNavLink
      icon={ToolBox}
      text="Businesses"
      href="/admin/business"
      class="mb-2"
      isSelected={path[2] === "business"}
    />
    <SideNavLink
      icon={UserMultiple}
      text="Users"
      href="/admin/user"
      class="mb-2"
      isSelected={path[2] === "user"}
    />
    <SideNavLink
      icon={Apps}
      text="Apps"
      href="/admin/apps"
      class="mb-2"
      isSelected={path[2] === "apps"}
    />
    <SideNavLink
      icon={PhraseSentiment}
      text="Support"
      href="/admin/support"
      class="mb-2"
      isSelected={path[2] === "support"}
    />
    <SideNavLink
      icon={ChartBar}
      text="Reports"
      href="/admin/reports"
      class="mb-2"
      isSelected={path[2] === "reports"}
    />
  </SideNavItems>
</SideNav>

<Content class="bg-gray-200 min-h-screen p-5 md:p-10">
  <Heading path={path} slug={data.slug} />
  <slot />
</Content>
