window.addEventListener('load', () => {

    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        verifica();

        function verifica() {
            var ok = verificaHoras();
            if (ok) {
                ok = verificaData();
                if (ok) {
                    ok = verificaFuncionario();
                    if (ok) {
                        ok = verificaObra();
                        if (ok) {
                            const data = {
                                qtd_horas: document.forms[0].qtd_horas.value,
                                data: document.forms[0].data.value,
                                idFuncionario: document.forms[0].idFuncionario.value,
                                idObra: document.forms[0].idObra.value
                            };

                            const url = '/servico/inserir';

                            fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    let p = document.getElementById('msg');
                                    if (data.status == 'ok') {
                                        alert(data.mensagem);
                                        p.innerText = '';
                                        window.location.reload();
                                    } else {
                                        p.innerText = data.mensagem;
                                        p.style.color = 'red';
                                    }
                                })
                                .catch(error => {
                                    console.error('Erro:', error);
                                });
                        } else return false;
                    } else return false;
                } else return false;
            } else return false;
        }
    });

    function verificaHoras() {
        if (document.forms[0].qtd_horas.value.length == 0) {
            alert('Informe a quantidade de horas!');
            document.forms[0].qtd_horas.focus();
            return false;
        } else {
            return true;
        }
    }

    function verificaData() {
        if (document.forms[0].data.value.length != 10) {
            alert('Data inválida!');
            document.forms[0].data.focus();
            return false;
        } else {
            return true;
        }
    }

    function verificaObra() {
        if (document.forms[0].idObra.value == '0') {
            alert('Obra inválida!');
            document.forms[0].idObra.focus();
            return false;
        } else {
            return true;
        }
    }

    function verificaFuncionario() {
        if (document.forms[0].idFuncionario.value == '0') {
            alert('Funcionario inválido!');
            document.forms[0].idFuncionario.focus();
            return false;
        } else {
            return true;
        }
    }

});