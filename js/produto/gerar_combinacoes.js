document.addEventListener('DOMContentLoaded', function () {
    var combinacoes;

    document.getElementById('gerar_combinacoes').addEventListener('click', function () {
        // Chamar a função de validação de dados antes de continuar
        if (!validarDados()) {
            return;
        }

        // Obter valores dos inputs
        var saidaProdutoCheck = document.getElementById('saida_produto_check').checked;
        var entradaProdutoCheck = document.getElementById('entrada_produto_check').checked;
        var abreviacao_nome_empresa = document.querySelector('#abreviacao_nome_empresa').value;
        var cfops = document.querySelector('#cfops').value.split(/[,\|]+/) || [''];
        var cod_do_item = document.querySelector('#cod_do_item').value.split(/[,\|\;]+/);
        var estados_emissor = document.querySelector('#estado_emissor').value.split(/[,\|\;]+/) || [''];
        var estados_destinatario = document.querySelector('#estado_destinatario').value.split(/[,\|\;]+/) || [''];
        var regime_emissor = document.querySelector('#regime_emissor').value.split(/[,\|]+/) || [''];
        var regime_destinatario = document.querySelector('#regime_destinatario').value.split(/[,\|\;]+/) || [''];
        var linha_emissor = document.querySelector('#linha_emissor').value.split(/[,\|\;]+/) || [''];
        var linha_destinatario = document.querySelector('#linha_destinatario').value.split(/[,\|\;]+/) || [''];
        var resultado = document.querySelector('#resultado').value;

        // Determinar a variável nstbr_determionacao_importo
        var nstbr_determionacao_importo = saidaProdutoCheck ? "Saída - Produto" : "Entrada - Produto";

        // Gerar combinações
        combinacoes = cartesianProduct([estados_emissor, estados_destinatario, cfops, cod_do_item, regime_emissor, regime_destinatario, linha_emissor, linha_destinatario]);

        document.querySelector('#resultado').value = combinacoes.length;

        // Limpar tabela anterior
        const table = document.querySelector('#resultadoTabela');
        table.innerHTML = '';

        // Adicionar cabeçalho da tabela
        const cabecalho = "InternalId;Nome Da Regra;Estado Emissor;Estado Destinatario;CFOP;Codigo do Item;Regime Emissor;Regime Destinatario;Linha Emissor;Linha Destinatario;NSTBR | DETERMINAÇÃO DE IMPOSTOS";
        const cabecalhoItens = cabecalho.split(';').filter(item => item.trim() !== '');  // Adicionado o filtro para remover itens vazios
        let tableHeader = '<thead><tr>';
        for (let i = 0; i < cabecalhoItens.length; i++) {
            tableHeader += '<th>' + cabecalhoItens[i] + '</th>';
        }
        tableHeader += '</tr></thead>';
        table.innerHTML += tableHeader;

        //Adicionar conteúdo da tabela
        let tableBody = '<tbody>';
        for (let i = 0; i < combinacoes.length; i++) {
            const abreviacao_incrementada = abreviacao_nome_empresa + "-" + (i + 1);
            const nomeDaRegra = combinacoes[i][0] + " > " + combinacoes[i][1] + " | " + combinacoes[i][4] + " & " + combinacoes[i][5];
            tableBody += '<tr>';
            tableBody += '<td>' + abreviacao_incrementada + '</td>';
            tableBody += '<td>' + nomeDaRegra + '</td>';
            for (let j = 0; j < combinacoes[i].length; j++) {
                tableBody += '<td>' + combinacoes[i][j] + '</td>';
            }
            tableBody += '<td>' + nstbr_determionacao_importo + '</td>';
            tableBody += '</tr>';
        }
        tableBody += '</tbody>';
        table.innerHTML += tableBody;          

    });
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
