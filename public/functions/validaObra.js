window.addEventListener('load', () => {

    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        verifica();

        function verifica() {
            var ok = verificaEndereco();
            if (ok) {
                ok = verificaValor();
                if (ok) {

                    var data = '';

                    const action = document.forms[0].url.value;

                    if (action == 'inserir') {
                        data = {
                            endereco: document.forms[0].endereco.value,
                            valorservico: document.forms[0].valorservico.value,
                            descricao: document.forms[0].descricao.value
                        };
                    } else if (action == 'salvar_edicao'){
                        data = {
                            id: document.forms[0].id.value,
                            endereco: document.forms[0].endereco.value,
                            valorservico: document.forms[0].valorservico.value,
                            descricao: document.forms[0].descricao.value
                        }
                    }

                    const url = `/obra/${action}`;

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
                                    window.open('/obra/listagem', '_self');
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

    function verificaEndereco() {
        if (document.forms[0].endereco.value.length < 3) {
            alert('Informe o endereco!');
            document.forms[0].endereco.focus();
            return false;
        } else {
            return true;
        }
    }

    function verificaValor() {
        if (document.forms[0].valorservico.value.length < 1) {
            alert('Valor do serviço inválido!');
            document.forms[0].valorservico.focus();
            return false;
        } else {
            return true;
        }
    }

});