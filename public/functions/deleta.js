window.addEventListener('load', () => {

    const forms = document.querySelectorAll('.form-delete');
    const id = document.querySelectorAll('.id-delete');
    const url = document.getElementById('url');

    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', (event) => {
            event.preventDefault();

            const data = {
                id: id[i].value,
            };

            console.log(data);

            let mensagem = 'Confirme a exclusão';

            if (confirm(mensagem)) {

                fetch(url.value, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status == 'ok') {
                            alert(data.mensagem);
                            window.location.reload();
                        } else {
                            alert(data.mensagem);
                        }
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
            }
        });
    }
});