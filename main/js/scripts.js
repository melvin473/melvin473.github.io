/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

function checarForcaSenha() {
  let senha = document.getElementById("senha").value;
  let forcaIndicador = document.getElementById("forcaIndicador");
  let forca = "";
  if (senha.length != 0) {
    forca = "Fraca";
  }
  if (senha.length >= 8) {
    if (/[A-Z]/.test(senha) && /[0-9]/.test(senha) && /[!@#$%^&*]/.test(senha)) {
      forca = "Forte";
    } else if (/[A-Z]/.test(senha) || /[0-9]/.test(senha) || /[!@#$%^&*]/.test(senha)) {
      forca = "Média";
    }
  }

  forcaIndicador.style.display = "block";
  forcaIndicador.className = "forca " + forca;
  forcaIndicador.textContent = forca.charAt(0).toUpperCase() + forca.slice(1);
}

function checarConfirmacao() {
  let senha = document.getElementById("senha").value;
  let confirmacao = document.getElementById("confirmacao").value;
  let confirmaIndicador = document.getElementById("confirmaIndicador");

  if (confirmacao.length === 0) {
    confirmaIndicador.textContent = "";
  } else if (senha === confirmacao) {
    confirmaIndicador.textContent = "Senhas coincidem!";
    confirmaIndicador.className = "confirma-indicador successo";
  } else {
    confirmaIndicador.textContent = "Senhas não coincidem!";
    confirmaIndicador.className = "confirma-indicador erro";
  }
}

  function consultarCEP() {
    var cep = document.getElementById("cep").value;
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(response => response.json())
        .then(data => {
          document.getElementById("endereco").value = data.logradouro;
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("cidade").value = data.localidade;
          document.getElementById("estado").value = data.uf;
        })
        .catch(error => console.error("Erro ao consultar CEP:", error));
    } else {
      alert("Por favor, insira um CEP válido.");
    }
  }

document.addEventListener('DOMContentLoaded', function() {
  const emailSalvo = localStorage.getItem('emailSalvo');
  const  senhaSalva = localStorage.getItem('senhaSalva');
  if (emailSalvo && senhaSalva) {
    document.getElementById('email').value = emailSalvo;
    document.getElementById('senha').value = senhaSalva;
    document.getElementById('relembrarBox').checked = true;
  }
});

function salvarCadastro() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const cep = document.getElementById('cep').value;
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const complemento = document.getElementById('complemento').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const estadoSelect = document.getElementById('estado');
  const estado = estadoSelect.options[estadoSelect.selectedIndex].text;
  const profilePhoto = document.getElementById('profilePhoto').files[0];
  
  const id = new Date().getTime().toString(); // Gera um ID único com base no timestamp
  
  const reader = new FileReader();
  reader.onloadend = function() {
    const base64data = reader.result;
    const user = {
      id,
      nome,
      telefone,
      email,
      senha,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      profilePhoto: base64data
    };
     
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuário cadastrado com sucesso!');
    document.getElementById('registrationForm').reset();
  };

  if (profilePhoto) {
    reader.readAsDataURL(profilePhoto);
  } else {
    const user = {
      id,
      nome,
      telefone,
      email,
      senha,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      profilePhoto: null
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuário cadastrado com sucesso!');
    document.getElementById('registrationForm').reset();
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.senha === senha);
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = 'perfil.html';
  } else {
    alert('Email ou senha incorretos');
  }
}

function loadProfile() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    // Forçar atualização de dados
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.id === loggedInUser.id);
    
    if (user) {
      // Atualizar dados na página de perfil
      document.getElementById('nome').textContent = user.nome;
      document.getElementById('telefone').textContent = user.telefone;
      document.getElementById('email').textContent = user.email;
      document.getElementById('endereco').textContent = `${user.endereco}, ${user.numero}`;
      document.getElementById('complemento').textContent = user.complemento;
      document.getElementById('cep').textContent = user.cep;
      document.getElementById('bairro').textContent = user.bairro;
      document.getElementById('cidade').textContent = user.cidade;
      document.getElementById('estado').textContent = user.estado;

      const profilePhoto = document.getElementById('profilePhoto');
      profilePhoto.src = loggedInUser.profilePhoto;
      profilePhoto.style.width = "150px";
      profilePhoto.style.height = "150px";
      profilePhoto.style.objectFit = "cover";

      // Atualizar localStorage para manter a sincronia
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Verifique se está na página de perfil
  if (window.location.pathname.includes('perfil.html')) {
    loadProfile();
  }
});

