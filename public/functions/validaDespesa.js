window.addEventListener('load', () => {

    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        verifica();

        function verifica() {
            var ok = verificaDescricao();
            if (ok) {
                ok = verificaValor();
                if (ok) {
                    ok = verificaObra()
                    if (ok) {
                        var data = {
                            descricao: document.forms[0].descricao.value,
                            valordespesa: document.forms[0].valordespesa.value,
                            idObra: document.forms[0].idObra.value
                        };

                        const url = '/despesa/inserir';

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
        }
    });

    function verificaDescricao() {
        if (document.forms[0].descricao.value.length < 3) {
            alert('Informe o descricao!');
            document.forms[0].descricao.focus();
            return false;
        } else {
            return true;
        }
    }

    function verificaValor() {
        if (document.forms[0].valordespesa.value.length < 1) {
            alert('Valor da despesa inválida!');
            document.forms[0].valordespesa.focus();
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

});