// limpar_resultados.js

function LimparResultados() {
    // Limpar os campos de texto
    document.getElementById('cfops').value = '';
    document.getElementById('cod_do_item').value = '';
    document.getElementById('estado_emissor').value = '';
    document.getElementById('regime_emissor').value = '';
    document.getElementById('linha_emissor').value = '';
    document.getElementById('estado_destinatario').value = '';
    document.getElementById('regime_destinatario').value = '';
    document.getElementById('linha_destinatario').value = '';

    // Limpar os checkboxes
    document.getElementById('saida_produto_check').checked = false;
    document.getElementById('entrada_produto_check').checked = false;

    // Limpar a abreviação do nome da empresa
    document.getElementById('abreviacao_nome_empresa').value = '';

    // Limpar o campo de resultados
    document.getElementById('resultado').value = '';

    // Limpar a tabela de resultados
    document.getElementById('resultadoTabela').innerHTML = '';

    // Limpar qualquer outra coisa que você precise limpar
}

// Vincular a função ao botão "limpar_resultados"
document.getElementById('limpar_resultados').addEventListener('click', LimparResultados);
