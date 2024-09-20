<script>
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { Button, Table } from 'flowbite-svelte';

	import { getUsers } from '$utils/functionsUser.js';
	import {
		getCompFWs,
		getPLAusuario,
		getCompsByPLAid,
		getCompsByFWid,
		getCompsByCE,
		getContsByComp,
		getCompsByField
	} from '$utils/functionsComp.js';

	import { Mindmap } from '$comps';

	import json2md from 'json2md';

	let usuariosSite = [];
	let PLAusuario = [];
	let compsPLA = [];
	let PLAselecionado = [];
	let compFWs = [];
	let compFWSelecionado = [];
	let compsByFW = [];
	let CEByFW = [];
	let compsByCE = [];
	let contsByFW = [];
	let showCH = false;
	let show2 = false;
	let esp = 'BET';
	let especialidadeSelecionada = [];
	let usuarios = [];
	let showUsuariosSite = false;
	let showPLAusuario = false;
	let showCompsPLA = false;
	let showCompFWs = false;
	let showCompsByFW = false;
	let showCompetencias = false;
	let showConteudos = false;
	let usuarioSelecionado = [];
	let usuariosSelecionados = [];
	let testeA = [];
	let showMindmap = false;
	let contsByComp;

	// $: data = data;
	onMount(async () => {
		// const response1 = await fetch('/api/moodle/getUsers');
		// const responseJSON1 = await response1.json();
		// if (responseJSON1.error) {
		// 	throw error(responseJSON1.error.status, responseJSON1.error.message);
		// }

		let teste = await getCompsByField('id','41')
		// usuariosSite = await getUsers("email","%%");
		showUsuariosSite = true;

		compFWs = await getCompFWs('user');
		showCompFWs = true;
	});

	// const getPLAusuario = async (user) => {
	// 	showPLAusuario = false;
	// 	const response = await fetch('/api/moodle/getPLAByUserid', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(user)
	// 	});
	// 	const responseJSON = await response.json();
	// 	if (responseJSON.error) {
	// 		throw error(responseJSON.error.status, responseJSON.error.message);
	// 	}
	// showPLAusuario = true;
	// 	return responseJSON;
	// };

	// const getCompsByPLAid = async (PLA) => {
	// 	showCompsPLA = false;
	// 	PLAselecionado = PLA;
	// 	const response = await fetch('/api/moodle/getCompsByPLAid', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(PLA)
	// 	});
	// 	const responseJSON = await response.json();
	// 	if (responseJSON.error) {
	// 		throw error(responseJSON.error.status, responseJSON.error.message);
	// 	}
	// 	compsPLA = responseJSON;
	// 	showCompsPLA = true;
	// 	return responseJSON;
	// };

	const informacoesUsuario = async (user) => {
		showPLAusuario = false;
		PLAusuario = await getPLAusuario(user);
		showPLAusuario = true;

		showCH = false;
		show2 = true;
		// usuarios;
		especialidadeSelecionada = esp;
		usuariosSelecionados = [];
		// for (let i = 0; i < usuarios.length; i++) {
		// 	let result1 = usuarios[i].customfields.filter((e) => e.shortname == 'especialidade');
		// 	if (result1.length > 0) {
		// 		if (result1[0].value == especialidadeSelecionada) {
		// 			usuariosSelecionados = [...usuariosSelecionados, usuarios[i]];
		// 		}
		// 	}
		// }
		show2 = false;
		showCH = true;
	};

	
	let testeData;

	const teste = async () => {
		let arr = [];
		arr.push({ h1: compFWSelecionado.shortname });
		for (let i = 0; i < CEByFW.length; ++i) {
			arr = [...arr, { h2: CEByFW[i].shortname }];
			compsByCE = await getCompsByCE(CEByFW[i], compsByFW);
			// console.log(compsByCE);

			for (let x = 0; x < compsByCE.length; ++x) {
				arr = [...arr, { h3: compsByCE[x].shortname }];
				contsByComp = await getContsByComp(compsByCE[x], contsByFW);
				for (let y = 0; y < contsByComp.length; ++y) {
					arr = [...arr, { h4: contsByComp[y].shortname }];
				}
			}
		}
		showMindmap = true;
		testeData = json2md(arr);
	};

	let maxWidthFromYAML = 50;
	let style = '';
	let title = 'Mindmap';
	let colorFreezeLevel = 0;
	let initialExpandLevel = -1;
