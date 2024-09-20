<script>
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import {
		UserSolid
	} from 'flowbite-svelte-icons';
	$: activeUrl = $page.url.pathname;
</script>

<div class="flex flex-row">
	<div class="basis-1/4">
		<Sidebar {activeUrl}>
			<SidebarWrapper>
				<SidebarGroup>
					<SidebarItem label="Previsão AI" href="/ux/ai/previsao">
						<svelte:fragment slot="icon">
							<UserSolid
								class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
							/>
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</div>
	<div class="basis-3/4 p-4"><slot /></div>
</div>
