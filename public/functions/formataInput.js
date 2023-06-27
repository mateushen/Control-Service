function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

function somenteLetras(e) {
    tecla = e.key;
    if (e.keyCode != 32) {
        if (tecla != 8 && tecla != 9) {
            if (tecla < 65 || tecla > 90) {
                return false;
            }
        }
    }
}

// Máscara de DATA
var data = document.getElementById('data')
if (data) {
    data.addEventListener('keypress', () => {
        let inputLength = data.value.length

        if (inputLength == 2 || inputLength == 5) {
            data.value += '/'
        }
    })
}