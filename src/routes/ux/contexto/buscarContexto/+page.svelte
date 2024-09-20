<script>
	import { onMount } from 'svelte';

	import {
		Spinner,
		Table,
		Modal,
		Button,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Label,
		Select,
		ButtonGroup
	} from 'flowbite-svelte';

	import { SearchOutline } from 'flowbite-svelte-icons';
	import { Categoria } from '$comps';

	import {
		getFRsByCourseid,
		getFRDsByFRid,
		getFRDPsByFRDid
	} from '$utils/functionsFR.js';

	import { catSelecionada } from '$stores/state.svelte';

	let categoriaCursos = $state();

	let categorias = $state([]);
	let selecaoCategoria = $state();
	let disciplinasFiltradaCategoriaSelecionada = $state();
	let showComponentes = $state(false);
	let showDiscussoes = $state(false);
	let showSpinner1 = $state(false);
	let showPosts = $state(false);
	let FRs = $state();
	let FRDs = $state();
	let FRDPs = $state();
	let bindGroupFR = $state();
	let bindGroupFRDs = $state();
	let inputValue1 = $state();
	let inputValue2 = $state();
	let inputValue3 = $state();
	let inputValue4 = $state();
	let openModal = $state(false);


	const filtrarCC = () => {
		return (FRs = FRs.filter((item) => item.cc.toLowerCase().match(inputValue1.toLowerCase())));
	};

	const filtrarDocente = () => {
		return (FRs = FRs.filter((item) =>
			item.docente.toLowerCase().match(inputValue2.toLowerCase())
		));
	};
	const filtrarSemestre = () => {
		return (FRs = FRs.filter((item) =>
			item.semestre.toLowerCase().match(inputValue3.toLowerCase())
		));
	};

	const filtrarAno = () => {
		return (FRs = FRs.filter((item) => item.ano.toLowerCase().match(inputValue4.toLowerCase())));
	};
</script>

	<div class="flex flex-row space-x-4 items-center">
		<Categoria bind:selecaoCategoriaCursos={categoriaCursos} />
<Button
	color="primary"
	on:click={async () => {
		showComponentes = true;
		showSpinner1 = true;
		FRs = await getFRsByCourseid(categoriaCursos, 'CONTEXTO');
		showSpinner1 = false;
	}}><SearchOutline size="sm" /></Button
