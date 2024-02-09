document.addEventListener('DOMContentLoaded', function() {
    // Defina os caminhos desejados
    const caminhoPaginaInicial = './index.html';
    const caminhoProdutoEntrada = '/pages/produto.html';
    // const caminhoProdutoSaida = '/pages/produto_saida.html';
    const caminhoServicoEntrada = '/pages/servico.html';
    // const caminhoServicoSaida = '/pages/servico_saida.html';

    // Atualize os atributos href dos links
    document.getElementById('paginaInicial').setAttribute('href', caminhoPaginaInicial);
    document.getElementById('caminhoProdutoEntrada').setAttribute('href', caminhoProdutoEntrada);
    // document.getElementById('produtoSaida').setAttribute('href', caminhoProdutoSaida);
    document.getElementById('servicoEntrada').setAttribute('href', caminhoServicoEntrada);
    // document.getElementById('servicoSaida').setAttribute('href', caminhoServicoSaida);
});
