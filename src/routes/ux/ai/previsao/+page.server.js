/** @type {import('./$types').Actions} */
export const actions = {
    cadastro: async ({ request }) => {
        const formData = await request.formData();
        let bancoAI = formData.get('bdai');
       let teste1 = JSON.parse(bancoAI)
        let Ementa = formData.get('Ementa');
        let Conteudo = formData.get('Conteudo');
        const Tipo = formData.get('Tipo');
        const Familiaridade = formData.get('Familiaridade');
        const Quantidade = formData.get('Quantidade');
        const Abstracao = formData.get('Abstracao');
        const Identificacao = +formData.get('Identificação');
        const Comparacao = +formData.get('Comparação');
        const Analise = +formData.get('Análise');
        const Sintese = +formData.get('Síntese');
        const Classificacao = +formData.get('Classificação');
        const Diferenciacao = +formData.get('Diferenciação');
        const Codificacao = +formData.get('Codificação');
        const Decodificacao = +formData.get('Decodificação');
        const ProjecaoVirtual = +formData.get('Projeção de relações virtuais');
        const Representacao = +formData.get('Representação mental');
        const Transformacao = +formData.get('Transformação mental');
        const Divergente = +formData.get('Raciocínio divergente');
        const Logico = +formData.get('Raciocínio lógico');
        const Hipotetico = +formData.get('Raciocínio hipotético');
        const Inferencial = +formData.get('Raciocínio inferencial');
        const Transitivo = +formData.get('Raciocínio transitivo');
        const Analogico = +formData.get('Raciocínio analógico');
        const Progressivo = +formData.get('Raciocínio progressivo');
        const Silogistico = +formData.get('Raciocínio silogístico');

console.log(teste1)
        let Conceitual = 0
        let Procedimental = 0
        let Atitudinal = 0
        let FamiliaridadeBaixa = 0
        let FamiliaridadeMedia = 0
        let FamiliaridadeAlta = 0
        let QuantidadeBaixa = 0
        let QuantidadeMedia = 0
        let QuantidadeAlta = 0
        let AbstracaoBaixa = 0
        let AbstracaoMedia = 0
        let AbstracaoAlta = 0

        if (Tipo == 'Conceitual') {
            Conceitual = 1
        }
        if (Tipo == 'Procedimental') {
            Procedimental = 1
        }
        if (Tipo == 'Atitudinal') {
            Atitudinal = 1
        }
        if (Familiaridade == 'Baixa') {
            FamiliaridadeBaixa = 1
        }
        if (Familiaridade == 'Media') {
            FamiliaridadeMedia = 1
        }
        if (Familiaridade == 'Alta') {
            FamiliaridadeAlta = 1
        }
        if (Abstracao == 'Baixa') {
            AbstracaoBaixa = 1
        }
        if (Abstracao == 'Media') {
            AbstracaoMedia = 1
        }
        if (Abstracao == 'Alta') {
            AbstracaoAlta = 1
        }
        if (Quantidade == 'Baixa') {
            QuantidadeBaixa = 1
        }
        if (Quantidade == 'Media') {
            QuantidadeMedia = 1
        }
        if (Quantidade == 'Alta') {
            QuantidadeAlta = 1
        }

        Ementa = 0
        Conteudo = 0

        const dataAI = {
            bancoAI: bancoAI, 
            previsao: [
                Ementa,
                Conteudo,
                Conceitual,
                Procedimental,
                Atitudinal,
                FamiliaridadeBaixa,
                FamiliaridadeMedia,
                FamiliaridadeAlta,
                QuantidadeBaixa,
                QuantidadeMedia,
                QuantidadeAlta,
                AbstracaoBaixa,
                AbstracaoMedia,
                AbstracaoAlta,
                Identificacao,
                Comparacao,
                Analise,
                Sintese,
                Classificacao,
                Diferenciacao,
                Codificacao,
                Decodificacao,
                ProjecaoVirtual,
                Representacao,
                Transformacao,
                Divergente,
                Logico,
                Hipotetico,
                Inferencial,
                Transitivo,
                Analogico,
                Progressivo,
                Silogistico]
        }

        console.log(dataAI)
        const response = await fetch('http://localhost:3000/ai', {
            method: "POST",
            body: JSON.stringify({'dataAI': dataAI}),
            headers: { "Content-type": "application/json" }
        })
        // const response = { "msg": 'ok' }

        if (response.ok) {
            const responseJSON = await response.json()
            // console.log(responseJSON)
            return { success: true, responseJSON }
        }
        // return { success: true }

    }
};