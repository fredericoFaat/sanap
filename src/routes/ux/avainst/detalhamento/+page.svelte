<script>
	import { onMount } from 'svelte';

	import {
		Spinner,
		Table,
		Input,
		Button,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Label,
		Select
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

	import {		
		getCategories,
		getCoursesByField,		
	} from '$utils/functionsCourse.js';

	import {
		getFBsByCourseid,		
		getFBAnalysisByFBid
	} from '$utils/functionsFB.js';
	import {
		disciplinasFiltradaCategoriaSelecionada,
		AIEAnalise,
		feedbacksTotal
	} from '$stores/geral.js';

	import { CSVDownloader } from 'svelte-csv';
	import { json2csv } from 'json-2-csv';

	let data1 = [];
	let fileDownload = $state([]);
	let showDowload = $state(false);
	let FBTs = [];
	let somaIndividual = [];
	let categoriaSelecionada = $state();
	let bindGroupFB = $state([]);
	let categorias = $state([]);
	let showComponentes = $state(false);
	let showSurveys = $state(false);
	let showResultados = $state(false);
	let showSpinner1 = $state(false);
	let showSpinner2 = $state(false);
	let disciplinasCategoriaSelecionada = [];
	let surveys = [];
	let componenteSelecionado = {};
	let inputValue1 = $state('');
	let inputValue2 = $state('');
	let inputValue3 = $state('');
	let inputValue4 = $state('');
	let aspectosAIE = [
		'avaliador',
		'O docente demonstrou planejar a aula.',
		'O docente apresentou os objetivos da aula antes no seu início.',
		'O docente utilizou o tempo previsto para a aula de forma adequada.',
		'O docente seguiu o previsto no Plano de Disciplina.',
		'Os objetivos previstos para a aula foram alcançados.',
		'O docente apresentou boa dicção e volume de voz compatível com o ambiente.',
		'Fez uso de linguagem correta e sem vícios.',
		'Os conteúdos foram apresentados de forma clara.',
		'O docente respondeu às perguntas dos discentes de forma clara.',
		'O docente buscou certificar-se de que os cadetes estavam entendendo suas explicações.',
		'O docente demonstrou conhecimento sobre os assuntos ministrados.',
		'Os conteúdos abordados foram adequados aos objetivos da aula.',
		'O docente demostrou segurança em relação aos conteúdos da aula.',
		'O docente relacionou os conteúdos da aula com conteúdos de outras disciplinas, situações do cotidiano ou do contexto militar.',
		'O docente procurou aproveitar o conhecimento e/ou experiência dos cadetes sobre os assuntos abordados na aula.',
		'O docente diversificou a metodologia adotada para condução da aula.',
		'Foram aplicados exercícios ou dinâmicas para melhor compreensão dos assuntos apresentados.',
		'Os recursos multimídia utilizados (PowerPoint, vídeos, etc.) foram adequados aos objetivos da aula ou atividade, auxiliando a compreensão dos conteúdos.',
		'Os equipamentos (computador, projetor, lousa digital, etc.) utilizados foram adequados aos objetivos da aula ou atividade, auxiliando a compreensão dos conteúdos.',
		'A condução da aula favoreceu a participação dos discentes.',
		'O docente manteve um relacionamento respeitoso com os discentes.',
		'O docente demonstrou equilíbrio emocional, inclusive em adversidades.',
		'comentarios'
	];
	use([
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
			trigger: 'axis'
		},
		legend: {
			data: ['1º resultadosAIE', '2º resultadosAIE']
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
			boundaryGap: false,
			data: aspectosAIE.slice(1, -1),
			axisLabel: {
				show: false
			}
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: '1º resultadosAIE',
				type: 'line',
				stack: 'Total',
				data: []
			},
			{
				name: '2º resultadosAIE',
				type: 'line',
				stack: 'Total',
				data: []
			}
		]
	});
	onMount(async () => {
		categorias = await getCategories();
		aspectosAIE.forEach(() => {
			somaIndividual.push(0);
		});
	});

	const filtrarCC = () => {
		return ($feedbacksTotal = $feedbacksTotal.filter((item) =>
			item.cc.toLowerCase().match(inputValue1.toLowerCase())
		));
	};

	const filtrarDocente = () => {
		return ($feedbacksTotal = $feedbacksTotal.filter((item) =>
			item.docente.toLowerCase().match(inputValue2.toLowerCase())
		));
	};
	const filtrarSemestre = () => {
		return ($feedbacksTotal = $feedbacksTotal.filter((item) =>
			item.semestre.toLowerCase().match(inputValue3.toLowerCase())
		));
	};

	const filtrarAno = () => {
		return ($feedbacksTotal = $feedbacksTotal.filter((item) =>
			item.ano.toLowerCase().match(inputValue4.toLowerCase())
		));
	};
	let csv =$state()
	const handleSelection = async (item) => {
		showResultados = false;
		let { obj, file } = await getFBAnalysisByFBid(item, aspectosAIE);
		fileDownload = file;
		$AIEAnalise = obj;
		options1.series[0].data = $AIEAnalise[0].mediasMedAIE[0].slice(1, -1);
		if ($AIEAnalise[0].totalResAIE.length > 1) {
			options1.series[1].data = $AIEAnalise[0].mediasMedAIE[1].slice(1, -1);
		}
// 		csv = json2csv(fileDownload);
// console.log(csv)
		showResultados = true;
	};
