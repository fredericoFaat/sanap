<script>
	import { onMount } from 'svelte';
	import {
		// Spinner,
		Table,
		TableSearch,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Input,
		Label,
		Select,
		Modal,
		Radio,
		Card
	} from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { Chart } from 'svelte-echarts';
	import { init, use } from 'echarts/core';
	import { BarChart, LineChart, RadarChart } from 'echarts/charts';
	import {
		GridComponent,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		ToolboxComponent,
		PolarComponent,
		RadarComponent
	} from 'echarts/components';
	import { CanvasRenderer } from 'echarts/renderers';
	import {
		getUsers,
		getCohorts,
		getCohortsMembers,
		getGradeByUserId
	} from '$utils/functionsUser.js';
	import { getCoursesByUserid, getCourses, getContentsByCourseid } from '$utils/functionsCourse.js';
	import { getQZsByCourseid, getQZAttemptsByUserid, getQZAttemptData } from '$utils/functionsQZ.js';
	import { getPLAByUserid, getPLAdataByPLAid } from '$utils/functionsPLA.js';
	import { getJournalEntryByid } from '$utils/functionsJournal.js';

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

	let showSpinner1 = $state(false);
	// let showSpinner2 = $state(false);
	let showUsuarios = $state(false);
	// let showDetalheUsuario = $state(false);
	let inputValue1 = $state('');
	let inputValue2 = $state('');
	let inputValue3 = $state('');
	let inputValue4 = $state('');
	let filtrado1 = $state([]);
	let filtrado2 = $state([]);
	let filtrado3 = $state([]);
	let filtrado4 = $state([]);

	let plaUser = $state([]);
	let plaData = $state([]);
	let plaComps = $state([]);

	let journals =  $state([]);
	let cohorts = $state([]);
	// let cohortSelecionado = $state();
	let cohortsMembers = $state([]);
	let usersInfo = $state([]);
	// let usersID = $state([]);
	let questoesTodas = $state([]);
	let questoesAnalises = $state([]);
	// let questoesPorcentagem = $state([]);
	// let questoesNumero = $state([]);

	let usuariosMoodle = $state([]);
	// let usersAttempts = $state([]);
	let cursosUsuario = $state([]);
	let QZsSelecionado = $state([]);
	// let attemptsData = $state([]);
	let dataGrafico1 = $state([]);
	let dataGrafico2 = $state([]);
	let dataGrafico3 = $state([]);
	let dataGrafico4 = $state([]);

	let filtragemConteudo = $state([]);
	let filtragemCompetencias = $state([]);
	let filtragemFuncoesCognitivas = $state([]);
	let filtragemAtitudes = $state([]);

	// let questaoConteudos = [];
	let conteudosUser = $state([]);
	let QZAData = $state([]);
	let QZAs = $state([]);
	let clickOutsideModal = $state(false);
	let questaoLegendas1 = $state([]);
	let questaoLegendas2 = $state([]);
	let questaoLegendas3 = $state([]);
	let questaoLegendas4 = $state([]);
	let filtragemConteudos = $state([]);
	let selecaoCoorte = $state();
	let selecaoUsuario = $state();

	let dadosGrafico = $state({
		user: '',
		questao: '',
		grau: '',
		conteudos: []
	});
	let dadosGrafico2 = $state({
		nome: '',
		user: '',
		questao: '',
		grau: '',
		questao: {html:''},
		conteudos: []
	});
	let bindGroupCO = $state([]);
	let bindGroupUsersInfo = $state([]);
	let bindGroupCoursesUser = $state([]);
	let bindGroupQuizzesCourse = $state([]);
	use([
		BarChart,
		LineChart,
		RadarChart,
		GridComponent,
		CanvasRenderer,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		ToolboxComponent,
		PolarComponent,
		RadarComponent
	]);
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
	});

	let options2 = $state({
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
	});

	const labelRight = {
		position: 'right'
	};
	let options3 = $state({
		title: {
			text: 'xx'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			top: 80,
			bottom: 30
		},
		xAxis: {
			type: 'value',
			position: 'top',
			splitLine: {
				lineStyle: {
					type: 'dashed'
				}
			}
		},
		yAxis: {
			type: 'category',
			axisLine: { show: false },
			axisLabel: { show: false },
			axisTick: { show: false },
			splitLine: { show: false },
			data: []
		},
		series: []
	});

	let options4 = $state({
		title: {
			text: ''
		},
		legend: { data: ['Funções Cognitivas'] },
		tooltip: {},
		radar: {},

		series: {
			type: 'radar',
			tooltip: {
				trigger: 'item'
			},
			data: [
				{
					value: []
				}
			]
		},

		animation: true
	});
