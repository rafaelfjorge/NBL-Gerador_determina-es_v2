// limpar_resultados.js

function LimparResultados() {
    // Obter o nome do arquivo da página atual
    var paginaAtual = window.location.pathname.split('/').pop();

    // Limpar os campos de texto
    document.getElementById('cfops').value = '';
    document.getElementById('cod_do_item').value = '';
    document.getElementById('estado_emissor').value = '';
    document.getElementById('regime_emissor').value = '';
    document.getElementById('linha_emissor').value = '';
    document.getElementById('estado_destinatario').value = '';
    document.getElementById('regime_destinatario').value = '';
    document.getElementById('linha_destinatario').value = '';

    // Limpar a abreviação do nome da empresa
    document.getElementById('abreviacao_nome_empresa').value = '';

    // Limpar o campo de resultados
    document.getElementById('resultado').value = '';

    // Limpar a tabela de resultados
    document.getElementById('resultadoTabela').innerHTML = '';

    // Limpar os checkboxes com base na página atual
    if (paginaAtual === 'produto.html') {
        document.getElementById('saida_produto_check').checked = false;
        document.getElementById('entrada_produto_check').checked = false;
    } else if (paginaAtual === 'servico.html') {
        document.getElementById('saida_servico_check').checked = false;
        document.getElementById('entrada_servico_check').checked = false;
        document.getElementById('cidade_emissor').value = '';
        document.getElementById('cidade_destinatario').value = '';
    }

    // Limpar qualquer outra coisa que você precise limpar
}

// Vincular a função ao botão "limpar_resultados"
document.getElementById('limpar_resultados').addEventListener('click', LimparResultados);