function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'home.html';
  alert('Você foi desconectado');
}

function toggleEndereco() {
  const enderecoSection = document.getElementById('enderecoSection');
  const toggleText = document.getElementById('toggleText');
  const arrow = document.getElementById('arrow');
  if (enderecoSection.style.display === 'none' || enderecoSection.style.display === '') {
    enderecoSection.style.display = 'block';
    toggleText.textContent = 'Fechar Endereço';
    arrow.innerHTML = '&#x25B2;';
  } else {
    enderecoSection.style.display = 'none';
    toggleText.textContent = 'Expandir Endereço';
    arrow.innerHTML = '&#x25BC;';
  }
}

function salvarPet(event) {
  const form = document.getElementById('cadastro-form');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  event.preventDefault(); // Evita a submissão do formulário e a atualização da página

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    alert('Nenhum usuário logado!');
    return;
  }
  const userId = loggedInUser.id;

  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const descricao = document.getElementById('descricao').value;
  const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Filtra para apenas números
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const complemento = document.getElementById('complemento').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const estadoSelect = document.getElementById('estado');
  const estado = estadoSelect.options[estadoSelect.selectedIndex].text;
  const situacao = document.querySelector('input[name="situacao"]:checked').value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  const porte = document.querySelector('input[name="porte"]:checked').value;
  const raca = document.getElementById('raca').value;
  const castrado = document.querySelector('input[name="castrado"]:checked').value;
  const vacina = document.querySelector('input[name="vacina"]:checked').value;
  const foto = document.getElementById('foto').files[0];

  const id = new Date().getTime().toString();

  const reader = new FileReader();
  reader.onloadend = function() {
    const base64data = reader.result;
    const pet = {
      userId,
      id,
      nome,
      telefone,
      descricao,
      endereco: {
        cep,
        rua: endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      },
      situacao,
      tipo,
      porte,
      raca,
      castrado,
      vacina,
      foto: base64data
    };

    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push(pet);
    localStorage.setItem('pets', JSON.stringify(pets));

    alert('Pet cadastrado com sucesso!');
    document.getElementById('cadastro-form').reset();
  };

  if (foto) {
    reader.readAsDataURL(foto);
  } else {
    const pet = {
      userId,
      id,
      nome,
      telefone,
      descricao,
      endereco: {
        cep,
        rua: endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      },
      situacao,
      tipo,
      porte,
      raca,
      castrado,
      vacina
    };

    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    pets.push(pet);
    localStorage.setItem('pets', JSON.stringify(pets));

    alert('Pet cadastrado com sucesso!');
    document.getElementById('cadastro-form').reset();
  }
}

window.onload = function() {
  if (window.location.pathname.includes('perfil.html')) {
    loadProfile();
  }
}

function editarPet(petId) {
  const id = new URLSearchParams(window.location.search).get('petId');
  if (!id) {
    alert('Pet não encontrado!');
    return;
  }

  let pets = JSON.parse(localStorage.getItem('pets')) || [];
  const petIndex = pets.findIndex(pet => pet.id === id);

  if (petIndex !== -1) {
    const pet = pets[petIndex];

    document.getElementById('nome').value = pet.nome;
    document.getElementById('telefone').value = pet.telefone;
    document.getElementById('descricao').value = pet.descricao;
    document.getElementById('cep').value = pet.endereco.cep;
    document.getElementById('endereco').value = pet.endereco.rua;
    document.getElementById('numero').value = pet.endereco.numero;
    document.getElementById('complemento').value = pet.endereco.complemento;
    document.getElementById('bairro').value = pet.endereco.bairro;
    document.getElementById('cidade').value = pet.endereco.cidade;
    document.getElementById('estado').value = pet.endereco.estado;
    document.querySelector(`input[name="situacao"][value="${pet.situacao}"]`).checked = true;
    document.querySelector(`input[name="tipo"][value="${pet.tipo}"]`).checked = true;
    document.querySelector(`input[name="porte"][value="${pet.porte}"]`).checked = true;
    document.getElementById('raca').value = pet.raca;
    document.querySelector(`input[name="castrado"][value="${pet.castrado}"]`).checked = true;
    document.querySelector(`input[name="vacina"][value="${pet.vacina}"]`).checked = true;
  } else {
    alert('Pet não encontrado!');
  }
}

