<script>
	import { onMount } from 'svelte';

	import {
		Spinner,
		Dropdown,
		DropdownItem,
		Table,
		Input,
		Button,
		Card,
		Modal,
		TableHead,
		TableHeadCell,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		FloatingLabelInput,
		Helper,
		Select,
		Label,
		Checkbox,
		MultiSelect
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	import {
		disciplinasFiltradaCategoriaSelecionada,
		AIEAnalise,
		feedbacksTotal,
		bancoAI,
		feedbackAI
	} from '$stores/geral.js';

	// import { CSVDownloader } from 'svelte-csv';
	let formModal = false;
	let selected = [];
	let tiposConteudos = [
		{ value: 1, name: 'Conceitual' },
		{ value: 2, name: 'Procedimental' },
		{ value: 3, name: 'Atitudinal' }
	];
	let niveis = [
		{ value: 1, name: 'Baixa' },
		{ value: 2, name: 'Média' },
		{ value: 3, name: 'Alta' }
	];
	let bindGroupFB = [];
	let bindGroupOpMental = [];
	let categorias = [];
	let showComponentes = false;
	let showFeedbacks = false;
	let showSurveys = false;
	let showResultados = false;
	let showDisciplinas = false;
	let showSpinner1 = false;
	let showSpinner2 = false;
	let disciplinasCategoriaSelecionada = [];
	let feedbacksTotalSelecionado = [];
	let inputValue1 = '';
	let inputValue2 = '';
	let inputValue3 = '';
	let inputValue4 = '';
	let checked = false;
	let aspectosEAM = [
		{ aspectos: 'Ementa', opcoes: ['Ementa'], valores: '' },
		{ aspectos: 'Conteúdo programático', opcoes: ['Conteúdo programático'], valores: '' },
		{
			aspectos: 'Tipo de conteúdo',
			opcoes: ['tipo'],
			valores: []
		},
		{
			aspectos: 'Familiaridade',
			opcoes: ['Familiaridade'],
			valores: []
		},
		{
			aspectos: 'Quantidade de informação',
			opcoes: ['Quantidade'],
			valores: []
		},
		{
			aspectos: 'Abstração',
			opcoes: ['Abstração'],
			valores: []
		},
		{
			aspectos: 'FUNÇÕES COGNITIVAS',
			opcoes: [
				'Percepção clara e precisa',
				'Comportamento exploratório sistemático',
				'Uso de vocabulário e conceitos apropriados',
				'Orientação espacial eficiente',
				'Orientação temporal eficiente',
				'Constatação da constância e permanência do objeto',
				'Resumo de dados com precisão e exatidão',
				'Considerar duas ou mais fontes de informação simultâneas',
				'Perceber o problema e defini-lo com clareza',
				'Facilidade para distinguir dados relevantes dos irrelevantes',
				'Exercitar a conduta comparativa',
				'Amplitude do campo mental',
				'Percepção global (não episódica da realidade)',
				'Uso do raciocínio lógico',
				'Interiorização do próprio comportamento',
				'Exercício do pensamento hipotético-inferencial',
				'Traçar estratégias para verificar hipóteses',
				'Conduta planejada',
				'Elaboração de categorias cognitivas',
				'Aplicação da conduta somativa',
				'Facilidade para estabelecer relações virtuais',
				'Comunicação descentralizada (não egocêntrica)',
				'Projeção de relações virtuais',
				'Expressão sem bloqueio na comunicação de respostas',
				'Respostas certas sem ensaio e erro',
				'Uso de instrumentos verbais adequados',
				'Precisão e exatidão na comunicação de respostas',
				'Eficácia no transporte visual',
				'Conduta controlada e não impulsiva'
			],
			valores: []
		},
		// { aspectos: 'Identificação', opcoes: ['Identificação'], valores: [] },
		// { aspectos: 'Comparação', opcoes: ['Comparação'], valores: [] },
		// { aspectos: 'Análise', opcoes: ['Análise'], valores: [] },
		// { aspectos: 'Síntese', opcoes: ['Síntese'], valores: [] },
		// { aspectos: 'Classificação', opcoes: ['Classificação'], valores: [] },
		// { aspectos: 'Diferenciação', opcoes: ['Diferenciação'], valores: [] },
		// { aspectos: 'Codificação', opcoes: ['Codificação'], valores: [] },
		// { aspectos: 'Decodificação', opcoes: ['Decodificação'], valores: [] },
		// {
		// 	aspectos: 'Projeção de relações virtuais',
		// 	opcoes: ['Projeção de relações virtuais'],
		// 	valores: []
		// },
		// { aspectos: 'Representação mental', opcoes: ['Representação mental'], valores: [] },
		// { aspectos: 'Transformação mental', opcoes: ['Transformação mental'], valores: [] },
		// { aspectos: 'Raciocínio divergente', opcoes: ['Raciocínio divergente'], valores: [] },
		// { aspectos: 'Raciocínio lógico', opcoes: ['Raciocínio lógico'], valores: [] },
		// { aspectos: 'Raciocínio hipotético', opcoes: ['Raciocínio hipotético'], valores: [] },
		// { aspectos: 'Raciocínio inferencial', opcoes: ['Raciocínio inferencial'], valores: [] },
		// { aspectos: 'Raciocínio transitivo', opcoes: ['Raciocínio transitivo'], valores: [] },
		// { aspectos: 'Raciocínio analógico', opcoes: ['Raciocínio analógico'], valores: [] },
		// { aspectos: 'Raciocínio progressivo', opcoes: ['Raciocínio progressivo'], valores: [] },
		// { aspectos: 'Raciocínio silogístico', opcoes: ['Raciocínio silogístico'], valores: [] },
		// {
		// 	aspectos: 'OPERAÇÕES MENTAIS',
		// 	opcoes: [
		// 		'Identificação',
		// 		'Comparação',
		// 		'Análise',
		// 		'Síntese',
		// 		'Classificação',
		// 		'Diferenciação',
		// 		'Codificação',
		// 		'Decodificação',
		// 		'Projeção de relações virtuais',
		// 		'Representação mental',
		// 		'Transformação mental',
		// 		'Raciocínio divergente',
		// 		'Raciocínio lógico',
		// 		'Raciocínio hipotético',
		// 		'Raciocínio inferencial',
		// 		'Raciocínio transitivo',
		// 		'Raciocínio analógico',
		// 		'Raciocínio progressivo',
		// 		'Raciocínio silogístico'
		// 	],
		// 	valores: []
		// },
		// {
		// 	aspectos: 'FUNÇÃO DE ENTRADA',
		// 	opcoes: [
		// 		'Percepção clara e precisa',
		// 		'Comportamento exploratório sistemático',
		// 		'Uso de vocabulário e conceitos apropriados',
		// 		'Orientação espacial eficiente',
		// 		'Orientação temporal eficiente',
		// 		'Constatação da constância e permanência do objeto',
		// 		'Resumo de dados com precisão e exatidão',
		// 		'Considerar duas ou mais fontes de informação simultâneas'
		// 	],
		// 	valores: []
		// },
		// {
		// 	aspectos: 'FUNÇÃO DE ELABORAÇÃO',
		// 	opcoes: [
		// 		'Perceber o problema e defini-lo com clareza',
		// 		'Facilidade para distinguir dados relevantes dos irrelevantes',
		// 		'Exercitar a conduta comparativa',
		// 		'Amplitude do campo mental',
		// 		'Percepção global (não episódica da realidade)',
		// 		'Uso do raciocínio lógico',
		// 		'Interiorização do próprio comportamento',
		// 		'Exercício do pensamento hipotético-inferencial',
		// 		'Traçar estratégias para verificar hipóteses',
		// 		'Conduta planejada',
		// 		'Elaboração de categorias cognitivas',
		// 		'Aplicação da conduta somativa',
		// 		'Facilidade para estabelecer relações virtuais'
		// 	],
		// 	valores: []
		// },
		// {
		// 	aspectos: 'FUNÇÃO DE SAÍDA',
		// 	opcoes: [
		// 		'Comunicação descentralizada (não egocêntrica)',
		// 		'Projeção de relações virtuais',
		// 		'Expressão sem bloqueio na comunicação de respostas',
		// 		'Respostas certas, sem ensaio e erro',
		// 		'Uso de instrumentos verbais adequados',
		// 		'Precisão e exatidão na comunicação de respostas',
		// 		'Eficácia no transporte visual',
		// 		'Conduta controlada, não impulsiva'
		// 	],
		// 	valores: []
		// },
		{
			aspectos: 'OBJETOS DE APRENDIZAGEM',
			opcoes: [
				'Imagem',
				'Som',
				'Corporal',
				'Vídeo',
				'Tabela',
				'Gráfico',
				'Infográficos',
				'Texto',
				'Gráfico animado',
				'Conteúdo interativo',
				'Mapa mental',
				'Podcasts',
				'Vídeos interativos',
				'Flashcards',
				'Fóruns online',
				'E-books',
				'Simuladores',
				'Game',
				'Stroytelling',
				'Slides narrados',
				'Videoaula',
				'Lista de exercícios'
			],
			valores: []
		},
		{
			aspectos: 'AVALIAÇÃO',
			opcoes: [
				'Discursivo',
				'Dissertativo',
				'Única escolha',
				'Múltipla escolha',
				'Sequência',
				'Combinação'
			],
			valores: []
		},
		{
			aspectos: 'METODOLOGIA',
			opcoes: [
				'AB Projeto',
				'AB Problema',
				'AB Equipe',
				'Discussão dirigida',
				'Sala de Aula invertida',
				'Aprendizagem entre pares',
				'Gamefication',
				'Estudo de caso',
				'Storytelling',
				'Seminário',
				'Rotação por estações',
				'Coaprendizagem',
				'Teoria e Prática'
			],
			valores: []
		}
	];
	let aspectosFeedbackAI = [];
	aspectosFeedbackAI = [...aspectosFeedbackAI, ...aspectosEAM[7].opcoes];
	aspectosFeedbackAI = [...aspectosFeedbackAI, ...aspectosEAM[8].opcoes];
	aspectosFeedbackAI = [...aspectosFeedbackAI, ...aspectosEAM[9].opcoes];

	let FBTs = [];
	let eamResultados = [];
	let opcoes = [];
	let showfeedbackAI = false;
	let feedbackAI_OA = [];
	let feedbackAI_Av = [];
	let feedbackAI_MD = [];
	let previsaoEAM = [];
	let form1;
	let form2;
	let form3;
	let form4;
	let form5;
	let form6;

	onMount(() => {
		getCategories();
	});

	let files;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}
	}
	// function toggleAll() {
	// 	checked = !checked;
	// }
	let open = false;
	const toggle = () => {
		showfeedbackAI = !showfeedbackAI;
		open = !open;
	};

	let objAI = { bancoAI: [], previsao: [] };

	const getCategories = async () => {
		const response = await fetch('/api/moodle/getCategories');
		const responseJSON = await response.json();
		if (responseJSON.error) {
			throw error(responseJSON.error.status, responseJSON.error.message);
		}
		categorias = responseJSON;
		return responseJSON;
	};

	const getFBTByCategoryId = async (categoriaSelecionada) => {
		let field = 'category';
		showComponentes = false;
		showfeedbackAI = false;
		showSurveys = false;
		showSpinner2 = false;
		showSpinner1 = true;
		showDisciplinas = true;
		disciplinasCategoriaSelecionada = [];
		FBTs = [];
		const response = await fetch('/api/moodle/getCoursesByField', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ categoriaSelecionada, field })
		});
		const responseJSON = await response.json();
		if (responseJSON.error) {
			throw error(responseJSON.error.status, responseJSON.error.message);
		}
		disciplinasCategoriaSelecionada = responseJSON.courses;
		$disciplinasFiltradaCategoriaSelecionada = disciplinasCategoriaSelecionada;
		FBTs = await getFBsByCourseid($disciplinasFiltradaCategoriaSelecionada);
		feedbacksTotalSelecionado = FBTs;
		$feedbacksTotal = feedbacksTotalSelecionado;
		showSpinner1 = false;
		return disciplinasCategoriaSelecionada;
	};

	const getFBsByCourseid = async (item) => {
		let FBs = [];
		for (let i = 0; i < item.length; i++) {
			const response = await fetch('/api/moodle/getFBsByCourseid', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(item[i].id)
			});
			const responseJSON = await response.json();
			if (responseJSON.feedbacks.length > 0) {
				for (let x = 0; x < responseJSON.feedbacks.length; x++) {
					let divisao1;
					let id;
					let divisao2;
					let divisao3;
					let docente;
					let semestre;
					let ano;
					function getSafe(fn, defaultVal) {
						try {
							return fn();
						} catch (e) {
							return defaultVal;
						}
					}
					if (getSafe(() => responseJSON.feedbacks[x].name.split(':'), 'não é').length > 1) {
						divisao1 = responseJSON.feedbacks[x].name.split(':');
						id = divisao1[0].replace(' ', '');
						if (id == 'EAM') {
							if (getSafe(() => divisao1[1].split('-'), 'não é').length > 1) {
								divisao2 = divisao1[1].split('-');
								docente = divisao2[1].replace(' ', '');
								if (getSafe(() => divisao2[0].split('/'), 'não é').length > 1) {
									divisao3 = divisao2[0].split('/');
									semestre = +divisao3[0].replace(' ', '');
									ano = +divisao3[1].replace(' ', '');
									let obj = {
										cc: item[i].shortname,
										id,
										docente,
										semestre,
										ano,
										FB: responseJSON.feedbacks[x]
									};
									FBs = [...FBs, obj];
								}
							}
						} else {
							console.log('não é EAM');
						}
					}
				}
			}
			if (responseJSON.error) {
				throw error(responseJSON.error.status, responseJSON.error.message);
			}
		}
		return FBs;
	};

	const getFBAnalysisByFBid = async (selecao) => {
		for (let i = 0; i < selecao.length; i++) {
			const response = await fetch('/api/moodle/getFBAnalysisByFBid', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(selecao[i])
			});
			const responseJSON = await response.json();
			if (responseJSON.error) {
				throw error(responseJSON.error.status, responseJSON.error.message);
			}
			let totalEnviosIndividual = await responseJSON.totalanonattempts;
			if (totalEnviosIndividual > 0) {
				eamResultados = [];
				for (let i = 0; i < totalEnviosIndividual; i++) {
					opcoes = [];
					let valoresEAM = [];
					let arr1 = [];
					let obj = {};
					let arrObj = {
						tipo: 0,
						arr: []
					};
					for (let x = 0; x < aspectosEAM.length; x++) {
						arr1 = [];
						arrObj.arr = [];
						let respostas = responseJSON.anonattempts[i].responses[x].rawval.split('|');
						if (aspectosEAM[x].opcoes.length == 1) {
							for (let y = 0; y < aspectosEAM[x].opcoes.length; y++) {
								//possui uma opçao
								arrObj.tipo = 1;
								arr1.push(1);
								opcoes.push(aspectosEAM[x].opcoes[y]);
							}
						} else {
							for (let y = 0; y < aspectosEAM[x].opcoes.length; y++) {
								//possui mais de uma opção
								arrObj.tipo = 0;
								arr1.push(0);
								opcoes.push(aspectosEAM[x].opcoes[y]);
							}
						}
						arrObj.arr = arr1;
						for (let z = 0; z < respostas.length; z++) {
							if (isNaN(respostas[z])) {
								arr1[0] = 0;
							} else {
								if (arrObj.tipo == 1) {
									arrObj.arr[0] = +respostas[z];
								}
								if (arrObj.tipo == 0) {
									arrObj.arr[respostas[z] - 1] = 1;
								}
							}
						}
						valoresEAM = [...valoresEAM, ...arrObj.arr];
					}
					obj = {
						opcoes: opcoes,
						valores: valoresEAM
					};
					eamResultados = [...eamResultados, obj];
				}
				let obj1 = {};
				for (let w = 0; w < eamResultados.length; w++) {
					obj1 = {};
					for (let a = 0; a < eamResultados[w].valores.length; a++) {
						obj1[eamResultados[w].opcoes[a]] = eamResultados[w].valores[a];
					}
					$bancoAI = [...$bancoAI, obj1];
				}
				objAI.bancoAI = $bancoAI;
				objAI.previsao = previsaoEAM;
				console.log(objAI);
				showResultados = true;
			} else {
				alert('Nenhuma avaliação realizada');
				$bancoAI = [];
				showResultados = false;
				showfeedbackAI = false;
			}
		}
	};

	const getFeedbackAI = async (data) => {
		let resposta = [];
		const response = await fetch('/api/ai/getFeedbackAI', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const responseJSON = await response.json();
		if (responseJSON.error) {
			throw error(responseJSON.error.status, responseJSON.error.message);
		}
		for (let i = 0; i < responseJSON.sugestao[0].length; i++) {
			let obj = {
				aspecto: aspectosFeedbackAI[i],
				valor: responseJSON.sugestao[0][i] == 0 ? 'não' : 'sim'
			};
			resposta = [...resposta, obj];
		}
		let obj = {
			sugestao: resposta,
			accuracy: responseJSON.accuracy * 100
		};
		return obj;
	};

	const filtrarCC = () => {
		return ($feedbacksTotal = feedbacksTotalSelecionado.filter((item) =>
			item.cc.toLowerCase().match(inputValue1.toLowerCase())
		));
	};

	const filtrarDocente = () => {
		return ($feedbacksTotal = feedbacksTotalSelecionado.filter((item) =>
			item.docente.toLowerCase().match(inputValue2.toLowerCase())
		));
	};
	const filtrarSemestre = () => {
		return ($feedbacksTotal = feedbacksTotalSelecionado.filter((item) =>
			item.semestre.toLowerCase().match(inputValue3.toLowerCase())
		));
	};

	const filtrarAno = () => {
		return ($feedbacksTotal = feedbacksTotalSelecionado.filter((item) =>
			item.ano.toLowerCase().match(inputValue4.toLowerCase())
		));
	};
	// const handleSelection = async (selecao) => {
	// 	showComponentes = false;
	// 	showResultados = false;
	// $AIEAnalise = await getFBAnalysisByFBid(selecao);
	// 	showResultados = true;
	// };

	const postAI = async (selecao) => {
		console.log(selecao);
		selecao.previsao[0] = 0;
		selecao.previsao[1] = 0;
		for (let i = 0; i < aspectosEAM[6].opcoes.length; i++) {
			selecao.previsao[i + 6] = 0;
		}

		for (let i = 0; i < selecao.OpMental.length; i++) {
			for (let x = 0; x < aspectosEAM[6].opcoes.length; x++) {
				if (selecao.OpMental[i] == aspectosEAM[6].opcoes[x]) {
					selecao.previsao[x + 6] = 1;
				}
			}
		}
		$feedbackAI = [];
		$feedbackAI = await getFeedbackAI(selecao);
		console.log($feedbackAI);
		feedbackAI_OA = [];
		feedbackAI_Av = [];
		feedbackAI_MD = [];
		for (let i = 0; i < aspectosEAM[7].aspectos.length - 1; i++) {
			feedbackAI_OA = [...feedbackAI_OA, $feedbackAI.sugestao[i]];
		}
		for (
			let i = aspectosEAM[7].aspectos.length - 1;
			i < aspectosEAM[7].aspectos.length + aspectosEAM[8].aspectos.length - 4;
			i++
		) {
			feedbackAI_Av = [...feedbackAI_Av, $feedbackAI.sugestao[i]];
		}
		for (
			let i = aspectosEAM[7].aspectos.length + aspectosEAM[8].aspectos.length - 4;
			i <
			aspectosEAM[7].aspectos.length +
				aspectosEAM[8].aspectos.length +
				aspectosEAM[9].aspectos.length -
				2;
			i++
		) {
			feedbackAI_MD = [...feedbackAI_MD, $feedbackAI.sugestao[i]];
		}
		showfeedbackAI = true;
	};
</script>

<Button color="blue"
	>Selecione a categoria<ChevronDownOutline
		class="w-6 h-6 ms-2 text-white dark:text-white"
	/></Button
>
<Dropdown>
	{#each categorias as categoriaN1}
		<DropdownItem
			on:click={() => {
				getFBTByCategoryId(categoriaN1);
				showComponentes = true;
				showResultados = false;
				showFeedbacks = false;
			}}>{categoriaN1.name}</DropdownItem
		>
	{/each}
</Dropdown>
<br />
<br />

<br />
<br />
{#if showComponentes}
	{#if showSpinner1}
		<Spinner color="yellow" size={4} />
	{:else}
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Componente curricular
		</h5>
		<!-- <label>
					<input type="checkbox" on:change={toggleAll} />
					<strong>Selecionar todos</strong>
				</label> -->
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
		<Table hover>
			<TableHead>
				<TableHeadCell>COMPCURR</TableHeadCell>
				<TableHeadCell>DOCENTE</TableHeadCell>
				<TableHeadCell>SEMESTRE</TableHeadCell>
				<TableHeadCell>ANO</TableHeadCell>
				<TableHeadCell>X</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each $feedbacksTotal as resultado}
					<!-- {@const subArray = { value: resultado.FB, name: 1 }} -->
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
			color="blue"
			on:click={async () => {
				showComponentes = false;
				showResultados = false;
				$bancoAI = [];
				$AIEAnalise = await getFBAnalysisByFBid(bindGroupFB);
				showResultados = true;
				// handleSelection(bindGroupFB);
			}}>Carregar banco AI</Button
		>
	{/if}
{/if}
<br />
<br />
{#if showResultados}
	<p>Banco AI carregado</p>
	<Button color="blue" on:click={() => (formModal = true)}>Abrir formulário AI</Button>
	<Modal bind:open={formModal} size="md" autoclose={false} class="w-full">
		<form class="flex flex-col space-y-6" action="#">
			<h3 class="mb-4 text-md font-medium text-gray-900 dark:text-white">
				Formulário AI
			</h3>
			<FloatingLabelInput style="filled" name="Ementa" type="text" bind:value={form1}>
				Digite a ementa</FloatingLabelInput
			>
			<FloatingLabelInput style="filled" name="Conteudo" type="text" bind:value={form2}>
				Digite o conteudo</FloatingLabelInput
			>

			<Label class="space-y-2">
				<span>Tipo de conteúdo</span>
				<Select
					placeholder="Escolha uma opção"
					class="mt-2"
					items={tiposConteudos}
					bind:value={form3}
				/>
			</Label>
			<Label class="space-y-2">
				<span>Familiaridade</span>
				<Select placeholder="Escolha uma opção" class="mt-2" items={niveis} bind:value={form4} />
			</Label>
			<Label class="space-y-2">
				<span>Qunatidade</span>
				<Select placeholder="Escolha uma opção" class="mt-2" items={niveis} bind:value={form5} />
			</Label>
			<Label class="space-y-2">
				<span>Abstração</span>
				<Select placeholder="Escolha uma opção" class="mt-2" items={niveis} bind:value={form6} />
			</Label>
			<div class="flex flex-col">
				{#each aspectosEAM[6].opcoes as option}
					<div class="mb-6">
						<input
							id="aspectosEAM"
							type="checkbox"
							placeholder={option}
							bind:group={bindGroupOpMental}
							value={option}
						/>
						<label for="aspectosEAM" class="mb-2">{option}</label>
					</div>
				{/each}
			</div>
			<Button
				color="blue"
				class="w-full1"
				on:click={() => {
					postAI({
						bancoAI: $bancoAI,
						OpMental: bindGroupOpMental,
						previsao: [form1, form2, form3, form4, form5, form6]
					});
					open = !open;
				}}>Enviar</Button
			>
		</form>

		<br />
	</Modal>
{/if}

<br />
{#if showfeedbackAI}
	<h6>Confiabilidade: {$feedbackAI.accuracy - 0.5}%</h6>
	<br />
	<!-- <Table bordered>
		<thead>
			<tr
				>{#each $feedbackAI.previsao as data}
					<th>{data.aspecto}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<tr>
				{#each $feedbackAI.previsao as data}
					<td style="color:{data.valor == 'sim' ? 'green' : 'white'}">{data.valor}</td>
				{/each}
			</tr>
		</tbody>
	</Table> -->
	<br />
	<h5>OBJETOS DE APRENDIZAGEM SUGERIDOS</h5>
	{#each feedbackAI_OA as data}
		{#if data.valor == 'sim'}
			<ul>
				<li>{data.aspecto}</li>
			</ul>
		{/if}
	{/each}
	<br />
	<h5>ITENS DE AVALIAÇÃO SUGERIDOS</h5>
	{#each feedbackAI_Av as data}
		{#if data.valor == 'sim'}
			<ul>
				<li>{data.aspecto}</li>
			</ul>
		{/if}
	{/each}
	<br />
	<h5>METODOLOGIAS DIDÁTICAS SUGERIDAS</h5>
	{#each feedbackAI_MD as data}
		{#if data.valor == 'sim'}
			<ul>
				<li>{data.aspecto}</li>
			</ul>
		{/if}
	{/each}
{/if}