let htmlTeste = $state('<p>teste</p>');
let modulesTeste = $state([]);
	onMount(async () => {
		usuariosMoodle = [];
		cohorts = await getCohorts();
		modulesTeste = await getContentsByCourseid([{id:3}]);
		console.log(modulesTeste)

		journals = await getJournalEntryByid([{id:9}]);
		console.log(journals)
		htmlTeste = journals[0].text

	});

	$effect(async () => {
		let legenda1 = [];
		dataGrafico1.forEach((e) => {
			legenda1 = [...legenda1, e.name];
		});
		options1.legend.data = legenda1;
		options1.series = dataGrafico1;
		options1.xAxis.data = questaoLegendas1;

		let legenda2 = [];
		dataGrafico2.forEach((e) => {
			legenda2 = [...legenda2, e.name];
		});
		options2.legend.data = legenda2;
		options2.series = dataGrafico2;
		options2.xAxis.data = questaoLegendas2;

		options3.series = dataGrafico3;
		options3.yAxis.data = questaoLegendas3;

		options4.series = dataGrafico4;
		options4.radar.indicator = questaoLegendas4;
	});

	async function QZADataFunction(csUsuario, res) {
		let arr3 = [];
		for (let i = 0; i < csUsuario.length; i++) {
			let arr1 = [];
			let QZsTeste = [];
			let QZAsTeste = [];
			let QZADataTeste = [];
			let obj2 = {};
			QZsTeste = await getQZsByCourseid([csUsuario[i]], 'PROVA');
			for (let x = 0; x < QZsTeste.length; x++) {
				QZAsTeste = await getQZAttemptsByUserid([QZsTeste[x]], [res]);
				for (let y = 0; y < QZAsTeste.length; y++) {
					QZADataTeste = await getQZAttemptData([QZAsTeste[y]]);
					arr1 = [...arr1, QZADataTeste];
				}
				let QZAData = {
					cc: csUsuario[i],
					attemptsData: arr1
				};
				obj2 = { ...obj2, QZAData };
			}
			arr3 = [...arr3, obj2];
		}
		return arr3;
	}

	async function conteudosUserFunction(data) {
		let conteudosUserRes = [];
		for (let i = 0; i < data.length; i++) {
			for (let x = 0; x < data[i].QZAData.attemptsData.length; x++) {
				let arr1 = data[i].QZAData.attemptsData[x][0];
				if (arr1.count > 0) {
					for (let y = 0; y < arr1.questions.length; y++) {
						let arr2 = data[i].QZAData.attemptsData[x][0].questions[y];
						for (let w = 0; w < arr2.conteudos.length; w++) {
							let obj1 = arr2.conteudos[w];
							conteudosUserRes = [...conteudosUserRes, obj1];
						}
					}
				} else {
					console.log('nenhuma tentativa');
				}
			}
		}
		return conteudosUserRes;
	}

	async function filtroConteudoFunction(data, conteudos) {
		let conteudosGrupo = [];
		let filtro = [];
		let soma = 0;
		let media = 0;
		for (let i = 0; i < conteudos.length; i++) {
			conteudosGrupo = [];
			conteudosGrupo = data.filter((item) => {
				return item.shortname.match(conteudos[i]);
			});
			let obj1 = {
				shortname: conteudos[i],
				id: conteudosGrupo[0] == undefined ? undefined : conteudosGrupo[0].id,
				// cc:  conteudosGrupo[0] == undefined ? undefined : conteudosGrupo[0].cc,
				// quiz:  conteudosGrupo[0] == undefined ? undefined : conteudosGrupo[0].quiz,
				// question:  conteudosGrupo[0] == undefined ? undefined : conteudosGrupo[0].question,
				user: conteudosGrupo[0] == undefined ? undefined : conteudosGrupo[0].user,
				conteudos: conteudosGrupo
			};
			filtro = [...filtro, obj1];
		}
		for (let i = 0; i < filtro.length; i++) {
			soma = 0;
			if (filtro[i].conteudos.length > 0) {
				let grausByCont = [];
				for (let y = 0; y < filtro[i].conteudos.length; y++) {
					grausByCont = [...grausByCont, filtro[i].conteudos[y].mark];
					soma += +filtro[i].conteudos[y].mark;
				}

				media = soma / filtro[i].conteudos.length;
				filtro[i].soma = soma.toFixed(2);
				filtro[i].ocorrencias = filtro[i].conteudos.length;
				filtro[i].media = media.toFixed(2);
				filtro[i].graus = grausByCont;
			} else {
				filtro[i].soma = 0;
				filtro[i].ocorrencias = 0;
				filtro[i].media = 0;
			}
		}

		return filtro;
	}

	async function filtroFunction(data, tipo) {
		let response = [];
		let filtro1 = [];
		let obj1 = {};
		if (tipo == 'conteudos') {
			for (let i = 0; i < data.length; i++) {
				let ati = await getCompsByField('idnumber', data[i].idnumber);
				obj1 = { ...ati[0] };
				obj1.data = data;
				obj1.mark = data[i].mark;
				filtro1 = [...filtro1, obj1];
			}
		}
		if (tipo == 'atitudes') {
			for (let i = 0; i < data.length; i++) {
				for (let x = 0; x < data[i].atitudes.length; x++) {
					let ati = await getCompsByField('idnumber', data[i].atitudes[x]);
					obj1 = { ...ati[0] };
					obj1.mark = data[i].mark;
					filtro1 = [...filtro1, obj1];
				}
			}
		}
		if (tipo == 'funcoescognitivas') {
			for (let i = 0; i < data.length; i++) {
				for (let x = 0; x < data[i].funcoescognitivas.length; x++) {
					let fco = await getCompsByField('idnumber', data[i].funcoescognitivas[x]);
					obj1 = { ...fco[0] };
					obj1.data = data[i];
					obj1.mark = data[i].mark;
					filtro1 = [...filtro1, obj1];
				}
			}
		}
		const novoSet = new Set();
		const semDuplicados = filtro1.filter((e) => {
			const duplicado = novoSet.has(e.idnumber);
			novoSet.add(e.idnumber);
			return !duplicado;
		});

		semDuplicados.forEach((e) => {
			let obj2 = { soma: 0, qtd: 0 };
			for (let i = 0; i < filtro1.length; i++) {
				if (e.idnumber == filtro1[i].idnumber) {
					obj2.soma = +obj2.soma + +filtro1[i].mark;
					obj2.qtd = +obj2.qtd + 1;
				}
			}
			if (tipo == 'conteudos') {
				obj2.data = data.filter((f) => {
					return f.shortname == e.shortname;
				});
			}
			if (tipo == 'atitudes') {
				let arr1 = [];
				let arr2 = [];
				for (let i = 0; i < data.length; i++) {
					for (let x = 0; x < data[i].atitudes.length; x++) {
						if (data[i].atitudes[x] == e.idnumber) {
							arr1 = [...arr1, data[i]];
						}
					}
				}
				arr2 = [...arr2, arr1];
				obj2.data = arr2;
			}
			if (tipo == 'funcoescognitivas') {
				let arr1 = [];
				let arr2 = [];
				for (let i = 0; i < data.length; i++) {
					for (let x = 0; x < data[i].funcoescognitivas.length; x++) {
						if (data[i].funcoescognitivas[x] == e.idnumber) {
							arr1 = [...arr1, data[i]];
						}
					}
				}
				arr2 = [...arr2, arr1];
				obj2.data = arr2;
			}
			obj2.media = (obj2.soma / obj2.qtd).toFixed(2);
			obj2.idnumber = e.idnumber;
			obj2.nome = e.shortname;
			response = [...response, obj2];
		});
		return response;
	}

	async function plaUsuario(data) {
		let plaCompsRes = [];
		let compDetail = {};
		let coursesUsing = [];
		let plaUserRes = [];
		let plaDataRes = [];

		plaUserRes = await getPLAByUserid([data]);
		let arr1 = [];
		for (let i = 0; i < plaUserRes.length; i++) {
			plaDataRes = await getPLAdataByPLAid(plaUserRes[i]);
			arr1 = [...arr1, plaDataRes];
		}

		for (let i = 0; i < arr1.length; i++) {
			for (let y = 0; y < arr1[i].length; y++) {
				for (let x = 0; x < arr1[i][y].competencies.length; x++) {
					coursesUsing = await getCompsUsingByCourse(arr1[i][y].competencies[x].competency);
					compDetail = await getCompsByField('id', arr1[i][y].competencies[x].competency.id);
					arr1[i][y].competencies[x].usercompetency.courses = coursesUsing;
					arr1[i][y].competencies[x].usercompetency.detail = compDetail[0];
					plaCompsRes = [...plaCompsRes, arr1[i][y].competencies[x].usercompetency];
				}
			}
		}
		return plaCompsRes;
	}

	$effect(() => {
		filtrado1 = cohorts.filter((item) => item.name.toLowerCase().match(inputValue1.toLowerCase()));
	});
	$effect(() => {
		filtrado2 = usersInfo.filter((item) =>
			item.firstname.toLowerCase().match(inputValue2.toLowerCase())
		);
	});
	$effect(() => {
		filtrado3 = cursosUsuario.filter((item) =>
			item.shortname.toLowerCase().match(inputValue3.toLowerCase())
		);
	});
	$effect(() => {
		filtrado4 = QZsSelecionado.filter((item) =>
			item.quiz.name.toLowerCase().match(inputValue4.toLowerCase())
		);
	});