</script>

<Label for="countries">Selecione uma categoria</Label>
<Select
	id="countries"
	class="mt-2"
	bind:value={categoriaSelecionada}
	placeholder=""
	on:change={async () => {
		showComponentes = true;
		showSpinner1 = true;
		disciplinasCategoriaSelecionada = [];
		FBTs = [];
		$disciplinasFiltradaCategoriaSelecionada = await getCoursesByField(categoriaSelecionada ,'category');
		FBTs = await getFBsByCourseid($disciplinasFiltradaCategoriaSelecionada, 'CONTEXTO');
		showSpinner1 = false;
		$feedbacksTotal = FBTs;
	}}
>
	{#each categorias as value}
		<option {value}>{value.name}</option>
	{/each}
</Select>

<br />
<br />
{#if showComponentes}
	{#if showSpinner1}
		<Spinner color="yellow" size={4} />
		Carregando Feedbacks
	{:else}
		Componente Curricular
		<Input
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
		/>
		<br />
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>COMPCURR</TableHeadCell>
				<TableHeadCell>DOCENTE</TableHeadCell>
				<TableHeadCell>SEMESTRE</TableHeadCell>
				<TableHeadCell>ANO</TableHeadCell>
				<TableHeadCell>X</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $feedbacksTotal as resultado}
					<TableBodyRow>
						<TableBodyCell>{resultado.cc}</TableBodyCell>
						<TableBodyCell>{resultado.docente}</TableBodyCell>
						<TableBodyCell>{resultado.semestre}</TableBodyCell>
						<TableBodyCell>{resultado.ano}</TableBodyCell>
						<TableBodyCell>
							<input type="checkbox" bind:group={bindGroupFB} value={resultado.FB} />
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<Button
			color="primary"
			on:click={() => {
				handleSelection(bindGroupFB);
			}}>Pesquisar</Button
		>
	{/if}
{/if}
<br />
<br />
{#if showResultados}
	<!-- {#if showSpinner3}
		<Spinner color="yellow" size={4} />
	{:else}  -->
	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell>Aspecto pesquisado</TableHeadCell>
			<TableHeadCell>Média obtida</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $AIEAnalise as item}
				{#each item.totalResAIE as resultado}
					{#each resultado as res, index}
						<TableBodyRow>
							<TableBodyCell>{index + 1} - {res.aspecto}</TableBodyCell>
							<TableBodyCell>{res.valor}</TableBodyCell>
						</TableBodyRow>
					{/each}
				{/each}
			{/each}
		</TableBody>
	</Table>
	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell>Comentários</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each $AIEAnalise[0].totalComentAIE as item}
				{#each item as resultado, index}
					<TableBodyRow>
						<TableBodyCell>{index + 1} - {resultado}</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/each}
		</TableBody>
	</Table>
	<br />
	<Button
		on:click={() => {
			showDowload = true;
		}}>Download</Button
	>
	<!-- {#if showDowload} -->
		<CSVDownloader data={csv} filename={'Resultados AIE Docente'} bom={true}
		></CSVDownloader>
	<!-- {/if} -->
	<br />

	<!-- <Table>
		<TableHead>
			{#each Object.keys(fileDownload[0]) as heading}
				<TableHeadCell>{heading}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each fileDownload as user}
				<TableBodyRow>
					{#each Object.values(user) as value, index}
						{#if index === 0}
							<TableBodyCell scope="row">{value}</TableBodyCell>
						{:else}
							<TableBodyCell>{value}</TableBodyCell>
						{/if}
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table> -->
	<br />

	<div class="grafico">
		<Chart {init} bind:options={options1} />
	</div>
{/if}

<!-- {/if}  -->

<style>
	.grafico {
		width: 50vw;
		height: 50vh;
	}
</style>
