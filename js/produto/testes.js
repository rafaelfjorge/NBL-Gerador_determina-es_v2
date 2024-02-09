document.addEventListener('DOMContentLoaded', function () {
    // Adiciona um ouvinte de evento para o botão "Teste"
    document.getElementById('botaoTeste').addEventListener('click', function () {
        // Preencher valores padrões nos campos
        document.getElementById('entrada_produto_check').checked = true;
        document.getElementById('abreviacao_nome_empresa').value = 'edy';
        document.getElementById('cfops').value = '1910,2058';
        document.getElementById('estado_emissor').value = 'RJ';
        document.getElementById('regime_emissor').value = 'Lucro Presumido';
        document.getElementById('linha_emissor').value = 'Venda de Mercadorias';
        document.getElementById('estado_destinatario').value = 'RJ';
        document.getElementById('regime_destinatario').value = 'Lucro Presumido';
        document.getElementById('linha_destinatario').value = 'Venda de Mercadorias e serviços';
    });

    document.getElementById('botaoTeste').addEventListener('click', preencherValoresPadroes);
});
