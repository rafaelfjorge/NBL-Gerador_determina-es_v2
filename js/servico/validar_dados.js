// validar_dados.js

function validarDados() {
    // Verificar se pelo menos uma opção de saída ou entrada está selecionada
    const saidaProdutoCheck = document.getElementById('saida_produto_check').checked;
    const entradaProdutoCheck = document.getElementById('entrada_produto_check').checked;

    if (!saidaProdutoCheck && !entradaProdutoCheck) {
        alert("Selecione pelo menos uma opção de saída ou entrada.");
        return false;
    }

    // Se a opção de saída está selecionada, validar os campos obrigatórios
    if (saidaProdutoCheck) {
        const camposObrigatoriosSaida = ['abreviacao_nome_empresa','cfops', 'estado_emissor', 'regime_emissor', 'linha_emissor','estado_destinatario', 'regime_destinatario', 'linha_destinatario'];
        for (const campo of camposObrigatoriosSaida) {
            const valorCampo = document.getElementById(campo).value.trim();
            if (valorCampo === '') {
                alert(`O campo ${campo} é obrigatório.`);
                return false;
            }
        }
    }

    // Se a validação de dados for bem-sucedida, chamar a validação de CFOPs
    return validarCFOPs();
}
