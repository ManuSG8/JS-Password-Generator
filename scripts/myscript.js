const $d = document,
	$generar = $d.querySelector("#generar"),
	$resultado = $d.querySelector("#resultado"),
	$portapapeles = $d.querySelector("#portapapeles"),
	$longitud = $d.querySelector("#longitud"),
	$mayusculas = $d.querySelector("#mayusculas"),
	$minusculas = $d.querySelector("#minusculas"),
	$numeros = $d.querySelector("#numeros"),
	$simbolos = $d.querySelector("#simbolos")

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function generar(arr) {
	let contrasenha = []
	for (let i = 0; i < $longitud.value; i++) {
		let aleatorio1 = random(0, arr.length - 1)
		let aleatorio2 = random(0, arr[aleatorio1].length)
		contrasenha.push(arr[aleatorio1][aleatorio2])
	}
	return contrasenha
}

$generar.addEventListener("click", (event) => {
	const arr = []
	if ($mayusculas.checked) {
		arr.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))
	}
	if ($minusculas.checked) {
		arr.push("abcdefghijklmnopqrstuvwxyz".split(""))
	}
	if ($numeros.checked) {
		arr.push("0123456789".split(""))
	}
	if ($simbolos.checked) {
		arr.push("!·$%&/()?¿ª|@#~½¬{[]}´¨+*`".split(""))
	}

	let criterio
	let contrasenha

	// Comprobamos que la contrasenha cumple con todos los criterios, porque al ser aleatorio,
	// se puede dar casos en los que NO contenga alguno de los simbolos seleccionados, sobretodo en contrasenhas cortas
	do {
		contrasenha = generar(arr)
		criterio = true
		arr.forEach((e) => {
			if (!contrasenha.some((e) => e.includes(e))) criterio = false
		})
	} while (criterio == false)

	$resultado.innerHTML = contrasenha.join("")
})

$portapapeles.addEventListener("click", (event) => {
	navigator.clipboard.writeText($resultado.textContent)
	window.confirm("Copiado!")
})