</script>

<div class="grid grid-cols-3 gap-4">
	<!-- <div>
		<h5>USUÁRIOS</h5>
		{#if showUsuariosSite}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome completo</th>
					</tr>
				</thead>
				<tbody>
					{#each usuariosSite as item}
						<tr on:click={() => informacoesUsuario(item)}>
							<td>{item.id}</td>
							<td>{item.fullname}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}
	</div> -->
	<div>
		{#if showCompFWs}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>FRAMEWORK</th>
					</tr>
				</thead>
				<tbody>
					{#each compFWs as selecao}
						<tr
							on:click={async () => {
								showCompsByFW = false;
								let { CEByFWRes, compsByFWRes, contsByFWRes } = await getCompsByFWid(selecao);
								CEByFW = CEByFWRes;
								compsByFW = compsByFWRes;
								contsByFW = contsByFWRes;
								compFWSelecionado = selecao;
								showCompsByFW = true;
							}}
						>
							<td>{selecao.id}</td>
							<td>{selecao.shortname}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}
	</div>
	<div>
		<h5>PLA</h5>
		{#if showPLAusuario}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome completo</th>
					</tr>
				</thead>
				<tbody>
					{#each PLAusuario as item}
						<tr
							on:click={async () => {
								showCompsPLA = false;
								PLAselecionado = item;
								compsPLA = await getCompsByPLAid(item);
								showCompsPLA = true;
							}}
						>
							<td>{item.id}</td>
							<td>{item.name}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}
	</div>
	<div>
		<h5>PLA COMPS</h5>
		{#if showCompsPLA}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Grade</th>
					</tr>
				</thead>
				<tbody>
					{#each compsPLA as item}
						<tr>
							<td>{item.competency.shortname}</td>
							<td>{item.usercompetency.gradename}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}
	</div>
	<div>
		<h5>COMPETÊNCIAS</h5>
		{#if showCompsByFW}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
					</tr>
				</thead>
				<tbody>
					{#each CEByFW as item}
						<tr
							on:click={() => {
								compsByCE = getCompsByCE(item,compsByFW);
								showCompetencias = true;
							}}
						>
							<td>{item.id}</td>
							<td>{item.shortname}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}
	</div>
	<div>
		<h5>CONTEÚDOS</h5>
		{#if showCompetencias}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
					</tr>
				</thead>
				<tbody>
					{#each compsByCE as item}
						<tr
							on:click={() => {
								contsByComp = getContsByComp(item, contsByFW);
								showConteudos = true;
							}}
						>
							<td>{item.id}</td>
							<td>{item.shortname}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}

		<!-- <h5>CONTS</h5>
		{#if showConteudos}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
					</tr>
				</thead>
				<tbody>
					{#each contsByComp as item}
						<tr>
							<td>{item.id}</td>
							<td>{item.shortname}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if} -->

		<Button
			size="sm"
			color="primary"
			on:click={() => {
				teste();
			}}>MindMap</Button
		>
	</div>
	<div class="col-span-3">
		{#if showMindmap}
			<Mindmap
				source={testeData}
				maxWidth={maxWidthFromYAML}
				{style}
				{title}
				{colorFreezeLevel}
				{initialExpandLevel}
			/>
		{/if}
	</div>
</div>

<!-- <h5>COMPETÊNCIAS</h5>

<script>
	// import { onMount } from 'svelte';
    import { Mindmap } from '$comps';


	import json2md from 'json2md';

	let maxWidthFromYAML = 500;
	let style = '';
	let title = 'Mindmap';
	let colorFreezeLevel = 0;
	let initialExpandLevel = -1;


	let teste1 = json2md([
		{ h1: '3S BCT' },
		{ h2: 'HE1' },
		{ h3: 'comp1' },
		{ ul: ['d1', 'd2'] },
		{ h3: 'comp2' },
		{ ul: ['d3'] },
		{ h2: 'HE2' },
        { h3: 'comp1' },
        { ul: ['d1', 'd2'] },
		{ h3: 'comp3' },
        { ul: ['d3'] },
	]);
	
</script>
<h2>competencias</h2>
	<Mindmap
		source={teste1}
		maxWidth={maxWidthFromYAML}
		{style}
		{title}
		{colorFreezeLevel}
		{initialExpandLevel}
	/> -->
