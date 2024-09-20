<script>
	// import { onMount } from 'svelte';
	// let docHTML = $state();
	// let teste1 = []
	// let contsHTML
	// let texto
	// onMount(() => {
	// 	docHTML = document.createElement('html');

	// texto = contsHTML.cloneNode(true);
	// let conts = contsHTML.split(',');
	// let conteudos = [];
	// console.log(contsHTML)
	// const chapters = docHTML.querySelectorAll(".qtext:not(.conteudo)");
	// console.log(chapters[0].innerHTML)

	// Expected output: 10

	// 	});
	// 	$effect(() => {
	// 		docHTML.innerHTML = html;
	// 		contsHTML = docHTML.getElementsByClassName('formulation clearfix').item(0)
	//         texto.appendChild(contsHTML)
	// 	});
	// 	let html =
	//      `<div id="question-23-1" >
	// 	<div class="info">
	// 		<h3 class="no">Questão <span class="qno">1</span></h3>
	// 		<div class="state">Correto</div>
	// 		<div class="grade">Atingiu 1,00 de 1,00</div>
	// 		<div class="questionflag">
	// 			<img
	// 				src="http://localhost/moodle/theme/image.php/boost/core/1721259061/i/unflagged"
	// 				alt=""
	// 				class="questionflagimage"
	// 			/><span>Marcar questão</span>
	// 		</div>
	// 		<span class="badge bg-primary text-light">v12 (mais recente)</span>
	// 	</div>
	// 	<div class="content">
	// 		<div class="formulation clearfix">
	// 			<h4 class="accesshide">Texto da questão</h4>
	// 			<input type="hidden" name="q23:1_:sequencecheck" value="3" />
	//                 <div class="qtext">
	//                     <p class="conteudo" style="display: none;">41</p>
	//                     <p>dasdasdasdasdasdas</p>
	//                     <p>das</p>
	//                 </div>
	// 			<fieldset>
	// 				<legend class="prompt h6 font-weight-normal sr-only"
	// 					><span class="sr-only">Questão 1</span> Resposta</legend
	// 				>
	// 				<div class="answer">
	// 					<div class="r0">
	// 						<input
	// 							type="radio"
	// 							name="q23:1_answer"
	// 							disabled="disabled"
	// 							value="0"
	// 							id="q23:1_answer0"
	// 							aria-labelledby="q23:1_answer0_label"
	// 						/>
	// 						<div class="d-flex w-auto" id="q23:1_answer0_label" data-region="answer-label">
	// 							<span class="answernumber">a. </span>
	// 							<div class="flex-fill ml-1"><p>3</p></div>
	// 						</div>
	// 					</div>
	// 					<div class="r1 correct">
	// 						<input
	// 							type="radio"
	// 							name="q23:1_answer"
	// 							disabled="disabled"
	// 							value="1"
	// 							id="q23:1_answer1"
	// 							aria-labelledby="q23:1_answer1_label"
	// 							checked="checked"
	// 						/>
	// 						<div class="d-flex w-auto" id="q23:1_answer1_label" data-region="answer-label">
	// 							<span class="answernumber">b. </span>
	// 							<div class="flex-fill ml-1"><p>2</p></div>
	// 						</div>
	// 						<span class="ml-1"
	// 							><i
	// 								class="icon fa fa-check text-success fa-fw"
	// 								title="Correto"
	// 								role="img"
	// 								aria-label="Correto"
	// 							></i></span
	// 						>
	// 					</div>
	// 					<div class="r0">
	// 						<input
	// 							type="radio"
	// 							name="q23:1_answer"
	// 							disabled="disabled"
	// 							value="2"
	// 							id="q23:1_answer2"
	// 							aria-labelledby="q23:1_answer2_label"
	// 						/>
	// 						<div class="d-flex w-auto" id="q23:1_answer2_label" data-region="answer-label">
	// 							<span class="answernumber">c. </span>
	// 							<div class="flex-fill ml-1"><p>6</p></div>
	// 						</div>
	// 					</div>
	// 					<div class="r1">
	// 						<input
	// 							type="radio"
	// 							name="q23:1_answer"
	// 							disabled="disabled"
	// 							value="3"
	// 							id="q23:1_answer3"
	// 							aria-labelledby="q23:1_answer3_label"
	// 						/>
	// 						<div class="d-flex w-auto" id="q23:1_answer3_label" data-region="answer-label">
	// 							<span class="answernumber">d. </span>
	// 							<div class="flex-fill ml-1"><p>5</p></div>
	// 						</div>
	// 					</div>
	// 					<div class="r0">
	// 						<input
	// 							type="radio"
	// 							name="q23:1_answer"
	// 							disabled="disabled"
	// 							value="4"
	// 							id="q23:1_answer4"
	// 							aria-labelledby="q23:1_answer4_label"
	// 						/>
	// 						<div class="d-flex w-auto" id="q23:1_answer4_label" data-region="answer-label">
	// 							<span class="answernumber">e. </span>
	// 							<div class="flex-fill ml-1"><p>4</p></div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</fieldset>
	// 		</div>
	// 		<div class="outcome clearfix">
	// 			<h4 class="accesshide">Feedback</h4>
	// 			<div class="feedback">
	// 				<div class="specificfeedback"><p>Sua resposta está correta.</p></div>
	// 				<div class="rightanswer">A resposta correta é: 2</div>
	// 			</div>
	// 		</div>
	// 		<div class="comment clearfix">
	// 			<h4 class="accesshide">Comentários</h4>
	// 			<div class="commentlink">
	// 				<a
	// 					href="http://localhost/moodle/mod/quiz/comment.php?attempt=20&slot=1"
	// 					id="action_link669ac04e72cf61"
	// 					class="">Faça um comentário ou modifique a avaliação</a
	// 				>
	// 			</div>
	// 		</div>
	// 		<div class="history clearfix border p-2">
	// 			<h4 class="responsehistoryheader">Histórico de respostas</h4>
	// 			<div class="responsehistoryheader">
	// 				<div class="table-responsive">
	// 					<table class="generaltable">
	// 						<thead>
	// 							<tr>
	// 								<th class="header c0" style="" scope="col">Passo</th>
	// 								<th class="header c1" style="" scope="col">Hora</th>
	// 								<th class="header c2" style="" scope="col">Ação</th>
	// 								<th class="header c3" style="" scope="col">Estado</th>
	// 								<th class="header c4 lastcol" style="" scope="col">Pontos</th>
	// 							</tr>
	// 						</thead>
	// 						<tbody
	// 							><tr class="">
	// 								<td class="cell c0" style=""
	// 									><a
	// 										href="http://localhost/moodle/mod/quiz/reviewquestion.php?attempt=20&slot=1&step=0"
	// 										id="action_link669ac04e72cf62"
	// 										class=""
	// 										title="Revisão da resposta">1</a
	// 									></td
	// 								>
	// 								<td class="cell c1" style="">18/07/24, 17:38:59</td>
	// 								<td class="cell c2" style="">Iniciada</td>
	// 								<td class="cell c3" style="">Ainda não respondida</td>
	// 								<td class="cell c4 lastcol" style=""></td>
	// 							</tr>
	// 							<tr class="">
	// 								<td class="cell c0" style=""
	// 									><a
	// 										href="http://localhost/moodle/mod/quiz/reviewquestion.php?attempt=20&slot=1&step=1"
	// 										id="action_link669ac04e72cf63"
	// 										class=""
	// 										title="Revisão da resposta">2</a
	// 									></td
	// 								>
	// 								<td class="cell c1" style="">18/07/24, 17:39:04</td>
	// 								<td class="cell c2" style="">Salvou: 2 </td>
	// 								<td class="cell c3" style="">Resposta salva</td>
	// 								<td class="cell c4 lastcol" style=""></td>
	// 							</tr>
	// 							<tr class="current lastrow">
	// 								<td class="cell c0" style="">3</td>
	// 								<td class="cell c1" style="">18/07/24, 17:39:14</td>
	// 								<td class="cell c2" style="">Tentativa finalizada</td>
	// 								<td class="cell c3" style="">Correto</td>
	// 								<td class="cell c4 lastcol" style="">1,00</td>
	// 							</tr>
	// 						</tbody>
	// 					</table>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>`;
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

	// now with tree-shaking
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

	const labelRight = {
		position: 'right'
	};
	let options = $state({
		title: {
			text: 'Resultado AIE'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
				// 	label: {
				// 		backgroundColor: '#6a7985'
			}
			// }
		},
		// legend: {
		// 	data: ['5', '6', '7']
		// },
		// grid: {
		// 	left: '3%',
		// 	right: '4%',
		// 	bottom: '3%',
		// 	containLabel: true
		// },
		grid: {
			top: 80,
			bottom: 30
		},
		// toolbox: {
		// 	feature: {
		// 		saveAsImage: {}
		// 	}
		// },
		xAxis: {
			type: 'value',
			position: 'top',
			// boundaryGap: '10',
			// data: ['q1', 'q2', 'q3']
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
			data: ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
		},
		series: [
			{
				name: 'Cost',
				type: 'bar',
				stack: 'Total',
				label: {
					show: true,
					formatter: '{b}'
				},
				data: [
					{ value: -0.07, label: labelRight },
					{ value: -0.09, label: labelRight },
					0.2,
					0.44,
					{ value: -0.23, label: labelRight },
					0.08,
					{ value: -0.17, label: labelRight },
					0.47,
					{ value: -0.36, label: labelRight },
					0.18
				]
			}
		]
	});
</script>

<!-- <div class="flex justify-start">
	<div class="h-56 grid grid-cols-3 gap-4 content-start" bind:this={texto}> 
</div>
</div> -->
<div class="app">
	<Chart {init} {options} />
</div>

<style>
	.app {
		width: 100vw;
		height: 100vh;
	}
</style>
