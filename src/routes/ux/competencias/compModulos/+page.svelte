<script>
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

	import { getCompsByCourseModuleid } from '$utils/functionsComp.js';
	import { getContentsByCourseid } from '$utils/functionsCourse.js';
	getCompsByCourseModuleid;
	import { Categoria } from '$comps';

	let categoriaCursos = $state([]);
	let CNs = $state([]);
	let CNComps = $state([]);
	let showCursos = $state(false);
	let showSpinner1 = $state(true);
	let showConteudos = $state(false);
	let showSpinner2 = $state(true);

	let showCompetencias = $state(false);
	let showSpinner3 = $state(true);

	let bindGroupCN = $state([]);
	let bindGroupCursos = $state([]);
</script>

<div class="flex flex-row space-x-4 items-center">
	<Categoria bind:selecaoCategoriaCursos={categoriaCursos} />
	<Button
		color="primary"
		on:click={async () => {
			showCursos = true;
			showSpinner1 = false;
		}}><SearchOutline size="sm" /></Button
	>
</div>

{#if showCursos}
	{#if showSpinner1}
		<Spinner color="yellow" size={4} />
	{:else}
		ESPECIALIDADES
		<br />
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>NOME</TableHeadCell>
				<TableHeadCell>CODIGO</TableHeadCell>
				<TableHeadCell>X</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each categoriaCursos as resultado}
					<TableBodyRow>
						<TableBodyCell>{resultado.fullname}</TableBodyCell>
						<TableBodyCell>{resultado.shortname}</TableBodyCell>
						<TableBodyCell>
							<input type="checkbox" bind:group={bindGroupCursos} value={resultado} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<Button
			color="primary"
			on:click={async () => {
				CNs = await getContentsByCourseid(bindGroupCursos);
				showConteudos = true;
				showSpinner2 = false;
			}}>Pesquisar</Button
		>
	{/if}
{/if}
<br />
<br />
{#if showConteudos}
	{#if showSpinner2}
		<Spinner color="yellow" size={4} />
	{:else}
		CONTEÚDOS
		<br />
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>NOME</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each CNs as conteudo}
					{#each conteudo.contents as resultado}
						<TableBodyRow>
							<TableBodyCell
								>{resultado.name}
								<TableHeadCell>MÓDULO</TableHeadCell>
								<TableHeadCell>X</TableHeadCell>
								{#each resultado.modules as modulo}
									<TableBodyRow>
										<TableBodyCell>{modulo.name}</TableBodyCell>
										<TableBodyCell>
											<input type="checkbox" bind:group={bindGroupCN} value={modulo} />
										</TableBodyCell>
									</TableBodyRow>
								{/each}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/each}
			</TableBody>
		</Table>
		<Button
			color="primary"
			on:click={async () => {
				CNComps = await getCompsByCourseModuleid(bindGroupCN);
				console.log(CNComps[0].comps);
				showCompetencias = true;
				showSpinner3 = false;
			}}>Pesquisar</Button
		>
	{/if}
{/if}
<br />
<br />

{#if showCompetencias}
	{#if showSpinner3}
		<Spinner color="yellow" size={4} />
	{:else}
		COMPETÊNCIAS
		<br />
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>IDNUMBER</TableHeadCell>
				<TableHeadCell>NOME</TableHeadCell>
				<TableHeadCell>X</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each CNComps as comp}
					{#each comp.comps as resultado}
						<TableBodyRow>
							<TableBodyCell>{resultado.competency.idnumber}</TableBodyCell>
							<TableBodyCell>{resultado.competency.shortname}</TableBodyCell>
							<TableBodyCell>
								<input type="checkbox" bind:group={bindGroupCursos} value={resultado} />
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/each}
			</TableBody>
		</Table>
		<Button
			color="primary"
			on:click={async () => {
				// CNs = await getContentsByCourseid(bindGroupCursos);
				// showConteudos = true;
				// showSpinner2 = false;
			}}>Pesquisar</Button
		>
	{/if}
{/if}
<br />
<br />
