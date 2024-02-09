document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('exportar_excel').addEventListener('click', function () {
        exportToExcel('resultadoTabela');
    });
});

function exportToExcel(tableId) {
    const table = document.getElementById(tableId);
    
    // Criar uma nova planilha
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planilha1');
    
    // Salvar o arquivo
    XLSX.writeFile(wb, 'exported_data.xlsx');
}
