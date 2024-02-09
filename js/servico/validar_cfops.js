// validar_cfops.js

// Função para validar CFOPs
function validarCFOPs() {
    // Validar os CFOPs de acordo com as opções selecionadas
    const entradaCheckbox = document.getElementById('entrada_produto_check');
    const saidaCheckbox = document.getElementById('saida_produto_check');
    const cfops = document.getElementById('cfops').value.split(',').map(cfop => cfop.trim());

    if (entradaCheckbox.checked) {
        if (cfops.some(cfop => !/^[123]\d{0,3}$/.test(cfop))) {
            alert("CFOPs de entrada devem conter apenas números que começam com 1, 2 ou 3 e ter no máximo 4 caracteres.");
            return false;
        }
    } else if (saidaCheckbox.checked) {
        if (cfops.some(cfop => !/^[456]\d{0,3}$/.test(cfop))) {
            alert("CFOPs de saída devem conter apenas números que começam com 4, 5 ou 6 e ter no máximo 4 caracteres.");
            return false;
        }
    }

    return true; // CFOPs válidos
}


/**
 * if (cfops.some(cfop => !/^[456]\d{0,3}$/.test(cfop))) {
                    alert("CFOPs de saída devem conter apenas números que começam com 4, 5 ou 6.");
                    return;
                }

                if (cfops.some(cfop => !/^[123]\d{0,3}$/.test(cfop))) {
                    alert("CFOPs de entrada devem conter apenas números que começam com 1, 2 ou 3 e ter no máximo 4 caracteres.");
                    return;
                }
 */