const artistas = [
  {
    id: 1,
    nome: "Olivia Dean",
    genero: "Neo Soul",
    descricao: "Olivia Lauryn Dean é uma cantora neo soul inglesa. Em 2021, foi nomeada Artista Revelação do ano pela Amazon Music, em 2023, foi selecionado como Artista Revelação do Ano pela BBC Music e entrou na shortlist do Mercury Prize. Em 2024, foi indicada a três BRIT Awards, incluindo artista do ano.",
    imagem: "assets/imgs/oliviadean.png",
    redes: {
      instagram: "https://www.instagram.com/oliviadeano?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      spotify: "https://open.spotify.com/intl-pt/artist/00x1fYSGhdqScXBRpSj3DW?si=nOO9D3LXRRCQtw67JyiPWw"
    }

  },
  {
    id: 2,
    nome: "Ben Platt",
    genero: "Pop",
    descricao: "Benjamin Schiff Platt é um ator e cantor dos Estados Unidos. Ele é conhecido principalmente por seu trabalho na Broadway como o personagem-título em Dear Evan Hansen e como Elder Arnold Cunningham em The Book of Mormon.",
    imagem: "assets/imgs/ben platt.jpg",
    redes: {
      instagram: "https://www.instagram.com/bensplatt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      spotify: "https://open.spotify.com/intl-pt/artist/6qGkLCMQkNGOJ079iEcC5k?si=bHEGjFG8SQebayIvjXCOQw"
    }
  },
  {
    id: 3,
    nome: "Raye",
    genero: "Pop",
    descricao: "Rachel Agatha Keen, conhecida como Raye, é uma cantora e compositora britânica. Ela ganhou destaque pela primeira vez após assinar com a Polydor Records, e mais tarde com suas colaborações de 2016, By Your Side e  You Don't Know Me com Jonas Blue e Jax Jones, respectivamente.",
    imagem: "assets/imgs/raye.png",
    redes: {
      instagram: "https://www.instagram.com/raye?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      spotify: "https://open.spotify.com/intl-pt/artist/5KKpBU5eC2tJDzf0wmlRp2?si=ZMy6Ka-rSy-aG9A0gp2r3w"
    }
  },
  {
    id: 4,
    nome: "Kehlani",
    genero: "R&B",
    descricao: "Kehlani Ashley Parrish, conhecida profissionalmente como Kehlani, é uma cantora e compositora de R&B e hip hop americana. Kehlani é originalmente de Oakland, Califórnia, onde ela alcançou a fama inicial como um membro do grupo de pop adolescente, PopLyfe, que foi finalista no programa de TV America's Got Talent.",
    imagem: "assets/imgs/kehlani.jpg",
    redes: {
      instagram: "https://www.instagram.com/kehlani?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      spotify: "https://open.spotify.com/intl-pt/artist/0cGUm45nv7Z6M6qdXYQGTX?si=dNbS9ZkhSG6Uoe_6dKD3lQ"
    }
  }
];

/*generos musicais*/

[
  {
    "id": 1,
    "nome": "Indie Rock",
    "descricao": "Artistas de Indie Rock.",
    "imagem": "imgs/Sonic-Youth-1.jpg",
    "artistas": [1, 2]
  },
  {
    "id": 2,
    "nome": "Rock",
    "descricao": "Artistas de Rock.",
    "imagem": "imgs/rock.jpg",
    "artistas": [3]
  },
  {
    "id": 3,
    "nome": "Pop",
    "descricao": "Artistas Pop populares.",
    "imagem": "imgs/pop.webp",
    "artistas": [2, 3]
  },
  {
    "id": 4,
    "nome": "Jazz",
    "descricao": "Artistas de Jazz.",
    "imagem": "imgs/jazz.webp",
    "artistas": []
  },
  {
    "id": 5,
    "nome": "R&B",
    "descricao": "Artistas de R&B.",
    "imagem": "imgs/r&b.jpeg",
    "artistas": [4]
  },
  {
    "id": 6,
    "nome": "Hip Hop",
    "descricao": "Artistas de Hip Hop.",
    "imagem": "imgs/hip-hop.webp",
    "artistas": []
  }
]

const carouselInner = document.querySelector(".carousel-inner");

if (carouselInner) {
  artistas.forEach((artista, index) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    item.innerHTML = `
      <div class="main-artists">
        <img class="artists d-block w-100" src="${artista.imagem}" alt="Foto de ${artista.nome}">
        <h2 class="nomes-artistas">${artista.nome}</h2>
        <div class="conteudo-artista">
          <article>${artista.descricao}</article>
          <a href="detalhes.html?id=${artista.id}">
            <button>Ouvir Agora</button>
          </a>
        </div>
      </div>
    `;
    carouselInner.appendChild(item);
  });
}


const params = new URLSearchParams(window.location.search);
const idArtista = parseInt(params.get("id"));
const detalhesContainer = document.getElementById("detalhes-artista");

if (detalhesContainer && idArtista) {
  const artista = artistas.find(a => a.id === idArtista);
  if (artista) {
    detalhesContainer.innerHTML = `
      <img src="${artista.imagem}" alt="${artista.nome}" class="detalhe-img">
      <h1>${artista.nome}</h1>
      <h3>${artista.genero}</h3>
      <p>${artista.descricao}</p>
      <div class="redes-detalhes">
        <a href="${artista.redes.instagram}" target="_blank">Instagram</a>
        <a href="${artista.redes.spotify}" target="_blank">Spotify</a>
      </div>
    `;
  } else {
    detalhesContainer.innerHTML = `<p>Artista não encontrado.</p>`;
  }
}



const API_URL = "http://localhost:3000/artistas";
const lista = document.getElementById("lista-artistas");

//  mostrar os artistas
async function carregarArtistas() {
  const res = await fetch(API_URL);
  const artistas = await res.json();
  lista.innerHTML = "";

  artistas.forEach((a) => {
    lista.innerHTML += `
      <div class="artista-card">
        <img src="${a.imagem}" alt="${a.nome}" width="100">
        <h3>${a.nome}</h3>
        <p>${a.genero}</p>
        <button onclick="editarArtista('${a.id}')">Editar</button>
        <button onclick="excluirArtista('${a.id}')">Excluir</button>
      </div>
    `;
  });
}

// criar
async function cadastrarArtista() {
  const nome = document.getElementById("nome").value;
  const genero = document.getElementById("genero").value;

  const novo = {
    id: crypto.randomUUID(),
    nome,
    genero,
    descricao: "",
    imagem: "",
    redes: {}
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  });

  carregarArtistas();
}

// editar
async function editarArtista(id) {
  const novoNome = prompt("Novo nome:");
  if (!novoNome) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: novoNome })
  });

  carregarArtistas();
}

// delete
async function excluirArtista(id) {
  if (confirm("Deseja excluir este artista?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarArtistas();
  }
}


carregarArtistas();