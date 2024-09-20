<script>
	import { onMount } from 'svelte';

	import {
		Spinner,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Table,
		Input,
		Button,
		Card,
		CardBody,
		Form,
		FormGroup,
		Modal
	} from '@sveltestrap/sveltestrap';

	import {
		disciplinasFiltradaCategoriaSelecionada,
		AIEAnalise,
		feedbacksTotal,
		bancoAI,
		feedbackAI
	} from '$stores/geral.js';

	// import { CSVDownloader } from 'svelte-csv';

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
		{
			aspectos: 'OPERAÇÕES MENTAIS',
			opcoes: [
				'Identificação',
				'Comparação',
				'Análise',
				'Síntese',
				'Classificação',
				'Diferenciação',
				'Codificação',
				'Decodificação',
				'Projeção de relações virtuais',
				'Representação mental',
				'Transformação mental',
				'Raciocínio divergente',
				'Raciocínio lógico',
				'Raciocínio hipotético',
				'Raciocínio inferencial',
				'Raciocínio transitivo',
				'Raciocínio analógico',
				'Raciocínio progressivo',
				'Raciocínio silogístico'
			],
			valores: []
		},
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
				'Game',
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
	let aspectosFeedbackAI = [
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
		'Lista de exercícios',
		'Discursivo',
		'Dissertativo',
		'Única escolha',
		'Múltipla escolha',
		'Sequência',
		'Combinação',
		'AB Projeto',
		'AB Problema',
		'AB Equipe',
		'Discussão dirigida',
		'Sala de Aula invertida',
		'Aprendizagem entre pares',
		'Game',
		'Estudo de caso',
		'Storytelling',
		'Seminário',
		'Rotação por estações',
		'Coaprendizagem',
		'Teoria e Prática'
	];
	let FBTs = [];
	let eamResultados = [];
	let opcoes = [];
	let showfeedbackAI = false;

	onMount(() => {
		getCategories();
	});

	function toggleAll() {
		checked = !checked;
	}
	let open = false;
	let fullscreen = false;
	const toggle = () => {
		fullscreen = true;
		open = !open;
	};
	let previsaoEAM = [
		0, 0, 1, 2, 3, 3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
	];

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

	const getFBAnalysisByFBid = async (fbSelecionado) => {
		showResultados = false;
		$bancoAI = [];
		for (let i = 0; i < fbSelecionado.length; i++) {
			const response = await fetch('/api/moodle/getFBAnalysisByFBid', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(fbSelecionado[i])
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
		for (let i = 0; i < responseJSON.previsao[0].length; i++) {
			let obj = {
				aspecto: aspectosFeedbackAI[i],
				valor: responseJSON.previsao[0][i] == 0 ? 'não' : 'sim'
			};
			resposta = [...resposta, obj];
		}
		let obj = {
			previsao: resposta,
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
	const handleSelection = async (item) => {
		showResultados = false;
		$AIEAnalise = await getFBAnalysisByFBid(item);
		showResultados = true;
	};
	const postAI = async (item) => {
		item.previsao[0] = 0;
		item.previsao[1] = 0;
		item.previsao[6] = 0;
		item.previsao[7] = 0;
		item.previsao[8] = 0;
		item.previsao[9] = 0;
		item.previsao[10] = 0;
		item.previsao[11] = 0;
		item.previsao[12] = 0;
		item.previsao[13] = 0;
		item.previsao[14] = 0;
		item.previsao[15] = 0;
		item.previsao[16] = 0;
		item.previsao[17] = 0;
		item.previsao[18] = 0;
		item.previsao[19] = 0;
		item.previsao[20] = 0;
		item.previsao[21] = 0;
		item.previsao[22] = 0;
		item.previsao[23] = 0;
		item.previsao[24] = 0;

		if (item.previsao[2] == 'Conceitual') {
			item.previsao[2] = 1;
		}
		if (item.previsao[2] == 'Procedimental') {
			item.previsao[2] = 2;
		}
		if (item.previsao[2] == 'Atitudinal') {
			item.previsao[2] = 3;
		}
		if (item.previsao[3] == 'Baixa') {
			item.previsao[3] = 1;
		}
		if (item.previsao[3] == 'Média') {
			item.previsao[3] = 2;
		}
		if (item.previsao[3] == 'Alta') {
			item.previsao[3] = 3;
		}
		if (item.previsao[4] == 'Baixa') {
			item.previsao[4] = 1;
		}
		if (item.previsao[4] == 'Média') {
			item.previsao[4] = 2;
		}
		if (item.previsao[4] == 'Alta') {
			item.previsao[4] = 3;
		}
		if (item.previsao[5] == 'Baixa') {
			item.previsao[5] = 1;
		}
		if (item.previsao[5] == 'Média') {
			item.previsao[5] = 2;
		}
		if (item.previsao[5] == 'Alta') {
			item.previsao[5] = 3;
		}

		if (item.previsao[5] == 'Alta') {
			item.previsao[5] = 3;
		}

		for (let x = 0; x < item.OpMental.length; x++) {
			if (item.OpMental[x] == 'Identificação') {
				item.previsao[6] = 1;
			}
			if (item.OpMental[x] == 'Comparação') {
				item.previsao[7] = 1;
			}
			if (item.OpMental[x] == 'Análise') {
				item.previsao[8] = 1;
			}
			if (item.OpMental[x] == 'Síntese') {
				item.previsao[9] = 1;
			}
			if (item.OpMental[x] == 'Classificação') {
				item.previsao[10] = 1;
			}
			if (item.OpMental[x] == 'Diferenciação') {
				item.previsao[11] = 1;
			}
			if (item.OpMental[x] == 'Codificação') {
				item.previsao[12] = 1;
			}
			if (item.OpMental[x] == 'Decodificação') {
				item.previsao[13] = 1;
			}
			if (item.OpMental[x] == 'Projeção de relações virtuais') {
				item.previsao[14] = 1;
			}
			if (item.OpMental[x] == 'Representação mental') {
				item.previsao[15] = 1;
			}
			if (item.OpMental[x] == 'Transformação mental') {
				item.previsao[16] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio divergente') {
				item.previsao[17] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio lógico') {
				item.previsao[18] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio hipotético') {
				item.previsao[19] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio inferencial') {
				item.previsao[20] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio transitivo') {
				item.previsao[21] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio analógico') {
				item.previsao[22] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio progressivo') {
				item.previsao[23] = 1;
			}
			if (item.OpMental[x] == 'Raciocínio silogístico') {
				item.previsao[24] = 1;
			}
		}
		// console.log(item);
		$feedbackAI = await getFeedbackAI(item);

		showfeedbackAI = true;
		console.log($feedbackAI);
	};
	let form1;
	let form2;
	let form3;
	let form4;
	let form5;
	let form6;
</script>

<Dropdown>
	<DropdownToggle color="primary" caret>Selecione a categoria</DropdownToggle>
	<DropdownMenu>
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
	</DropdownMenu>
</Dropdown>
<br />
<br />

<br />
<br />
{#if showComponentes}
	{#if showSpinner1}
		<Spinner color="yellow" size={4} />
	{:else}
		Componente Curricular
		<label>
			<input type="checkbox" on:change={toggleAll} />
			<strong>All</strong>
		</label>
		<Input
			bsSize="sm"
			type="text"
			bind:value={inputValue1}
			on:input={filtrarCC}
			placeholder="digite para filtrar"
		/>
		<br />
		Docente
		<Input
			bsSize="sm"
			type="text"
			bind:value={inputValue2}
			on:input={filtrarDocente}
			placeholder="digite para filtrar"
		/>
		<br />
		Semestre
		<Input
			bsSize="sm"
			type="text"
			bind:value={inputValue3}
			on:input={filtrarSemestre}
			placeholder="digite para filtrar"
		/>
		<br />
		Ano
		<Input
			bsSize="sm"
			type="text"
			bind:value={inputValue4}
			on:input={filtrarAno}
			placeholder="digite para filtrar"
		/>
		<br />
		<Table hover>
			<thead>
				<tr>
					<th>COMPCURR</th>
					<th>DOCENTE</th>
					<th>SEMESTRE</th>
					<th>ANO</th>
					<th>X</th>
				</tr>
			</thead>
			<tbody>
				{#each $feedbacksTotal as resultado}
					<tr>
						<td>{resultado.cc}</td>
						<td>{resultado.docente}</td>
						<td>{resultado.semestre}</td>
						<td>{resultado.ano}</td>
						<td>
							<input type="checkbox" bind:checked bind:group={bindGroupFB} value={resultado.FB} />
						</td>
					</tr>
				{/each}
			</tbody>
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
<!-- {#if showResultados} -->
<p>Banco AI carregado</p>
<div>
	<Button color="danger" on:click={toggle}>Abrir formulário AI</Button>
	<Modal body header="Formulário AI" isOpen={open} {fullscreen} {toggle}>
		<Form>
			<Card>
				<CardBody class="mb-3">
					<FormGroup floating label="Ementa">
						<Input name="Ementa" type="text" placeholder="Enter a value" bind:value={form1} />
					</FormGroup>
					<FormGroup floating label="Conteúdo programático">
						<Input name="Conteudo" type="text" placeholder="Enter a value" bind:value={form2} />
					</FormGroup>
				</CardBody>
			</Card>
			<Card>
				<CardBody class="mb-3">
					<div class="numeroForm">
						<FormGroup floating label="Tipo">
							<Input
								name="Tipo"
								type="select"
								placeholder="Enter a value"
								class="inputNumero"
								bind:value={form3}
							>
								{#each ['Conceitual', 'Procedimental', 'Atitudinal'] as option}
									<option>{option}</option>
								{/each}
							</Input>
						</FormGroup>
						<FormGroup floating label="Familiaridade">
							<Input
								name="Familiaridade"
								type="select"
								placeholder="Enter a value"
								class="inputNumero"
								bind:value={form4}
							>
								{#each ['Baixa', 'Média', 'Alta'] as option}
									<option>{option}</option>
								{/each}
							</Input>
						</FormGroup>
						<FormGroup floating label="Quantidade">
							<Input
								name="Quantidade"
								type="select"
								placeholder="Enter a value"
								class="inputNumero"
								bind:value={form5}
							>
								{#each ['Baixa', 'Média', 'Alta'] as option}
									<option>{option}</option>
								{/each}
							</Input>
						</FormGroup>
						<FormGroup floating label="Abstração">
							<Input
								name="Abstracao"
								type="select"
								placeholder="Enter a value"
								class="inputNumero"
								bind:value={form6}
							>
								{#each ['Baixa', 'Média', 'Alta'] as option}
									<option>{option}</option>
								{/each}
							</Input>
						</FormGroup>
					</div>
				</CardBody>
			</Card>
			<Card>
				<CardBody class="mb-3">
					{#each ['Identificação', 'Comparação', 'Análise', 'Síntese', 'Classificação', 'Diferenciação', 'Codificação', 'Decodificação', 'Projeção de relações virtuais', 'Representação mental', 'Transformação mental', 'Raciocínio divergente', 'Raciocínio lógico', 'Raciocínio hipotético', 'Raciocínio inferencial', 'Raciocínio transitivo', 'Raciocínio analógico', 'Raciocínio progressivo', 'Raciocínio silogístico'] as option}
						<input
							type="checkbox"
							placeholder="Enter a value"
							value={option}
							bind:group={bindGroupOpMental}
						/>
						{option}<br />
					{/each}
					<br />
					<Button
						color="primary"
						on:click={() => {
							postAI({
								bancoAI: $bancoAI,
								OpMental: bindGroupOpMental,
								previsao: [form1, form2, form3, form4, form5, form6]
							});
							open = !open;
						}}>Enviar</Button
					>
				</CardBody>
			</Card>
		</Form>
	</Modal>
</div>
<!-- {/if} -->

<br />
{#if showfeedbackAI}
	<h6>Confiabilidade: {$feedbackAI.accuracy - 2}%</h6>
	<br />
	<Table bordered responsive>
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
					<td>{data.valor}</td>
				{/each}
			</tr>
		</tbody>
	</Table>
{/if}

<style>
	.numeroForm {
		display: flex;
		justify-content: space-around;
	}
	:global(.inputNumero) {
		width: 10rem;
	}
</style>
