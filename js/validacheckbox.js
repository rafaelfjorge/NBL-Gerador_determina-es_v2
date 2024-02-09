// validacheckbox.js

function validarCheckbox(checkbox) {
    var checkboxes = document.querySelectorAll('.tabela-checkbox input[type="checkbox"]');
    
    checkboxes.forEach(function (cb) {
        if (cb !== checkbox) {
            cb.checked = false;
        }
    });
}
