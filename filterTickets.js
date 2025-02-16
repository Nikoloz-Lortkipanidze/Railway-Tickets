function getFlights(){
	fetch('https://railway.stepprojects.ge/api/trains')
	.then(res => res.json())
	.then(res => displayFlights(res)) 
}

getFlights()

function displayFlights(flightsData){
	let flights = document.querySelector('.flights')

   let days = ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
	let date = new Date(filterDate.value)
	let weekDay = days[date.getDay()]

	for (let fligth of flightsData){
		console.log(filterFrom.value, fligth.from, fligth.from == filterFrom.value)
		if (
		(	filterFrom.value == 0 || filterFrom == fligth.from	) && 
		(	filterTo.value == 0 || filterTo == fligth.to	) && 
		(	weekDay == '' || weekDay == fligth.date	)
		) {
			flights.innerHTML += `
			<div>
			<h2>მარშრუტი: ${fligth.name}</h2>
			<h2>გასვლა-დაბრუნება: ${fligtht.departure}-${fligth.arrive}</h2>
			</div>
			`
		}
	}
}


