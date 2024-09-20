// @ts-nocheck
import { MOODLE_BASE_URL, WSTOKEN_MOODLE, PROXY_AGENT } from "$env/static/private"
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { error, json } from "@sveltejs/kit"

const funcoesCognitivas = [
    {
        id: 'fco01',
        fase: 'entrada',
        nome: 'Percepção clara e precisa'
    },
    {
        id: 'fco02',
        fase: 'entrada',
        nome: 'Comportamento exploratório sistemático'
    },
    {
        id: 'fco03',
        fase: 'entrada',
        nome: 'Uso de vocabulário, conceitos apropriados'
    },
    {
        id: 'fco04',
        fase: 'entrada',
        nome: 'Orientação espacial eficiente'
    },
    {
        id: 'fco05',
        fase: 'entrada',
        nome: 'Orientação temporal eficiente'
    },
    {
        id: 'fco06',
        fase: 'entrada',
        nome: 'Constatação da constância e permanência do objeto'
    },
    {
        id: 'fco07',
        fase: 'entrada',
        nome: 'Resumo de dados com precisão e exatidão'
    },
    {
        id: 'fco08',
        fase: 'entrada',
        nome: 'Consideração de duas ou mais fontes de informação simultâneas'
    },
    {
        id: 'fco09',
        fase: 'elaboracao',
        nome: 'Percepção do problema para defini-lo com clareza'
    },
    {
        id: 'fco10',
        fase: 'elaboracao',
        nome: 'Facilidade para distinguir dados relevantes dos irrelevantes'
    },
    {
        id: 'fco11',
        fase: 'elaboracao',
        nome: 'Exercício da conduta comparativa'
    },
    {
        id: 'fco12',
        fase: 'elaboracao',
        nome: 'Amplitude do campo mental'
    },
    {
        id: 'fco13',
        fase: 'elaboracao',
        nome: 'Percepção global da realidade'
    },
    {
        id: 'fco14',
        fase: 'elaboracao',
        nome: 'Uso do raciocínio lógico'
    },
    {
        id: 'fco15',
        fase: 'elaboracao',
        nome: 'Interiorização do próprio comportamento'
    },
    {
        id: 'fco16',
        fase: 'elaboracao',
        nome: 'Estabelecimento de estratégias para verificar hipóteses'
    },
    {
        id: 'fco17',
        fase: 'elaboracao',
        nome: 'Exercício do pensamento hipotético inferencial'
    },
    {
        id: 'fc18',
        fase: 'elaboracao',
        nome: 'Comportamento planejado'
    },
    {
        id: 'fc19',
        fase: 'elaboracao',
        nome: 'Elaboração de categorias cognitivas'
    },
    {
        id: 'fc20',
        fase: 'elaboracao',
        nome: 'Uso da conduta somativa'
    },
    {
        id: 'fc21',
        fase: 'elaboracao',
        nome: 'Facilidade para estabelecer relações virtuais'
    },
    {
        id: 'fc22',
        fase: 'saída',
        nome: 'Comunicação descentralizada'
    },
    {
        id: 'fc23',
        fase: 'saída',
        nome: 'Projeção de relações virtuais'
    },
    {
        id: 'fc24',
        fase: 'saída',
        nome: 'Expressão sem bloqueios na comunicação das respostas'
    },
    {
        id: 'fc25',
        fase: 'saída',
        nome: 'Expressão de respostas certas, sem ensaio e erro'
    },
    {
        id: 'fc26',
        fase: 'saída',
        nome: 'Uso de instrumentos verbais adequados'
    },
    {
        id: 'fc27',
        fase: 'saída',
        nome: 'Precisão e exatidão na comunicação de respostas'
    },
    {
        id: 'fc28',
        fase: 'saída',
        nome: 'Eficácia no transporte visual'
    },
    {
        id: 'fc29',
        fase: 'saída',
        nome: 'Conduta controlada, não impulsiva'
    }
]
export const GET = async ({ }) => {
        
        return json(funcoesCognitivas)
    
} 
