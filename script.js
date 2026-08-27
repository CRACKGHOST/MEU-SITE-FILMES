const API_KEY = '19054f1a2741c836dea8692d698fd52f'
let pagina = 1
let tipoAtual = 'trending'

async function carregar(tipo = 'trending', page = 1) {
	tipoAtual = tipo
	const urls = {
		trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=pt-BR&page=${page}`,
		populares: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`,
		series: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`,
		animes: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=16&page=${page}`
	}

	const res = await fetch(urls[tipo])
	const dados = await res.json()

	const html = dados.results.map(f => `
		<div class="card">
			<img src="https://image.tmdb.org/t/p/w300${f.poster_path}">
			<h3>${f.title || f.name}</h3>
		</div>
	`).join('')

	if (page === 1) {
		document.getElementById('filmes').innerHTML = html
	} else {
		document.getElementById('filmes').innerHTML += html
	}

	pagina = page
}

carregar('trending')

document.getElementById('tipo').addEventListener('change', e => {
	pagina = 1
	carregar(e.target.value)
})

document.getElementById('carregarMais').addEventListener('click', () => {
	carregar(tipoAtual, pagina + 1)
})
