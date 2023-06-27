window.addEventListener('load', () => {

    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        verifica();

        function verifica() {
            var ok = verificaNome();
            if (ok) {
                ok = verificaValor();
                if (ok) {

                    var data = '';

                    const action = document.forms[0].url.value;

                    if (action == 'inserir') {
                        data = {
                            nome: document.forms[0].nome.value,
                            valorhora: document.forms[0].valorhora.value
                        };
                    } else if (action == 'salvar_edicao'){
                        data = {
                            id: document.forms[0].id.value,
                            nome: document.forms[0].nome.value,
                            valorhora: document.forms[0].valorhora.value
                        }
                    }

                    const url = `/funcionario/${action}`;

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
                                if (action == 'salvar_edicao') {
                                    window.open('/funcionario/listagem', '_self');
                                } else {
                                    window.location.reload();
                                }
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
        }
    });

    function verificaNome() {
        if (document.forms[0].nome.value.length < 3) {
            alert('Informe o nome!');
            document.forms[0].nome.focus();
            return false;
        } else {
            return true;
        }
    }

    function verificaValor() {
        if (document.forms[0].valorhora.value.length < 1) {
            alert('Valor por hora inválido!');
            document.forms[0].valorhora.focus();
            return false;
        } else {
            return true;
        }
    }

});