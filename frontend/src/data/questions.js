const questions = {
    futebol: [
        {
            id: 'fut-1',
            text: 'Qual país sediou a Copa do Mundo de 2014?',
            options: ['Brasil', 'Alemanha', 'Espanha', 'Itália'],
            answer: 'Brasil',
        },
        {
            id: 'fut-2',
            text: 'Quantas vezes o Brasil ganhou a Copa do Mundo?',
            options: ['3', '4', '5', '6'],
            answer: '5',
        },
        // Adicione mais perguntas de futebol
    ],
    historia: [
        {
            id: 'his-1',
            text: 'Em que ano ocorreu a Queda do Muro de Berlim?',
            options: ['1989', '1991', '1985', '2000'],
            answer: '1989',
        },
        {
            id: 'his-2',
            text: 'Quem foi o primeiro presidente do Brasil?',
            options: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Marechal Deodoro da Fonseca', 'Dom Pedro II'],
            answer: 'Marechal Deodoro da Fonseca',
        },
        // Adicione mais perguntas de história
    ],
    geografia: [
        {
            id: 'geo-1',
            text: 'Qual é a capital da Austrália?',
            options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
            answer: 'Canberra',
        },
        {
            id: 'geo-2',
            text: 'Qual é o rio mais longo do mundo?',
            options: ['Rio Amazonas', 'Rio Nilo', 'Rio Yangtzé', 'Rio Mississipi'],
            answer: 'Rio Nilo',
        },
        // Adicione mais perguntas de geografia
    ],
    sistemasDistribuidos: [
        {
            id: 'sd-1',
            text: 'Qual dos seguintes NÃO é um tipo comum de arquitetura de sistema distribuído?',
            options: ['Cliente-Servidor', 'Peer-to-Peer', 'Monolítica', 'Baseada em Microsserviços'],
            answer: 'Monolítica',
        },
        {
            id: 'sd-2',
            text: 'O que é consistência eventual em sistemas distribuídos?',
            options: [
            'Todos os nós veem a mesma informação ao mesmo tempo.',
            'As atualizações se propagam imediatamente para todos os nós.',
            'Com o tempo, todas as réplicas devem convergir para o mesmo valor.',
            'Garante o isolamento total durante as transações.',
            ],
            answer: 'Com o tempo, todas as réplicas devem convergir para o mesmo valor.',
        },
        // Adicione mais perguntas de sistemas distribuídos
    ],
    protocolosConexao: [
        {
            id: 'pc-1',
            text: 'Qual protocolo é comumente usado para comunicação em tempo real e bidirecional na web?',
            options: ['HTTP', 'TCP', 'UDP', 'WebSocket'],
            answer: 'WebSocket',
        },
        {
            id: 'pc-2',
            text: 'Qual protocolo da camada de transporte fornece comunicação confiável e orientada à conexão?',
            options: ['IP', 'TCP', 'UDP', 'ARP'],
            answer: 'TCP',
        },
        // Adicione mais perguntas de protocolos de conexão
    ],
    curiosidades: [
        {
            id: 'cur-1',
            text: 'Qual é o nome do animal nacional da Austrália?',
            options: ['Canguru', 'Coala', 'Emu', 'Diabo da Tasmânia'],
            answer: 'Canguru',
        },
        {
            id: 'cur-2',
            text: 'Qual é a menor cidade do mundo por área?',
            options: ['Vaticano', 'Mônaco', 'Nauru', 'Hum (Croácia)'],
            answer: 'Vaticano',
        },
        // Adicione mais perguntas de curiosidades
    ],
};
  
export default questions;