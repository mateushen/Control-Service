window.addEventListener('load', () => {

    document.forms[0].addEventListener('submit', (event) => {
        event.preventDefault();
        verifica();

        function verifica() {
            var ok = verificaNome();
            if (ok) {
                ok = verificaSenha();
                if (ok) {

                    const data = {
                        nome: document.forms[0].nome.value,
                        senha: document.forms[0].senha.value
                    };

                    const action = document.forms[0].url.value;

                    const url = `/usuario/${action}`;

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
                                if (action == 'verifica') {
                                    window.open('/usuario/inicio', '_self');
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

    function verificaSenha() {
        if (document.forms[0].senha.value.length != 6) {
            alert('A senha deve conter 6 caracteres!.');
            document.forms[0].senha.focus();
            return false;
        } else {
            return true;
        }
    }

});