function getFlights(){
	fetch('https://railway.stepprojects.ge/api/trains')
	.then(res => res.json())
	.then(res => displayFlights(res)) 
}

getFlights()

async function displayFlights(flightsData){
	let flights = document.querySelector('.flights')

   let days = ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
	let date = new Date(filterDate.value)
	let weekDay = days[date.getDay()]

	for (let fligth of flightsData){
		if (
		(	filterFrom.value == 0 || filterFrom.value == fligth.from	) && 
		(	filterTo.value == 0 || filterTo.value == fligth.to	) && 
		(	filterDate.value  == '' || weekDay == fligth.date	)
		) {
			flights.innerHTML += `
			<section onclick="navigateBuyPage(${fligth.id})">
					<h2>გასვლა: ${fligth.from}-${fligth.date}-${fligth.departure}</h2>
					<h2>ჩამოსვლა: ${fligth.to}-${fligth.arrive}</h2>
			</section>
			`
		}
	}
}

function navigateBuyPage(trainId){
	window.location.href = `buyTickets.html?trainId=${trainId}`
}

