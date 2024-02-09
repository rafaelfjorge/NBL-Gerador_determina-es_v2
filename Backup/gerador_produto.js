document.addEventListener('DOMContentLoaded', function () {
    var combinacoes;
    

       
    document.querySelector('#gerar_combinacoes').addEventListener('click', function () {
        // Obter valores dos inputs
        var cfops = document.querySelector('#cfops').value.split(/[,\|]+/);
        var cod_do_item = document.querySelector('#cod_do_item').value.split(/[,\|]+/);
        var estados_emissor = document.querySelector('#estado_emissor').value.split(/[,\|]+/);
        var estados_destinatario = document.querySelector('#estado_destinatario').value.split(/[,\|]+/);
        var regime_emissor = document.querySelector('#regime_emissor').value.split(/[,\|]+/);
        var regime_destinatario = document.querySelector('#regime_destinatario').value.split(/[,\|]+/);
        var linha_emissor = document.querySelector('#linha_emissor').value.split(/[,\|]+/);
        var linha_destinatario = document.querySelector('#linha_destinatario').value.split(/[,\|]+/);
        var abreviacao_nome_empresa = document.querySelector('#abreviacao_nome_empresa').value;

        // Validar campos
        var campos = [
            { nome: 'CFOPs', valor: cfops },
            { nome: 'Estado Emissor', valor: estados_emissor },
            { nome: 'Regime Emissor', valor: regime_emissor },
            { nome: 'Linha Emissor', valor: linha_emissor },
            { nome: 'Estado Destinatário', valor: estados_destinatario },
            { nome: 'Regime Destinatário', valor: regime_destinatario },
            { nome: 'Linha Destinatário', valor: linha_destinatario }
        ];

        for (let i = 0; i < campos.length; i++) {
            if (campos[i].valor.some(valor => valor === '')) {
                console.error(`O campo ${campos[i].nome} não pode estar vazio.`);
                return;
            }
        }

        if (abreviacao_nome_empresa === '') {
            console.error('O campo Abreviação Nome Empresa não pode estar vazio.');
            return;
        }

        // Gerar combinações
        combinacoes = cartesianProduct([estados_emissor, estados_destinatario, cfops, cod_do_item, regime_emissor, regime_destinatario, linha_emissor, linha_destinatario]);

        // Atualizar valor do input 'resultado'
        document.querySelector('#resultado').value = combinacoes.length;

        // Limpar tabela anterior
        const table = document.querySelector('#resultadoTabela');
        table.innerHTML = '';

        // Adicionar cabeçalho da tabela
        const cabecalho = "InternalId;Estado Emissor;Estado Destinatario;CFOP;Codigo do Item;Regime Emissor;Regime Destinatario;Linha Emissor;Linha Destinatario";
        const cabecalhoItens = cabecalho.split(';');
        let tableHeader = '<thead><tr>';
        for (let i = 0; i < cabecalhoItens.length; i++) {
            tableHeader += '<th>' + cabecalhoItens[i] + '</th>';
        }
        tableHeader += '</tr></thead>';
        table.innerHTML = tableHeader;

        // Adicionar conteúdo da tabela
        let tableBody = '<tbody>';
        for (let i = 0; i < combinacoes.length; i++) {
            const abreviacao_incrementada = abreviacao_nome_empresa + "-" + (i + 1);
            tableBody += '<tr>';
            tableBody += '<td>' + abreviacao_incrementada + '</td>'; // Adicionar a coluna 'Abreviação Nome Empresa'
            for (let j = 0; j < combinacoes[i].length; j++) {
                tableBody += '<td>' + combinacoes[i][j] + '</td>';
            }
            tableBody += '</tr>';
        }
        tableBody += '</tbody>';
        table.innerHTML += tableBody;
    });


    document.querySelector('#exportar_csv').addEventListener('click', function () {
        var csvContent = "ExternalId;Nome Da Regra;Estado Emissor;Estado Destinatario;CFOP;Codigo do Item;Regime Emissor;Regime Destinatario;Linha Emissor;Linha Destinatario\n";

        for (var i = 0; i < combinacoes.length; i++) {
            var abreviacao_incrementada = abreviacao_nome_empresa + "-" + (i + 1);
            var concate = combinacoes[i][0] + " > " + combinacoes[i][1] + " | " + combinacoes[i][3] + " & " + combinacoes[i][4];
            csvContent += abreviacao_incrementada + ";" + concate + ";" + combinacoes[i].join(';') + "\n";
        }

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'combinacoes.csv');
    });

    function cartesianProduct(arrays) {
        return arrays.reduce(function (a, b) {
            const result = [];
            a.forEach(function (x) {
                b.forEach(function (y) {
                    result.push(x.concat([y]));
                });
            });
            return result;
        }, [[]]);
    }

    document.querySelector('#limpar_resultados').addEventListener('click', function () {
        document.querySelector('#resultadoTabela').innerHTML = '';
        var resultadosGeral = document.querySelector('#resultado');
        resultadosGeral.value = '';
    });
});
