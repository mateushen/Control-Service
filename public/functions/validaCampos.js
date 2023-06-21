function camposUsuario() {
    const nomeUsuario = document.getElementById('nome');
    const emailInput = document.getElementById('email');
  
    let isValid = true;
  
    // Validar campo de nome
    if (nomeUsuario.lenght < 3) {
      //return alert = ('Por favor, digite seu nome');
      console('TEste')
    }
  
    // // Validar campo de email
    // if (emailInput.value.trim() === '') {
    //   emailError.textContent = 'Por favor, digite seu email';
    //   isValid = false;
    // } else {
    //   emailError.textContent = '';
    // }
  
    // return isValid;
  }