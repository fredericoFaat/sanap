<script>
	import { onMount } from 'svelte';
	import { Label, Select } from 'flowbite-svelte';
	import { catSelecionada } from '$stores/state.svelte';
	import { getCategories, getCoursesByField } from '$utils/functionsCourse.js';

	let categorias = $state([]);
	let selecaoCategoria = $state([]);
	let { selecaoCategoriaCursos = $bindable() } = $props();


	onMount(async () => {
		categorias = await getCategories();
	});
</script>

<Label for="categorias">Selecione uma categoria</Label>
<Select
	id="categorias"
	class="mt-2"
	bind:value={selecaoCategoria}
	placeholder=""
	on:change={async () => {
		catSelecionada.valor = selecaoCategoria;
		selecaoCategoriaCursos = await getCoursesByField(selecaoCategoria, 'category');
	}}
>
	{#each categorias as value}
		<option {value}>{value.name}</option>
	{/each}
</Select>
