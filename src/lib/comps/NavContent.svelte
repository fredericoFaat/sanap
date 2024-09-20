<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;
</script>

<Navbar>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SICPED</span>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi class="cursor-pointer">
			CONTEXTO<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		</NavLi>
		<Dropdown class="w-44 z-20">
			<DropdownItem href="/ux/contexto/buscarContexto">Pesquisar contextos</DropdownItem>
		</Dropdown>
		<NavLi class="cursor-pointer">
			AVAINST<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		</NavLi>
		<Dropdown class="w-44 z-20">
			<DropdownItem href="/ux/avainst/detalhamento">Detalhamento</DropdownItem>
		</Dropdown>
		<NavLi class="cursor-pointer">
			AVALIAÇÕES<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		</NavLi>
		<Dropdown class="w-44 z-20">
			<DropdownItem href="/ux/avaliacoes/detalhamento">Pesquisar avaliações</DropdownItem>
		</Dropdown>
		<NavLi class="cursor-pointer">
			MOODLE<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		</NavLi>
		<Dropdown class="w-44 z-20">
			<DropdownItem href="/ux/moodle/detalhesUsuarios">Detalhes dos Usuarios</DropdownItem>	
			<DropdownItem href="/ux/moodle/planosAprendizagem">Planos de Aprendizagem</DropdownItem>
		</Dropdown>
		<NavLi class="cursor-pointer">
			COMPETÊNCIAS<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		</NavLi>
		<Dropdown class="w-44 z-20">
			<DropdownItem href="/ux/competencias/compModulos">MÓDULOS</DropdownItem>
			<DropdownItem href="/ux/competencias/mindMap">MINDMAP</DropdownItem>
			<DropdownItem href="/ux/competencias/compUsuarios">Teste</DropdownItem>
		</Dropdown>
		<NavLi class="cursor-pointer">
			AI<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		</NavLi>
		<Dropdown class="w-44 z-20">
			<DropdownItem href="/ux/avaliacoes">Pesquisar avaliações</DropdownItem>
		</Dropdown>
		<NavLi class="cursor-pointer">
			TAG<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
		</NavLi>
		<Dropdown class="w-44 z-20">
			<DropdownItem  href="/ux/marcacoes/buscarMarcacoes">Buscar marcações</DropdownItem>
		</Dropdown>
	</NavUl>
</Navbar>