function carregarPaginaEdicao() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    // Salva o ID do usuário logado em localStorage para acessar na página de edição
    localStorage.setItem('editUserId', loggedInUser.id);
    // Redireciona para a página de edição
    window.location.href = 'editarusuario.html';
  } else {
    alert('Nenhum usuário logado!');
  }
}

function editarUsuario() {
  const id = localStorage.getItem('editUserId');
  if (!id) {
    alert('Usuário não encontrado!');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex !== -1) {
    const user = users[userIndex];

    document.getElementById('nome').value = user.nome;
    document.getElementById('telefone').value = user.telefone;
    document.getElementById('email').value = user.email;
    document.getElementById('senha').value = user.senha;
    document.getElementById('confirmacao').value = user.senha;
    document.getElementById('cep').value = user.cep;
    document.getElementById('endereco').value = user.endereco;
    document.getElementById('numero').value = user.numero;
    document.getElementById('complemento').value = user.complemento;
    document.getElementById('bairro').value = user.bairro;
    document.getElementById('cidade').value = user.cidade;
    document.getElementById('estado').options[document.getElementById('estado').selectedIndex].text = user.estado;
    const profilePhoto = document.getElementById('profilePhoto');
    profilePhoto.src = user.profilePhoto;
  } else {
    alert('Usuário não encontrado!');
  }
}

// Função para salvar as alterações do usuário editado
function salvarEdicaoUsuario() {
  const id = localStorage.getItem('editUserId');
  if (!id) {
    alert('Usuário não encontrado!');
    return;
  }

  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const cep = document.getElementById('cep').value;
  const endereco = document.getElementById('endereco').value;
  const numero = document.getElementById('numero').value;
  const complemento = document.getElementById('complemento').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const estadoSelect = document.getElementById('estado');
  const estado = estadoSelect.options[estadoSelect.selectedIndex].text;
  const profilePhoto = document.getElementById('profilePhoto').files[0];

  const reader = new FileReader();
  reader.onloadend = function() {
    const base64data = reader.result;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
      users[userIndex] = {
        id,
        nome,
        telefone,
        email,
        senha,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        profilePhoto: base64data // Atualiza a foto de perfil se houver
      };

      localStorage.setItem('users', JSON.stringify(users));
      alert('Perfil do usuário atualizado com sucesso!');
      // Redireciona de volta para a página de perfil
      window.location.href = 'perfil.html';
    } else {
      alert('Usuário não encontrado!');
    }
  };

  if (profilePhoto) {
    reader.readAsDataURL(profilePhoto);
  } else {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
      users[userIndex] = {
        id,
        nome,
        telefone,
        email,
        senha,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        profilePhoto: users[userIndex].profilePhoto // Mantém a foto de perfil existente se não houver uma nova
      };

      localStorage.setItem('users', JSON.stringify(users));
      alert('Perfil do usuário atualizado com sucesso!');
      // Redireciona de volta para a página de perfil
      window.location.href = 'perfil.html';
    } else {
      alert('Usuário não encontrado!');
    }
  }
}

