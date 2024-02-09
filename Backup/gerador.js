document.addEventListener('DOMContentLoaded', function () {
    var combinacoes;
    var entradaCheckbox = document.getElementById('entrada_produto_check');
    var saidaCheckbox = document.getElementById('saida_produto_check');

    document.querySelector('#gerar_combinacoes').addEventListener('click', function () {
        const cfops = document.querySelector('#cfops').value.split(/[,\|]+/);
        const cod_do_item = document.querySelector('#cod_do_item').value.split(/[,\|]+/);
        const estados_emissor = document.querySelector('#estado_emissor').value.split(/[,\|]+/);
        const estados_destinatario = document.querySelector('#estado_destinatario').value.split(/[,\|]+/);
        const regime_emissor = document.querySelector('#regime_emissor').value.split(/[,\|]+/);
        const regime_destinatario = document.querySelector('#regime_destinatario').value.split(/[,\|]+/);
        const linha_emissor = document.querySelector('#linha_emissor').value.split(/[,\|]+/);
        const linha_destinatario = document.querySelector('#linha_destinatario').value.split(/[,\|]+/);
        const abreviacao_nome_empresa = document.querySelector('#abreviacao_nome_empresa').value;

        var campos = [
            { nome: 'CFOPs', valor: cfops },
            { nome: 'Estado Emissor', valor: estados_emissor },
            { nome: 'Regime Emissor', valor: regime_emissor },
            { nome: 'Linha Emissor', valor: linha_emissor },
            { nome: 'Estado Destinatário', valor: estados_destinatario },
            { nome: 'Regime Destinatário', valor: regime_destinatario },
            { nome: 'Linha Destinatário', valor: linha_destinatario }
        ];
        for (var i = 0; i < campos.length; i++) {
            if (campos[i].valor.some(valor => valor === '')) {
                alert("O campo " + campos[i].nome + " não pode estar vazio.");
                return;
            }
        }
        if (abreviacao_nome_empresa === '') {
            alert("O campo Abreviação Nome Empresa não pode estar vazio.");
            return;
        }

        combinacoes = cartesianProduct([estados_emissor, estados_destinatario, cfops, cod_do_item, regime_emissor, regime_destinatario, linha_emissor, linha_destinatario]);

        document.querySelector('#resultado').value = combinacoes.length;

        var table = document.querySelector('#resultadoTabela');
        table.innerHTML = ''; // Limpar tabela anterior

        // Cabeçalho da tabela
        var cabecalho = "InternalId;Estado Emissor;Estado Destinatario;CFOP;Codigo do Item;Regime Emissor;Regime Destinatario;Linha Emissor;Linha Destinatario";
        var cabecalhoItens = cabecalho.split(';');
        var tableHeader = '<thead><tr>';
        for (var i = 0; i < cabecalhoItens.length; i++) {
            tableHeader += '<th>' + cabecalhoItens[i] + '</th>';
        }
        tableHeader += '</tr></thead>';
        table.innerHTML = tableHeader;

        // Conteúdo da tabela
        var tableBody = '<tbody>';
        for (var i = 0; i < combinacoes.length; i++) {
            var abreviacao_incrementada = abreviacao_nome_empresa + "-" + (i + 1);
            tableBody += '<tr>';
            tableBody += '<td>' + abreviacao_incrementada + '</td>'; // Adicionar a coluna 'Abreviação Nome Empresa'
            for (var j = 0; j < combinacoes[i].length; j++) {
                tableBody += '<td>' + combinacoes[i][j] + '</td>';
            }
            tableBody += '</tr>';
        }
        tableBody += '</tbody>';
        table.innerHTML += tableBody;
       
        // Condição para validar CFOPs dependendo do checkbox selecionado
        if (entradaCheckbox.checked) {
            if (cfops.some(cfop => !/^[123]\d{0,3}$/.test(cfop))) {
                alert("CFOPs de entrada devem conter apenas números que começam com 1, 2 ou 3 e ter no máximo 4 caracteres.");
                return;
            }
        } else if (saidaCheckbox.checked) {
            if (cfops.some(cfop => !/^[456]\d{0,3}$/.test(cfop))) {
                alert("CFOPs de saída devem conter apenas números que começam com 4, 5 ou 6 e ter no máximo 4 caracteres.");
                return;
            }
        }
    });

    document.querySelector('#exportar_csv').addEventListener('click', function () {
        // Condição para verificar se pelo menos um checkbox está marcado
        if (!entradaCheckbox.checked && !saidaCheckbox.checked) {
            alert("Selecione pelo menos um tipo de produto (Entrada ou Saída) para exportar o CSV.");
            return;
        }

        var csvContent = "ExternalId;Nome Da Regra;Estado Emissor;Estado Destinatario;CFOP;Codigo do Item;Regime Emissor;Regime Destinatario;Linha Emissor;Linha Destinatario\n";

        for (var i = 0; i < combinacoes.length; i++) {
            var abreviacao_incrementada = abreviacao_nome_empresa + "-" + (i + 1);
            var concate = combinacoes[i][0] + " > " + combinacoes[i][1] + " | " + combinacoes[i][3] + " & " + combinacoes[i][4];
            csvContent += abreviacao_incrementada + ";" + concate + ";" + combinacoes[i].join(';') + "\n";
        }

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'combinacoes.csv');
    });

    // Função para verificar os checkboxes e exibir no console
    function verificarCheckboxes() {
        console.log("Entrada de Produto:", entradaCheckbox.checked);
        console.log("Saída de Produto:", saidaCheckbox.checked);
    }

    entradaCheckbox.addEventListener('change', verificarCheckboxes);
    saidaCheckbox.addEventListener('change', verificarCheckboxes);

    document.querySelector('#limpar_resultados').addEventListener('click', function () {
        document.querySelector('#resultadoTabela').innerHTML = '';
        var resultadosGeral = document.querySelector('#resultado');
        resultadosGeral.value = '';
    });
});

function cartesianProduct(arrays) {
    return arrays.reduce(function (a, b) {
        var result = [];
        a.forEach(function (x) {
            b.forEach(function (y) {
                result.push(x.concat([y]));
            });
        });
        return result;
    }, [[]]);
}
