<script>
	import { onMount } from 'svelte';
	import {
		Button,
		ButtonGroup,
		Select,
		Dropdown,
		DropdownItem,
		Label,
		Spinner,
		Table,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import { Chart } from 'svelte-echarts';
	import { init, use } from 'echarts/core';
	import { BarChart, LineChart } from 'echarts/charts';
	import {
		GridComponent,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		ToolboxComponent
	} from 'echarts/components';
	import { CanvasRenderer } from 'echarts/renderers';
	import { ChevronDownOutline, SearchOutline } from 'flowbite-svelte-icons';

	import { Categoria } from '$comps';

	import { getQZsByCourseid, getQZAttemptsByUserid, getQZAttemptData } from '$utils/functionsQZ.js';

	import { getCompsByField } from '$utils/functionsComp.js';

	import { getUsersByCourseid } from '$utils/functionsUser.js';

	use([
		BarChart,
		LineChart,
		GridComponent,
		CanvasRenderer,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		ToolboxComponent
	]);
	let options1 = $state({
		title: {
			text: 'Resultado AIE'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: []
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: '10',
			data: []
		},
		yAxis: {
			type: 'value'
		},
		series: []
		// series: [
		// 	{
		// 		name: '1º resultadosAIE',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: []
		// 	},
		// 	{
		// 		name: '2º resultadosAIE',
		// 		type: 'line',
		// 		stack: 'Total',
		// 		data: []
		// 	}
		// ]
	});

	let categorias = $state([]);
	let tentativas = $state([]);
	let questoes = $state([]);
	// let catSelecionada = $state('');
	let tentSelecionada = $state('');
	// let showCategoria = $state(true);
	let showProva = $state(false);
	let showTentativa = $state(false);
	let showSpinner1 = $state(false);
	let showSpinner2 = $state(false);
	let showSpinner3 = $state(false);
	let showQuestao = $state(false);
	let selecaoCategoria = $state([]);
	let selecaoProva = $state([]);
	let selecaoTentativa = $state([]);
	let selecaoQuestao = $state([]);
	let questoesTodas = $state([]);
	let questoesAnalises = $state([]);
	let questoesPorcentagem = $state([]);
	let questoesNumero = $state([]);
	let bindGroupFR = $state([]);
	let users = $state();
	let QZs = $state();
	let cat = $state([]);
	let disciplinasFiltradaCategoriaSelecionada = $state();
	let conteudos = $state([]);
	let usersID = $state([]);
	let questoesByUser = $state([]);
	let teste2 = $state([]);
	let questaoConteudos = [];

	let dadosGrafico =  $state({
		user: '',
		questao: '',
		grau: '',
		conteudos: []
	});

	onMount(async () => {
		// teste = document.createElement('rr');
	});

	$effect(async () => {
		showProva = true;
		showSpinner1 = true;
		QZs = await getQZsByCourseid(cat, 'PROVA');
		showSpinner1 = false;
	});

	// let notas = [];
	$effect(async () => {
		// {#each questoesByUser as resultados}
		// 						<TableBodyRow>
		// 							<TableBodyCell>{resultados.userID}</TableBodyCell>
		// 							{#each resultados.questoes as datas}
		// 								{#each datas as questao}
		// 									<TableBodyRow>
		// 										<TableBodyCell>{questao.status}</TableBodyCell>
		// 										<TableBodyCell>{questao.mark}</TableBodyCell>
		// 										<TableBodyCell>{questao.textoQuestao}</TableBodyCell>
		// 									</TableBodyRow>
		// 								{/each}
		// 							{/each}
		// console.log(teste2)
		// teste2.forEach((e) => {
		// 	console.log(e);
		// });

		options1.legend.data = usersID;
		options1.series = teste2;
		options1.xAxis.data = questoesNumero;
	});
</script>

<div class="flex flex-row space-x-4 items-center">
	<Categoria bind:selecaoCategoriaCursos={cat} />
	<!-- <Button
		color="primary"
		on:click={async () => {
			showProva = true;
			showSpinner1 = true;
			QZs = await getQZsByCourseid(cat, 'PROVA');
			showSpinner1 = false;
		}}><SearchOutline size="sm" /></Button
	> -->
</div>

<div class="flex flex-col">
	<div class="flex flex-row">
		<div class="basis-1/2">
			{#if showProva}
				{#if showSpinner1}
					<Spinner color="yellow" size={4} /> Carregando provas ...
				{:else}
					<br />
					<h6>PROVAS</h6>
					<Table hoverable={true}>
						<TableHead>
							<TableHeadCell>ESPECIALIDADE</TableHeadCell>
							<TableHeadCell>SEMESTRE</TableHeadCell>
							<TableHeadCell>ANO</TableHeadCell>
							<TableHeadCell>X</TableHeadCell>
						</TableHead>
						<TableBody>
							{#each QZs as resultado}
								<TableBodyRow>
									<TableBodyCell>{resultado.docente}</TableBodyCell>
									<TableBodyCell>{resultado.semestre}</TableBodyCell>
									<TableBodyCell>{resultado.ano}</TableBodyCell>
									<TableBodyCell>
										<input type="checkbox" bind:group={bindGroupFR} value={resultado} />
									</TableBodyCell>
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
					<Button
						color="primary"
						on:click={async () => {
							users = await getUsersByCourseid(bindGroupFR);
							tentativas = await getQZAttemptsByUserid(bindGroupFR, users);
							if (tentativas.length > 0) {
								let {
									QZADs,
									questoesTodasRes,
									questoesAnalisesRes,
									porcentagemRes,
									numeroQuestoesRes,
									usersIDRes
								} = await getQZAttemptData(tentativas);
								usersID = usersIDRes;
								questoesTodas = questoesTodasRes;
								questoesAnalises = questoesAnalisesRes;
								questoesPorcentagem = porcentagemRes;
								questoesNumero = numeroQuestoesRes;
								let arr1 = [];
								for (let i = 0; i < usersID.length; i++) {
									questaoConteudos = [];

									arr1 = [];
									questoesAnalises.forEach((e) => {
										arr1 = [
											...arr1,
											e.filter(function (el) {
												return el.userID == usersID[i];
											})
										];
									});
									let obj = {
										userID: usersID[i],
										questoes: arr1
									};
									questoesByUser = [...questoesByUser, obj];
								}
								questoesByUser[0].questoes.forEach((e) => {
									let obj = {
										slot: e[0].slot,
										conteudos: e[0].conteudos
									};

									questaoConteudos = [...questaoConteudos, obj];
								});

								let questoes = [];
								let graus = [];
								let questoesInfo = [];
								let conteudos = [];
								let conteudosInfo = [];
								for (let i = 0; i < questoesByUser.length; i++) {
									questoes = [];
									graus = [];
									questoesInfo = [];
									conteudos = [];
									conteudosInfo = [];
									questoesByUser[i].questoes.forEach((e) => {
										questoes = [...questoes, e];
									});
									questoes.forEach((e) => {
										questoesInfo = [...questoesInfo, e];
									});
									questoesInfo.forEach((e) => {
										graus = [...graus, e[0].mark.replace(',', '.')];
									});

									let obj = {
										name: questoesByUser[i].userID,
										type: 'line',
										label: {
											show: true,
											position: 'top'
										},
										data: graus
									};
									teste2 = [...teste2, obj];
								}
							} else {
								alert('Nenhuma tentativa');
								questoesTodas = [];
								questoesAnalises = [];
							}

							showTentativa = true;
						}}>Pesquisar</Button
					>

					<!-- <div class="basis-1/2">
						<Label for="provas">Selecione uma prova</Label>
						<Select
							id="provas"
							class="mt-2"
							bind:value={selecaoProva}
							placeholder=""
							on:change={async () => {
								users = await getUsersByCourseid(selecaoProva);
								tentativas = await getQZAttemptsByUserid(selecaoProva, users);
								if (tentativas.length > 0) {
									let { questoesTodasRes, questoesAnalisesRes, porcentagemRes, numeroQuestoesRes } =
										await getQZAttemptData(tentativas);
									questoesTodas = questoesTodasRes;
									questoesAnalises = questoesAnalisesRes;
									questoesPorcentagem = porcentagemRes
									questoesNumero = numeroQuestoesRes
								} else {
									alert('Nenhuma tentativa');
									questoesTodas = [];
									questoesAnalises = [];
								}
								// showProva = false;
								showTentativa = true;
							}}
						>
							{#each QZs as value}
								<option {value}>{value.docente}</option>
							{/each}
						</Select>
					</div> -->
					<br />
					<br />
					<!-- <Table hoverable={true}>
						<TableHead>
							<TableHeadCell>usuário</TableHeadCell> -->
					<!-- <TableHeadCell>Índice de facilidade</TableHeadCell> -->
					<!-- </TableHead>
						<TableBody>
							{#each questoesByUser as resultados}
								<TableBodyRow>
									<TableBodyCell>{resultados.userID}</TableBodyCell>
									{#each resultados.questoes as datas}
										{#each datas as questao}
											<TableBodyRow>
												<TableBodyCell>{questao.status}</TableBodyCell>
												<TableBodyCell>{questao.mark}</TableBodyCell>
												<TableBodyCell>{questao.textoQuestao}</TableBodyCell>
											</TableBodyRow>
										{/each}
									{/each} -->

					<!-- <TableBodyCell>
								<input type="checkbox" bind:group={bindGroupFR} value={resultado.FR} />
							</TableBodyCell> -->
					<!-- </TableBodyRow>
							{/each}
						</TableBody>
					</Table> -->

					<!-- <Table hoverable={true}>
						<TableHead>
							<TableHeadCell>Numero da questao</TableHeadCell>
							<TableHeadCell>Índice de facilidade</TableHeadCell>
						</TableHead>
						<TableBody>
							{#each questoesPorcentagem as resultado}
								<TableBodyRow>
									<TableBodyCell>{resultado.slot}</TableBodyCell>
									<TableBodyCell>{resultado.porcentagem}%</TableBodyCell> -->
					<!-- <TableBodyCell>
								<input type="checkbox" bind:group={bindGroupFR} value={resultado.FR} />
							</TableBodyCell> -->
					<!-- </TableBodyRow>
							{/each}
						</TableBody>
					</Table> -->
				{/if}
			{/if}

			<!-- <Button
				color="primary"
				on:click={async () => {
					showDiscussoes = false;
					FRDs = await getFRDsByFRid(bindGroupFR);
					showDiscussoes = true;
				}}>Pesquisar</Button
			> -->

			<!-- {#if showTentativa}
				<div class="basis-1/2">
					<Label for="tentativa">Selecione uma tentativa</Label>
					<Select
						id="tentativa"
						class="mt-2"
						bind:value={selecaoTentativa}
						placeholder=""
						on:change={async () => {
							let { questions } = await getQZAttemptData(tentativas);
							questoes = questions;
							showQuestao = true;
						}}
					>
						{#each tentativas as resultado}
							{#each resultado as value}
								<option {value}>{value.id}</option>
							{/each}
						{/each}
					</Select>
				</div>
			{/if} -->
			<!-- {#if showQuestao}
				<div class="basis-1/2">
					<Label for="questao">Selecione uma questao</Label>
					<Select
						id="questao"
						class="mt-2"
						bind:value={selecaoQuestao}
						placeholder=""
						on:change={async () => {}}
					>
						{#each questoes as value}
							<option {value}>{value.slot}</option>
						{/each}
					</Select>
				</div>
			{/if} -->
		</div>
	</div>
	<!-- <div>
		{#each questoes as questao}
			<p>{@html questao.html}</p>
		{/each}
	</div> -->
</div>
<br />
<br />
<br />
<div class="flex flex-row">

	<div class="grafico">
		<Chart
			{init}
			on:click={(e) => {
	
				for (let i = 0; i < questaoConteudos.length; i++) {
	
					if(e.detail.name == questaoConteudos[i].slot){
						dadosGrafico.user = e.detail.seriesName
						dadosGrafico.questao = e.detail.name
						dadosGrafico.grau = e.detail.data
						dadosGrafico.conteudos = questaoConteudos[i].conteudos
						console.log(questaoConteudos[i].conteudos)
					}
				}
	
				// console.log('User:  ' + e.detail.seriesName);
				// console.log('Questão:  ' + e.detail.name);
				// console.log('Grau:  ' + e.detail.data);
			}}
			bind:options={options1}
		/>
	</div>
	<div>
		<p>Usuário: {dadosGrafico.user}</p>
		<p>Questão:  {dadosGrafico.questao}</p>
		<p>Grau: {dadosGrafico.grau} </p>
		<p>Conteúdos:</p>
		{#each dadosGrafico.conteudos as conteudo}
		<div>{@html conteudo.description}</div>
		{/each}
	</div>
</div>
<br>
<br>


<style>
	.grafico {
		width: 50vw;
		height: 50vh;
	}
</style>