function loadPets() {
  const pets = JSON.parse(localStorage.getItem('pets')) || [];
  const petList = document.getElementById('petList');
  
  petList.innerHTML = ''; // Limpar o elemento antes de adicionar novos pets

  if (pets.length > 0) {
    pets.forEach(pet => {
      const petItem = document.createElement('div');
      petItem.className = 'pet-item';
      
      const petFoto = document.createElement('img');
      petFoto.src = pet.foto || 'main/css/img/padrao.png';
      petFoto.style.width = "200px";
      petFoto.style.height = "200px";
      petFoto.style.objectFit = "cover";
      petFoto.setAttribute('data-toggle', 'modal');
      petFoto.setAttribute('data-target', '#infoModal');
      petFoto.style.cursor = "pointer";
      petFoto.style.borderRadius = "10px";

      const petNome = document.createElement('h2');
      petNome.textContent = pet.nome;

      petItem.appendChild(petFoto);
      petItem.appendChild(petNome);
      petList.appendChild(petItem);

      petFoto.onclick = function() {
        // Preencher o modal com informações do pet
        const modalFoto = document.getElementById('modalFoto');
        modalFoto.src = pet.foto || 'main/css/img/padrao.png';
        modalFoto.style.width = "400px"; // Retângulo maior
        modalFoto.style.height = "300px"; // Retângulo maior

        document.getElementById('modalNome').textContent = pet.nome;
        document.getElementById('modalTelefone').textContent = pet.telefone;
        document.getElementById('modalDescricao').textContent = pet.descricao;
        document.getElementById('modalEndereco').textContent = `${pet.endereco.rua}, ${pet.endereco.numero}, ${pet.endereco.complemento}, ${pet.endereco.bairro}, ${pet.endereco.cidade}, ${pet.endereco.estado}, CEP: ${pet.endereco.cep}`;
        document.getElementById('modalSituacao').textContent = pet.situacao;
        document.getElementById('modalTipo').textContent = pet.tipo;
        document.getElementById('modalPorte').textContent = pet.porte;
        document.getElementById('modalRaca').textContent = pet.raca;
        document.getElementById('modalCastrado').textContent = pet.castrado;
        document.getElementById('modalVacinado').textContent = pet.vacina;
        $('#infoModal').modal('show');
      };
    });
  } else {
    const noPetsMessage = document.createElement('p');
    noPetsMessage.textContent = 'Sem animais cadastrados';
    petList.appendChild(noPetsMessage);
  }
}

function abrirModalPet(pet) {
  const modalFoto = document.getElementById('modalFoto');
  modalFoto.src = pet.foto || 'main/css/img/padrao.png';
  modalFoto.style.width = '400px'; // Retângulo maior
  modalFoto.style.height = '300px'; // Retângulo maior
  modalFoto.style.objectFit = 'cover';

  document.getElementById('modalNome').textContent = pet.nome;
  document.getElementById('modalTelefone').textContent = pet.telefone;
  document.getElementById('modalDescricao').textContent = pet.descricao;
  document.getElementById('modalEndereco').textContent = `${pet.endereco.rua}, ${pet.endereco.numero}, ${pet.endereco.complemento}, ${pet.endereco.bairro}, ${pet.endereco.cidade}, ${pet.endereco.estado}, CEP: ${pet.endereco.cep}`;
  document.getElementById('modalSituacao').textContent = pet.situacao;
  document.getElementById('modalTipo').textContent = pet.tipo;
  document.getElementById('modalPorte').textContent = pet.porte;
  document.getElementById('modalRaca').textContent = pet.raca;
  document.getElementById('modalCastrado').textContent = pet.castrado;
  document.getElementById('modalVacinado').textContent = pet.vacina;
}

function excluirUsuarioAtivo() {
  if (confirm('Tem certeza que deseja excluir sua conta?')) {
      // Recupera o usuário logado do localStorage
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
          const userId = loggedInUser.id;

          // Recupera todos os usuários do localStorage
          let users = JSON.parse(localStorage.getItem('users')) || [];
          // Filtra os usuários, excluindo o usuário ativo
          users = users.filter(user => user.id !== userId);
          // Atualiza o localStorage com os usuários restantes
          localStorage.setItem('users', JSON.stringify(users));
          
          // Remove o usuário logado do localStorage
          localStorage.removeItem('loggedInUser');

          alert('Conta excluída com sucesso!');
          // Redireciona para a página de login ou página inicial
          window.location.href = 'login.html';
      } else {
          alert('Nenhum usuário logado!');
      }
  }
}