>
	</div>

	<br />

	{#if showComponentes}
		{#if showSpinner1}
			<Spinner color="yellow" size={4} />
		{:else}
			ESPECIALIDADES
			<!-- <Input
			size="sm"
			type="text"
			bind:value={inputValue1}
			on:input={filtrarCC}
			placeholder="digite para filtrar"
		/>
		<br />
		Docente
		<Input
			size="sm"
			type="text"
			bind:value={inputValue2}
			on:input={filtrarDocente}
			placeholder="digite para filtrar"
		/>
		<br />
		Semestre
		<Input
			size="sm"
			type="text"
			bind:value={inputValue3}
			on:input={filtrarSemestre}
			placeholder="digite para filtrar"
		/>
		<br />
		Ano
		<Input
			size="sm"
			type="text"
			bind:value={inputValue4}
			on:input={filtrarAno}
			placeholder="digite para filtrar"
		/> -->
			<br />
			<Table hoverable={true}>
				<TableHead>
					<TableHeadCell>QUADRO</TableHeadCell>
					<TableHeadCell>ESPECIALIDADE</TableHeadCell>
					<TableHeadCell>SEMESTRE</TableHeadCell>
					<TableHeadCell>ANO</TableHeadCell>
					<TableHeadCell>X</TableHeadCell>
				</TableHead>
				<TableBody>
					{#each FRs as resultado}
						<TableBodyRow>
							<TableBodyCell>{resultado.cc}</TableBodyCell>
							<TableBodyCell>{resultado.docente}</TableBodyCell>
							<TableBodyCell>{resultado.semestre}</TableBodyCell>
							<TableBodyCell>{resultado.ano}</TableBodyCell>
							<TableBodyCell>
								<input type="checkbox" bind:group={bindGroupFR} value={resultado.FR} />
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
			<Button
				color="primary"
				on:click={async () => {
					showDiscussoes = false;
					FRDs = await getFRDsByFRid(bindGroupFR);
					showDiscussoes = true;
				}}>Pesquisar</Button
			>
		{/if}
	{/if}
	<br />
	<br />

	{#if showDiscussoes}
		<!-- {#if showSpinner2}
		<Spinner color="yellow" size={4} />
	{:else} -->
		CARGOS
		<!-- <Input
			size="sm"
			type="text"
			bind:value={inputValue1}
			on:input={filtrarCC}
			placeholder="digite para filtrar"
		/>
		<br />
		Docente
		<Input
			size="sm"
			type="text"
			bind:value={inputValue2}
			on:input={filtrarDocente}
			placeholder="digite para filtrar"
		/>
		<br />
		Semestre
		<Input
			size="sm"
			type="text"
			bind:value={inputValue3}
			on:input={filtrarSemestre}
			placeholder="digite para filtrar"
		/>
		<br />
		Ano
		<Input
			size="sm"
			type="text"
			bind:value={inputValue4}
			on:input={filtrarAno}
			placeholder="digite para filtrar"
		/> -->
		<br />
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Cargo</TableHeadCell>
				<TableHeadCell>X</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each FRDs as discussao}
					{#each discussao as resultado}
						<TableBodyRow>
							<TableBodyCell>{resultado.name}</TableBodyCell>
							<TableBodyCell>
								<input type="checkbox" bind:group={bindGroupFRDs} value={resultado} />
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/each}
			</TableBody>
		</Table>

		<Button
			color="primary"
			on:click={async () => {
				// showPosts = false;
				FRDPs = await getFRDPsByFRDid(bindGroupFRDs);
				console.log(FRDPs);
				// showPosts = true;
				openModal = true;
			}}>Pesquisar</Button
		>
		<!-- {/if} -->
	{/if}
	<br />
	<br />
	<Modal title="Contextos de Emprego" bind:open={openModal} size="xl" autoclose>
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>CARGO</TableHeadCell>
				<TableHeadCell>DESCRIÇÃO</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each FRDPs as post}
					{#each post as resultado, index}
						<TableBodyRow>
							{#if index + 2 < post.length}
								<TableBodyCell>{resultado.subject.replace('Re: ', '')}</TableBodyCell>
								<TableBodyCell>{@html resultado.message}</TableBodyCell>
							{/if}
						</TableBodyRow>
					{/each}
				{/each}
			</TableBody>
		</Table>
	</Modal>
	<!-- {#if showPosts} -->
	<!-- {#if showSpinner2}
		<Spinner color="yellow" size={4} />
	{:else} -->
	<!-- CONTEXTO DE EMPREGO -->
	<!-- <Input
			size="sm"
			type="text"
			bind:value={inputValue1}
			on:input={filtrarCC}
			placeholder="digite para filtrar"
		/>
		<br />
		Docente
		<Input
			size="sm"
			type="text"
			bind:value={inputValue2}
			on:input={filtrarDocente}
			placeholder="digite para filtrar"
		/>
		<br />
		Semestre
		<Input
			size="sm"
			type="text"
			bind:value={inputValue3}
			on:input={filtrarSemestre}
			placeholder="digite para filtrar"
		/>
		<br />
		Ano
		<Input
			size="sm"
			type="text"
			bind:value={inputValue4}
			on:input={filtrarAno}
			placeholder="digite para filtrar"
		/> -->
	<br />
	<!-- <Table hoverable={true}>
			<TableHead>
				<TableHeadCell>CARGO</TableHeadCell>
				<TableHeadCell>DESCRIÇÃO</TableHeadCell>

			</TableHead>
			<TableBody>
				{#each FRDPs as post}
					{#each post as resultado, index}
						<TableBodyRow>
							{#if  index + 1 < post.length}
							<TableBodyCell>{resultado.subject.replace("Re: ", "")}</TableBodyCell>
								<TableBodyCell>{@html resultado.message}</TableBodyCell>
							{/if}
						</TableBodyRow>
					{/each}
				{/each}
			</TableBody>
		</Table> -->

	<!-- {/if} -->
	<!-- {/if} -->