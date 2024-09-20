
<script>
	import { Button } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { getTAGsByid } from '$utils/functionsTAG.js';

	import { Categoria } from '$comps';
	let categoriaCursos = $state();
	let TAGs = $state([]);
</script>

 

<div class="container mx-auto">
	<div class="flex flex-row space-x-4 items-center">
		
<Categoria bind:selecaoCategoriaCursos={categoriaCursos} />
<Button
	color="primary"
	on:click={async () => {
		TAGs = await getTAGsByid([0]);
        // console.log(TAGs)
	}}><SearchOutline size="sm" /></Button
>
	</div>
</div>