</script>
{@html htmlTeste}
<div id="container" class="grid grid-cols-12">
	<div id="painel" class="col-span-2 p-2">
		<!-- <Card>
			<p class="col-span-2"><strong>COORTE:</strong> {bindGroupCO.name}</p>
			<p class="col-span-2"><strong>USER:</strong> {bindGroupUsersInfo.firstname}</p>
		</Card> -->
		<Card>
			<!-- <p class="m-4">COORTES</p> -->
			<!-- <TableSearch
				searchClass="relative mt-1"
				inputClass="tabela"
				hoverable={true}
				placeholder=""
				bind:inputValue={inputValue1}
			>
				<TableBody tableBodyClass="divide-y">
					{#each filtrado1 as resultado}
						<TableBodyRow>
							<TableBodyCell>{resultado.name}</TableBodyCell>
							<TableBodyCell>
								<Radio
									value={resultado}
									bind:group={bindGroupCO}
									on:click={async () => {
										cohortsMembers = await getCohortsMembers([resultado]);
										let arr1 = [];
										for (let i = 0; i < cohortsMembers.length; i++) {
											for (let x = 0; x < cohortsMembers[i].length; x++) {
												arr1 = [...arr1, ...cohortsMembers[i][x].userids];
											}
										}
										usersInfo = await getUsers('id', arr1);
									}}
								></Radio>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch> -->

			<Label for="categorias">Selecione um Coorte</Label>
			<Input size="sm" type="text" bind:value={inputValue1} placeholder="digite para filtrar" />
			<Select
				id="categorias"
				class="mt-2"
				placeholder=""
				bind:value={selecaoCoorte}
				on:change={async () => {
					cohortsMembers = await getCohortsMembers([selecaoCoorte]);
					let arr1 = [];
					for (let i = 0; i < cohortsMembers.length; i++) {
						for (let x = 0; x < cohortsMembers[i].length; x++) {
							arr1 = [...arr1, ...cohortsMembers[i][x].userids];
						}
					}
					usersInfo = await getUsers('id', arr1);
				}}
			>
				{#each filtrado1 as value}
					<option {value}>{value.name}</option>
				{/each}
			</Select>

			<!-- <p class="m-4">USUÁRIOS</p>
			<TableSearch
				searchClass="relative mt-1"
				inputClass="tabela"
				hoverable={true}
				placeholder=""
				bind:inputValue={inputValue2}
			>
				<TableBody>
					{#each filtrado2 as resultado}
						<TableBodyRow>
							<TableBodyCell>{resultado.firstname}</TableBodyCell>
							<TableBodyCell>
								<Radio
									value={resultado}
									bind:group={bindGroupUsersInfo}
									on:click={async () => {
										dataGrafico2 = [];
										plaComps = await plaUsuario(resultado);
										let conteudoNomes = [];
										dataGrafico3 = [];
										plaComps.forEach((e) => {
											conteudoNomes = [...conteudoNomes, e.detail.shortname];
										});
										cursosUsuario = await getCoursesByUserid([resultado]);
										let data1 = await QZADataFunction(cursosUsuario, resultado);
										conteudosUser = await conteudosUserFunction(data1);
										filtragemConteudo = await filtroConteudoFunction(conteudosUser, conteudoNomes);
										for (let i = 0; i < plaComps.length; i++) {
											filtragemConteudo.forEach((e) => {
												if (e.shortname == plaComps[i].detail.shortname) {
													plaComps[i].media = e.media;
												}
											});
										}
										let medias = [];
										questaoLegendas3 = [];
										plaComps.forEach((e) => {
											medias = [...medias, e.media];
											questaoLegendas3 = [...questaoLegendas3, e.detail.shortname];
										});

										dataGrafico3 = [
											{
												name: 'conteudo',
												type: 'bar',
												label: {
													show: true,
													formatter: '{b}'
												},
												data: medias
											}
										];

										options3.yAxis.data = questaoLegendas3;

										options3.title.text = '';

										for (let i = 0; i < filtragemConteudo.length; i++) {
											dataGrafico2 = [
												...dataGrafico2,
												{
													name: filtragemConteudo[i].shortname,
													type: 'line',
													label: {
														show: true,
														position: 'top'
													},
													data: filtragemConteudo[i].graus
												}
											];
										}
										options2.title.text = '';
									}}
								></Radio>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch> -->

			<Label class="mt-2" for="categorias">Selecione um Usuário</Label>
			<Input size="sm" type="text" bind:value={inputValue2} placeholder="digite para filtrar" />
			<Select
				id="categorias"
				class="mt-2"
				placeholder=""
				bind:value={selecaoUsuario}
				on:change={async () => {
					dataGrafico2 = [];
					plaComps = await plaUsuario(selecaoUsuario);

					dataGrafico3 = [];
					dataGrafico4 = [];

					cursosUsuario = await getCoursesByUserid([selecaoUsuario]);

					let data1 = await QZADataFunction(cursosUsuario, selecaoUsuario);
					conteudosUser = await conteudosUserFunction(data1);

					filtragemAtitudes = await filtroFunction(conteudosUser, 'atitudes');
					filtragemFuncoesCognitivas = await filtroFunction(conteudosUser, 'funcoescognitivas');
					filtragemConteudos = await filtroFunction(conteudosUser, 'conteudos');

					let mediasConteudos = [];
					questaoLegendas3 = [];
					filtragemConteudos.forEach((e) => {
						mediasConteudos = [...mediasConteudos, e.media];
						questaoLegendas3 = [...questaoLegendas3, e.nome];
					});
					dataGrafico3 = [
						{
							name: 'conteudo',
							type: 'bar',
							label: {
								show: true,
								formatter: '{b}'
							},
							data: mediasConteudos
						}
					];

					options3.yAxis.data = questaoLegendas3;
					options3.title.text = '';

					let mediasFuncoesCognitivas = [];
					questaoLegendas4 = [];
					filtragemFuncoesCognitivas.forEach((e) => {
						mediasFuncoesCognitivas = [...mediasFuncoesCognitivas, e.media];
						questaoLegendas4 = [
							...questaoLegendas4,
							{
								name: e.nome,
								max: 1,
								color: 'black'
							}
						];
					});
					(dataGrafico4 = {
						type: 'radar',
						data: [
							{
								value: mediasFuncoesCognitivas,
								name: 'Funções Cognitivas'
							}
						],
						tooltip: {
							trigger: 'item'
						},
						label: {
							show: true
						},
						axisPointer: {
							show: true,
							label: {
								show: true
							}
						}
					}),
						(options4.radar.indicator = questaoLegendas4);

					options4.title.text = 'Funções Cognitivas';

					let graus = [];
					for (let i = 0; i < filtragemConteudos.length; i++) {
						graus = [];
						for (let x = 0; x < filtragemConteudos[i].data.length; x++) {
							graus = [...graus, filtragemConteudos[i].data[x].mark];
						}
						filtragemConteudos[i].graus = graus;
					}
					for (let i = 0; i < filtragemConteudos.length; i++) {
						dataGrafico2 = [
							...dataGrafico2,
							{
								name: filtragemConteudos[i].nome,
								type: 'line',
								label: {
									show: true,
									position: 'top'
								},
								data: filtragemConteudos[i].graus
							}
						];
					}

					options2.title.text = '';
				}}
			>
				{#each filtrado2 as value}
					<option {value}>{value.firstname}</option>
				{/each}
			</Select>

			<p class="m-4">DISCIPLINA</p>
			<TableSearch
				searchClass="relative mt-1"
				inputClass="tabela"
				hoverable={true}
				placeholder=""
				bind:inputValue={inputValue3}
			>
				<TableBody>
					{#each filtrado3 as resultado}
						<TableBodyRow>
							<TableBodyCell>{resultado.shortname}</TableBodyCell>
							<TableBodyCell>
								<Radio
									value={resultado}
									bind:group={bindGroupCoursesUser}
									on:click={async () => {
										QZsSelecionado = await getQZsByCourseid([resultado], 'PROVA');
									}}
								></Radio>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch>
			<p class="m-4">QUIZZES</p>
			<TableSearch
				searchClass="relative mt-1"
				inputClass="tabela"
				hoverable={true}
				placeholder=""
				bind:inputValue={inputValue4}
			>
				<TableBody>
					{#each filtrado4 as resultado}
						<TableBodyRow>
							<TableBodyCell>{resultado.quiz.name}</TableBodyCell>
							<TableBodyCell>
								<input type="checkbox" bind:group={bindGroupQuizzesCourse} value={resultado} />
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</TableSearch>
			<div>
				<Button
					color="primary"
					on:click={async () => {
						dataGrafico1 = [];
						QZAs = await getQZAttemptsByUserid(bindGroupQuizzesCourse, [bindGroupUsersInfo]);
						if (QZAs.length > 0) {
							QZAData = await getQZAttemptData(QZAs);
							for (let i = 0; i < QZAData.length; i++) {
								let questaoGraus = [];
								questaoLegendas1 = [];
								for (let x = 0; x < QZAData[i].questions.length; x++) {
									questaoGraus = [...questaoGraus, QZAData[i].questions[x].mark];
									questaoLegendas1 = [...questaoLegendas1, QZAData[i].questions[x].slot];
								}
								let obj1 = {
									name: QZAData[i].quiz.name,
									type: 'line',
									label: {
										show: true,
										position: 'top'
									},
									data: questaoGraus
								};
								dataGrafico1 = [...dataGrafico1, obj1];
							}
							options1.title.text = '';
						} else {
							alert('Nenhuma tentativa');
							questoesTodas = [];
							questoesAnalises = [];
						}
					}}><SearchOutline /></Button
				>
			</div>
		</Card>
	</div>
	<div id="graficos" class="col-span-10 m-2">
		<div id="containerGrafico" class="grid grid-cols-6">
			<div id="tabelaInfo" class="col-span-4 grafico">
				<Chart {init} on:click={(e) => {}} bind:options={options3} />
				<!-- <Card size="lg">
					<Table hoverable={true}>
						<TableHead>
							<TableHeadCell>Conteúdos</TableHeadCell>
							<TableHeadCell>Status</TableHeadCell>
							<TableHeadCell>Média</TableHeadCell>
							<TableHeadCell>Disciplinas</TableHeadCell>
						</TableHead>
						<TableBody>
							{#each plaComps as resultado}
								<TableBodyRow>
									<TableBodyCell>
										{resultado.detail.shortname}
									</TableBodyCell>
									<TableBodyCell>
										{resultado.gradename}
									</TableBodyCell>
									<TableBodyCell>
										{resultado.media}
									</TableBodyCell>
									{#each resultado.courses as data}
										<TableBodyRow>
											<TableBodyCell>
												{data.shortname}
											</TableBodyCell>
										</TableBodyRow>
									{/each}
								</TableBodyRow>
							{/each}
						</TableBody>
					</Table>
				</Card> -->
			</div>
			<div id="tabelaInfo" class="col-span-4 grafico">
				<Chart {init} on:click={(e) => {}} bind:options={options4} />
			</div>
			<div id="graficos" class="col-span-6">
				<div class="grid grid-cols-4">
					<div id="grafico1" class="col-span-2 grafico">
						<Chart
							{init}
							on:click={(e) => {
								for (let i = 0; i < QZAData.length; i++) {
									if (e.detail.seriesName == QZAData[i].quiz.name) {
										for (let x = 0; x < QZAData[i].questions.length; x++) {
											if (e.detail.name == QZAData[i].questions[x].slot) {
												dadosGrafico.user = QZAData[i].user.firstname;
												dadosGrafico.cc = QZAData[i].cc.fullname;
												dadosGrafico.questionario = QZAData[i].quiz.name;
												dadosGrafico.questao = QZAData[i].questions[x].slot;
												dadosGrafico.grau = QZAData[i].questions[x].mark;
												dadosGrafico.conteudos = QZAData[i].questions[x].conteudos;

												for (let w = 0; w < dadosGrafico.conteudos.length; w++) {
													let docHTML = document.createElement('html');
													docHTML.innerHTML = dadosGrafico.conteudos[w].description;
													dadosGrafico.conteudos[w].description = docHTML.innerText;
												}
											}
										}
									}
								}
							}}
							bind:options={options1}
						/>
						<div>
							<p><strong>Disciplina:</strong> {dadosGrafico.cc}</p>
							<p><strong>Usuário:</strong> {dadosGrafico.user}</p>
							<p><strong>Questionário:</strong> {dadosGrafico.questionario}</p>
							<p><strong>Questão:</strong> {dadosGrafico.questao}</p>
							<p><strong>Grau:</strong> {dadosGrafico.grau}</p>
							<p><strong>Conteúdos:</strong></p>
						</div>
						<div class="flex-row">
							{#each dadosGrafico.conteudos as resultado}
								<p>- {resultado.description}</p>
							{/each}
						</div>
					</div>
					<div id="grafico2" class="col-span-2 grafico">
						<Chart
							{init}
							on:click={(e) => {
								for (let i = 0; i < filtragemConteudos.length; i++) {
									if (e.detail.seriesName == filtragemConteudos[i].nome) {
										for (let x = 0; x < filtragemConteudos[i].data.length; x++) {
											if (e.detail.dataIndex == x) {
												dadosGrafico2.nome = filtragemConteudos[i].data[x].shortname;
												dadosGrafico2.user = filtragemConteudos[i].data[x].user.firstname;
												dadosGrafico2.cc = filtragemConteudos[i].data[x].cc.fullname;
												dadosGrafico2.questionario = filtragemConteudos[i].data[x].quiz.name;
												dadosGrafico2.questao = filtragemConteudos[i].data[x].question;
												dadosGrafico2.grau = filtragemConteudos[i].data[x].mark;
											}
										}
									}
								}
							}}
							bind:options={options2}
						/>
						<div>
							<p><strong>Conteudo:</strong> {@html dadosGrafico2.nome}</p>
							<p><strong>Disciplina:</strong> {dadosGrafico2.cc}</p>
							<p><strong>Usuário:</strong> {dadosGrafico2.user}</p>
							<p><strong>Questionário:</strong> {dadosGrafico2.questionario}</p>
							<p><strong>Grau:</strong> {dadosGrafico2.grau}</p>
							<p><strong>Questão:</strong> {@html dadosGrafico2.questao.html}</p>
						</div>					
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- <div>
			<p><strong>Disciplina:</strong> {dadosGrafico.cc}</p>
			<p><strong>Usuário:</strong> {dadosGrafico.user}</p>
			<p><strong>Questionário:</strong> {dadosGrafico.questionario}</p>
			<p><strong>Questão:</strong> {dadosGrafico.questao}</p>
			<p><strong>Grau:</strong> {dadosGrafico.grau}</p>
			<p><strong>Conteúdos:</strong></p>
		</div> -->
<style>
	.grafico {
		width: 30vw;
		height: 30vh;
	}
</style>
