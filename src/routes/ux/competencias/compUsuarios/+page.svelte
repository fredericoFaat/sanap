<script>
	// import { error } from '@sveltejs/kit';
	// import { onMount } from 'svelte';
	// import {
	// 	Spinner,
	// 	Dropdown,
	// 	DropdownItem,
	// 	DropdownMenu,
	// 	DropdownToggle,
	// 	Row,
	// 	Col,
	// 	Button,
	// 	Table
	// } from '@sveltestrap/sveltestrap';

	// import { Mindmap } from '$comps';

	// import json2md from 'json2md';

	// let usuariosSite;
	// let PLAusuario;
	// let compsPLA;
	// let PLAselecionado;
	// let compFWs;
	// let compFWSelecionado;
	// let compsByFW;
	// // HEByFW,
	// let compsByHE;

	// let HEByFW = [];

	// let showUsuariosSite = false;
	// let showPLAusuario = false;
	// let showCompsPLA = false;
	// let showCompFWs = false;
	// let showCompsByFW = false;
	// let usuarioSelecionado;
	// // let usuariosSelecionados = [];
	// let testeA = [];
	// let showMindmap = false;
	// let data = [
	// 	{ h1: 'shortname' },
	// 	{ h2: 'he[0]' },
	// 	{ h3: 'comp1' },
	// 	{ ul: ['d1', 'd2'] },
	// 	{ h3: 'comp2' },
	// 	{ ul: ['d3'] },
	// 	{ h2: 'HE2' },
	// 	{ h3: 'comp1' },
	// 	{ ul: ['d1', 'd2'] },
	// 	{ h3: 'comp3' },
	// 	{ ul: ['d3'] }
	// ];

	// $: data = data;
	// onMount(async () => {
	// 	const response1 = await fetch('/api/moodle/getUsers');
	// 	const responseJSON1 = await response1.json();
	// 	if (responseJSON1.error) {
	// 		throw error(responseJSON1.error.status, responseJSON1.error.message);
	// 	}
	// 	usuariosSite = responseJSON1.users;
	// 	showUsuariosSite = true;

	// 	const response2 = await fetch('/api/moodle/getCompFWs');
	// 	const responseJSON2 = await response2.json();
	// 	if (responseJSON2.error) {
	// 		throw error(responseJSON2.error.status, responseJSON2.error.message);
	// 	}
	// 	$compFWs = responseJSON2;
	// 	showCompFWs = true;
	// });

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
	// 	showPLAusuario = true;
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
	// 	console.log(responseJSON);
	// 	compsPLA = responseJSON;
	// 	showCompsPLA = true;
	// 	return responseJSON;
	// };

	// const informacoesUsuario = async (user) => {
	// 	PLAusuario = await getPLAusuario(user);

		// showCH = false;
		// show2 = true;
		// $usuarios = responseJSON;
		// especialidadeSelecionada = esp;
		// usuariosSelecionados = [];
		// for (let i = 0; i < $usuarios.length; i++) {
		// 	let result1 = $usuarios[i].customfields.filter((e) => e.shortname == 'especialidade');
		// 	if (result1.length > 0) {
		// 		if (result1[0].value == especialidadeSelecionada) {
		// 			usuariosSelecionados = [...usuariosSelecionados, $usuarios[i]];
		// 		}
		// 	}
		// }
		// show2 = false;
		// showCH = true;
	// };
	// const getCompsByFWid = async (FWSelecionado) => {
	// 	testeA = FWSelecionado;
	// 	showCompsByFW = false;
	// 	compFWSelecionado = FWSelecionado;
	// 	const response = await fetch('/api/moodle/getCompsByFWid', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(FWSelecionado)
	// 	});
	// 	const responseJSON = await response.json();
	// 	if (responseJSON.error) {
	// 		throw error(responseJSON.error.status, responseJSON.error.message);
	// 	}
	// 	compsByFW = responseJSON;
	// 	HEByFW = await getHEByFW(responseJSON);

		// const uniqueComps = [];
		// const visitedComps = new Set();
		// for (let i = 0; i < responseJSON.length; ++i) {
		// 	if (responseJSON[i].path != '/0/') {
		// 		if (!visitedComps.has(responseJSON[i].shortname)) {
		// 			uniqueComps.push(responseJSON[i]);
		// 			visitedComps.add(responseJSON[i].shortname);
		// 		}
		// 	}
		// }
		// $compsByFW = uniqueComps;

		// const uniqueHEs = [];
		// const visitedHEs = new Set();
		// for (let i = 0; i < responseJSON.length; ++i) {
		// 	if (responseJSON[i].path == '/0/') {
		// 		if (!visitedHEs.has(responseJSON[i].shortname)) {
		// 			uniqueHEs.push(responseJSON[i]);
		// 			visitedHEs.add(responseJSON[i].shortname);
		// 		}
		// 	}
		// }
		// $HEByFW = uniqueHEs;
		// showCompsByFW = true;
		// return responseJSON;
	// };

	// let he = [];
	// const getHEByFW = async (item) => {
	// 	const uniqueHEs = [];
	// 	const visitedHEs = new Set();
	// 	for (let i = 0; i < item.length; ++i) {
	// 		if (item[i].path == '/0/') {
	// 			if (!visitedHEs.has(item[i].shortname)) {
	// 				uniqueHEs.push(item[i]);
	// 				visitedHEs.add(item[i].shortname);
	// 			}
	// 		}
	// 	}

	// 	return uniqueHEs;
	// };
	// let testeData;

	// let aa;

	// const getCompsByHE = async (HESelecionado) => {
	// 	const uniqueComps = [];
	// 	const visitedComps = new Set();
	// 	for (let i = 0; i < compsByFW.length; ++i) {
	// 		if (compsByFW[i].parentid == HESelecionado.id) {
	// 			if (!visitedComps.has(compsByFW[i].shortname)) {
	// 				uniqueComps.push(compsByFW[i]);
	// 				visitedComps.add(compsByFW[i].shortname);
	// 			}
	// 		}
	// 	}
	// 	compsByHE = uniqueComps;
	// 	return uniqueComps;
	// };

	// const teste = async () => {
	// 	let arr = [];
	// 	arr.push({ h1: compFWSelecionado.shortname });
	// 	for (let i = 0; i < HEByFW.length; ++i) {
	// 		arr = [...arr, { h2: HEByFW[i].shortname }];
	// 		compsByHE = await getCompsByHE(HEByFW[i]);
	// 		for (let x = 0; x < compsByHE.length; ++x) {
	// 			arr = [...arr, { h3: compsByHE[x].shortname }];
	// 		}
	// 	}
	// 	console.log(arr);

	// 	showCompsByFW = true;
	// 	showMindmap = true;
	// 	testeData = json2md(arr);
	// };

	// let maxWidthFromYAML = 500;
	// let style = '';
	// let title = 'Mindmap';
	// let colorFreezeLevel = 0;
	// let initialExpandLevel = -1;
