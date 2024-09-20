<script>
	import { onMount } from 'svelte';

	import {
		Spinner,
		Dropdown,
		DropdownItem,
		Table,
		Input,
		Button,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		Label,
		Select,
		Radio,
		Modal
	} from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
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
	import { getPLAByUserid, getPLAdataByPLAid } from '$utils/functionsPLA.js';

	import { getUsers, getUsersByCourseid } from '$utils/functionsUser.js';
	import {
		getCompFWs,
		getPLAusuario,
		getCompsByPLAid,
		getCompsByFWid,
		getCompsByCE,
		getContsByComp,
		getCompsByField,
		getCompsUsingByCourse
	} from '$utils/functionsComp.js';

	//VARIÁVEIS
	let teste = $state([]);

	let users = $state([]);
	let groupUsers = $state([]);
	let plaUser = $state([]);
	let groupPLAData = $state([]);
	let groupPLAcomp = $state([]);
	let plaData = $state([]);
	let PLAcomps = $state([]);
	let clickOutsideModal = $state(false);

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

	let dataGrafico = $state([]);
	let options1 = $state({
		title: {
			text: ''
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
			// data: ['c1', 'c2']
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
			data: ['Mon', 'Tue']
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} °C'
			}
		},
		series: [
			{
				name: 'c1',
				type: 'line',
				label: {
					show: true,
					position: 'top'
				},
				data: [1, 1]
			},
			{
				name: 'c2',
				type: 'line',
				label: {
					show: true,
					position: 'top'
				},
				data: [1, 2]
			}
		]
	});

	//ONMOUNT

	onMount(async () => {
		users = await getUsers('email', ['%%']);
	});

	//EFFECT
	$effect(async () => {
		// let legenda = [];
		// dataGrafico.forEach((e) => {
		// 	legenda = [...legenda, e.name];
		// });
		// options1.legend.data = legenda;
		// options1.series = dataGrafico;
		// options1.xAxis.data = ['1'];
	});
</script>

<div class="flex flex-row">
	<div class="basis-1/2">
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Usuários</TableHeadCell>
				<TableHeadCell>X</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each users as resultado}
					<TableBodyRow>
						<TableBodyCell>
							<Radio value={resultado} bind:group={groupUsers}>{resultado.fullname}</Radio>
							<!-- <input type="checkbox" bind:group={bindGroupCO} value={resultado} /> -->
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div class="basis-1/2 p4">
		<Button
			color="primary"
			on:click={async () => {
				plaUser = await getPLAByUserid([groupUsers]);
				plaData = await getPLAdataByPLAid(plaUser[0]);
			}}><SearchOutline /></Button
		>
	</div>
</div>
<hr />

<div class="flex flex-row">
	<div class="basis-1/2">
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>PLANOS DE APRENDIZAGEM</TableHeadCell>
				<TableHeadCell>X</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each plaData as resultado}
					<TableBodyRow>
						<TableBodyCell>
							<Radio
								value={resultado}
								bind:group={groupPLAData}
								on:click={async () => {
									let compDetail = {};
									PLAcomps = [];
									let coursesUsing = [];
									for (let i = 0; i < resultado.competencies.length; i++) {
										coursesUsing = await getCompsUsingByCourse(
											resultado.competencies[i].competency
										);
										// console.log(coursesUsing);
										compDetail = await getCompsByField(
											'id',
											resultado.competencies[i].competency.id
										);
										resultado.competencies[i].usercompetency.plauser = groupUsers;
										resultado.competencies[i].usercompetency.courses = coursesUsing;
										resultado.competencies[i].usercompetency.detail = compDetail[0];
										PLAcomps = [...PLAcomps, resultado.competencies[i].usercompetency];
									}
									console.log(PLAcomps);
									clickOutsideModal = true;
								}}>{resultado.plan.name}</Radio
							>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<!-- <div class="basis-1/2 p4">
		<Button
			color="primary"
			on:click={async () => {
				console.log(groupPLAData);
			}}><SearchOutline /></Button
		>
	</div> -->
</div>
<hr />

<div class="flex flex-row">
	<div class="basis-1/2">
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Conteúdos</TableHeadCell>
				<TableHeadCell>Status</TableHeadCell>
				<TableHeadCell>Disciplinas</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each PLAcomps as resultado}
					<!-- {console.log(resultado)} -->
					<TableBodyRow>
						<TableBodyCell>
							{resultado.detail.shortname}
						</TableBodyCell>
						<TableBodyCell>
							{resultado.gradename}
							<!-- <Radio value={resultado} bind:group={groupPLAcomp}>{resultado.gradename}</Radio> -->
						</TableBodyCell>
						<!-- <TableBodyCell> -->
						{#each resultado.courses as data}
							<TableBodyRow>
								<TableBodyCell>
									{data.shortname}
								</TableBodyCell>
							</TableBodyRow>
						{/each}
						<!-- </TableBodyCell> -->
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	<div class="basis-1/2 p4">
		<Button
			color="primary"
			on:click={async () => {
				// plaUser = await getPLAByUserid([]);
				// console.log(groupPLAData);
			}}><SearchOutline /></Button
		>
	</div>
</div>
<hr />

<!-- <Modal title="Desempenho" size="xl" bind:open={clickOutsideModal} autoclose outsideclose> -->
<!-- <div class="grid grid-cols-1"> -->
	<!-- <div class="grafico"> -->
		<!-- <Chart -->
			<!-- {init}
			on:click={(e) => {
				for (let i = 0; i < QZAData.length; i++) {
					if (e.detail.seriesName == QZAData[i].quiz.name) {
						for (let x = 0; x < QZAData[i].questions.length; x++) {
							if (e.detail.name == QZAData[i].questions[x].slot) {
								dadosGrafico.questionario = QZAData[i].quiz.name;
								dadosGrafico.questao = QZAData[i].questions[x].slot;
								dadosGrafico.grau = QZAData[i].questions[x].mark;
								dadosGrafico.conteudos = QZAData[i].questions[x].conteudos;
								for (let w = 0; w < QZAData[i].questions[x].conteudos.length; w++) {
									let docHTML = document.createElement('html');
									docHTML.innerHTML = QZAData[i].questions[x].conteudos[w].description;
									QZAData[i].questions[x].conteudos[w].description = docHTML.innerText;
								}
							}
						}
					}
				}
			}} -->
			<!-- bind:options={options1} -->
		<!-- />
	</div>
</div> -->

<!-- </Modal> -->

<!-- <style>
	.grafico {
		width: 70vw;
		height: 70vh;
	}
</style> -->
