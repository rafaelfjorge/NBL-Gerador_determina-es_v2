document.addEventListener('DOMContentLoaded', function() {
    const caminhoPaginaInicial = './index.html';
    const caminhoProdutoEntrada = '/pages/produto.html';
    const caminhoServicoEntrada = '/pages/servico.html';

    document.getElementById('paginaInicial').setAttribute('href', caminhoPaginaInicial);
    document.getElementById('caminhoProdutoEntrada').setAttribute('href', caminhoProdutoEntrada);
    document.getElementById('servicoEntrada').setAttribute('href', caminhoServicoEntrada);
});