</script>

<!-- <div class="container mx-auto">
	<div class="flex flex-col">
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

		{#if showCompFWs}
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>FRAMEWORK</th>
					</tr>
				</thead>
				<tbody>
					{#each compFWs as item}
						<tr on:click={() => getCompsByFWid(item)}>
							<td>{item.id}</td>
							<td>{item.shortname}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}

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
						<tr on:click={() => getCompsByPLAid(item)}>
							<td>{item.id}</td>
							<td>{item.name}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		{/if}

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
		{/if} -->

		<!-- {#if showCompsByFW}
	<h5>HIPÓTESE DE EMPREGO</h5>
	<Table hover>
		<thead>
			<tr>
				<th>ID</th>
				<th>Nome</th>
			</tr>
		</thead>
		<tbody>
			{#each HEByFW as item}
				<tr on:click={() => getCompsByHE(item)}>
					<td>{item.id}</td>
					<td>{item.shortname}</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{/if} -->
		<!-- 
<h5>COMPETÊNCIAS</h5>
<Table hover>
	<thead>
		<tr>
			<th>ID</th>
			<th>Nome</th>
		</tr>
	</thead>
	<tbody>
		{#each compsByHE as item}
			<tr>
				<td>{item.id}</td>
				<td>{item.shortname}</td>
			</tr>
		{/each}
	</tbody>
</Table> -->

		<!-- <Button
			size="sm"
			color="primary"
			on:click={() => {
				teste();
			}}>MindMap</Button
		>
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
</div> -->
