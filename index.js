function getStations(){
	fetch('https://railway.stepprojects.ge/api/stations')
	.then(res => res.json())
	.then(res => renderStations(res))
}

getStations()

let filterFrom = document.querySelector('.filterFrom')
let filterTo = document.querySelector('.filterTo')
let filterDate = document.querySelector('.filterDate')
let stations =  document.querySelector('.stations')

function renderStations(stationsData){
		const url = new URLSearchParams(window.location.search)
	for (let station of stationsData){
		if (url.get('from') == station.name){
		filterFrom.innerHTML += `
		<option value=${station.name} selected>${station.name}</option>	
		`
		} else {
		filterFrom.innerHTML += `
		<option value=${station.name}>${station.name}</option>	
		`
		}

		if (url.get('to') == station.name){
		filterTo.innerHTML += `
		<option value=${station.name} selected>${station.name}</option>	
		`
		} else {
		filterTo.innerHTML += `
		<option value=${station.name}> ${station.name}</option>	
		`
		}

		filterDate.value = url.get('day')

	   if (stations != null){	
			stations.innerHTML += `
			<h2 value=${station.name} onclick="navigateFilterPage_From(this)">${station.name}</h2>	
			`
		}
	}
}

filterFrom.addEventListener('change', navigateFilterPage)
filterTo.addEventListener('change', navigateFilterPage)
filterDate.addEventListener('input', navigateFilterPage)

function navigateFilterPage(){
	window.location.href = `filterTickets.html?from=${filterFrom.value}&to=${filterTo.value}&day=${filterDate.value}`
}
function navigateFilterPage_From(card){
	window.location.href = `filterTickets.html?from=${card.innerHTML}&to=0&day=`
}