function carregaEndereco(event) {
  event.preventDefault();
  const arrowElement = document.getElementById('arrow');
  const arrowText = arrowElement.textContent || arrowElement.innerText;
  if (arrowText === '▼') {
    toggleEndereco();
  }
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    document.getElementById('cep').value = loggedInUser.cep;
    document.getElementById('endereco').value = loggedInUser.endereco;
    document.getElementById('numero').value = loggedInUser.numero;
    document.getElementById('complemento').value = loggedInUser.complemento;
    document.getElementById('bairro').value = loggedInUser.bairro;
    document.getElementById('cidade').value = loggedInUser.cidade;
    document.getElementById('estado').options[document.getElementById('estado').selectedIndex].text = loggedInUser.estado;
  }
}

function preencherEnderecoComLocalizacao(event) {
  event.preventDefault(); // Evita a submissão do formulário
  const arrowElement = document.getElementById('arrow');
  const arrowText = arrowElement.textContent || arrowElement.innerText;
  if (arrowText === '▼') {
    toggleEndereco();
  }
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(obterEndereco, mostrarErro);
  } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
  }
}

function obterEndereco(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Usar uma API de geocodificação para converter latitude e longitude em um endereço
  const geocodeAPI = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

  fetch(geocodeAPI)
      .then(response => response.json())
      .then(data => {
          if (data.address) {
              document.getElementById('endereco').value = data.address.road || '';
              document.getElementById('numero').value = data.address.house_number || '';
              document.getElementById('bairro').value = data.address.neighbourhood || '';
              document.getElementById('cidade').value = data.address.city || '';
              document.getElementById('estado').options[document.getElementById('estado').selectedIndex].text = data.address.state || '';
              const cepApenasNumeros = data.address.postcode.replace(/\D/g, '');
              document.getElementById('cep').value = cepApenasNumeros;
          } else {
              alert("Não foi possível obter o endereço.");
          }
      })
      .catch(error => {
          console.error("Erro ao obter o endereço:", error);
          alert("Erro ao obter o endereço.");
      });
}

function mostrarErro(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("Usuário negou a solicitação de geolocalização.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Informação de localização indisponível.");
          break;
      case error.TIMEOUT:
          alert("A solicitação para obter a localização foi temporizada.");
          break;
      case error.UNKNOWN_ERROR:
          alert("Ocorreu um erro desconhecido.");
          break;
  }
}

function loadPetsUser() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    console.error('Nenhum usuário logado.');
    return;
  }

  const pets = JSON.parse(localStorage.getItem('pets')) || [];
  const userPets = pets.filter(pet => pet.userId === loggedInUser.id);
  const petList = document.getElementById('petList');
  petList.innerHTML = ''; // Limpar o elemento antes de adicionar novos pets

  if (userPets.length > 0) {
    userPets.forEach(pet => {
      const petItem = document.createElement('div');
      petItem.className = 'pet-item';
      
      const petFoto = document.createElement('img');
      petFoto.src = pet.foto || 'main/css/img/padrao.png';
      petFoto.style.width = "200px";
      petFoto.style.height = "200px";
      petFoto.style.objectFit = "cover";
      petFoto.style.cursor = "pointer";
      petFoto.style.borderRadius = "10px"; // Adiciona bordas arredondadas

      // Adiciona atributos do modal
      petFoto.setAttribute('data-toggle', 'modal');
      petFoto.setAttribute('data-target', '#infoModal');

      const petNome = document.createElement('h2');
      petNome.textContent = pet.nome;

      petItem.appendChild(petFoto);
      petItem.appendChild(petNome);
      petList.appendChild(petItem);

      petFoto.onclick = function() {
        // Preencher o modal com informações do pet
        const modalFoto = document.getElementById('modalFoto');
        modalFoto.src = pet.foto || 'main/css/img/padrao.png';
        modalFoto.style.width = "400px"; // Retângulo maior
        modalFoto.style.height = "300px"; // Retângulo maior
        modalFoto.style.borderRadius = "10px"; // Adiciona bordas arredondadas ao modal também

        document.getElementById('modalNome').textContent = pet.nome;
        document.getElementById('modalTelefone').textContent = pet.telefone;
        document.getElementById('modalDescricao').textContent = pet.descricao;
        document.getElementById('modalEndereco').textContent = `${pet.endereco.rua}, ${pet.endereco.numero}, ${pet.endereco.complemento}, ${pet.endereco.bairro}, ${pet.endereco.cidade}, ${pet.endereco.estado}, CEP: ${pet.endereco.cep}`;
        document.getElementById('modalSituacao').textContent = pet.situacao;
        document.getElementById('modalTipo').textContent = pet.tipo;
        document.getElementById('modalPorte').textContent = pet.porte;
        document.getElementById('modalRaca').textContent = pet.raca;
        document.getElementById('modalCastrado').textContent = pet.castrado;
        document.getElementById('modalVacinado').textContent = pet.vacina;

        // Adiciona os eventos de clique para os botões
        document.getElementById('editPost').onclick = function() {
          const petId = pet.id;
          window.location.href = `editarpet.html?petId=${petId}`; // Use backticks para template literal
        };
        

        document.getElementById('deletePost').onclick = function() {
          excluirPostagemPet(pet.id);
        };

        $('#infoModal').modal('show');
      };
    });
  } else {
    const noPetsMessage = document.createElement('p');
    noPetsMessage.textContent = 'Sem animais cadastrados';
    petList.appendChild(noPetsMessage);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadPetsUser();
});

function editarPostagemPet() {
  // Redireciona para a página de edição com o ID do pet
  window.location.href = "editarpet.html";
}

function excluirPostagemPet(petId) {
  if (confirm('Tem certeza que deseja excluir este pet?')) {
    // Obtém os pets do localStorage
    let pets = JSON.parse(localStorage.getItem('pets')) || [];
    // Filtra os pets, removendo o pet com o ID fornecido
    pets = pets.filter(pet => pet.id !== petId);
    // Atualiza o localStorage com os pets restantes
    localStorage.setItem('pets', JSON.stringify(pets));
    alert('Pet excluído com sucesso!');
    // Recarrega a lista de pets
    loadPetsUser();
    $('#infoModal').modal('hide');
  }
}

function salvarAlteracoesPet(event) {
  event.preventDefault();
  const id = new URLSearchParams(window.location.search).get('petId');
  if (!id) {
    alert('Pet não encontrado!');
    return;
  }

  let pets = JSON.parse(localStorage.getItem('pets')) || [];
  const petIndex = pets.findIndex(pet => pet.id === id);

  if (petIndex !== -1) {
    const pet = pets[petIndex];

    // Atualizar os dados do pet com os valores do formulário
    pet.nome = document.getElementById('nome').value;
    pet.telefone = document.getElementById('telefone').value;
    pet.descricao = document.getElementById('descricao').value;
    pet.endereco.cep = document.getElementById('cep').value;
    pet.endereco.rua = document.getElementById('endereco').value;
    pet.endereco.numero = document.getElementById('numero').value;
    pet.endereco.complemento = document.getElementById('complemento').value;
    pet.endereco.bairro = document.getElementById('bairro').value;
    pet.endereco.cidade = document.getElementById('cidade').value;
    pet.endereco.estado = document.getElementById('estado').value;
    pet.situacao = document.querySelector('input[name="situacao"]:checked').value;
    pet.tipo = document.querySelector('input[name="tipo"]:checked').value;
    pet.porte = document.querySelector('input[name="porte"]:checked').value;
    pet.raca = document.getElementById('raca').value;
    pet.castrado = document.querySelector('input[name="castrado"]:checked').value;
    pet.vacina = document.querySelector('input[name="vacina"]:checked').value;

    // Atualiza os pets no localStorage
    localStorage.setItem('pets', JSON.stringify(pets));

    alert('Alterações salvas com sucesso!');
    setTimeout(() => {
      window.location.href = 'perfil.html'; // Redireciona para a página de perfil
    }, 1000);
  } else {
    alert('Pet não encontrado!');
  }
}
