let trainData = document.querySelector('.trainData')
let ticketClasses = document.querySelector('.ticketClasses')
let classesDiv = document.querySelector('.classesDiv')
let price = document.querySelector('.price')
let buyBTN = document.querySelector('.buyTickets')
let ticketsData = document.querySelector('.tickets')
let priceToPay = 0
let cart = []

function getTrainData(){
	if (localStorage.getItem('lastprice') == null){
		price.innerHTML= `გადასახდელი თანხა: 0₾`
	} else {
		price.innerHTML= `გადასახდელი თანხა: ${localStorage.getItem('lastprice')}₾`
	}

	const url = new URLSearchParams(window.location.search)
   let trainId = url.get('trainId')

	fetch(`https://railway.stepprojects.ge/api/trains/${trainId}`)
	.then(res => res.json())
	.then(res => renderTrain(res)) 
}

getTrainData()

function renderTrain(data){

	trainData.innerHTML = `
	<h2>გასვლა: ${data.from}-${data.date}-${data.departure}</h2>
	<h2>ჩამოსვლა: ${data.to}-${data.arrive}</h2>
	`
	
	for (let vagon of data.vagons){ 
		ticketClasses.innerHTML += `
		<option value="${vagon.id}">${vagon.name}</option>
	`
	}

}

ticketClasses.addEventListener('change', function(){
	showCost()
	if (this.value == 0){
	let tempClassPrize = document.querySelector('.classPrize')
	if (tempClassPrize != null){
		tempClassPrize.remove()
	}
	ticketsData.innerHTML = ''
	} else {
		fetch(`https://railway.stepprojects.ge/api/getvagon/${this.value}`)
		.then(res => res.json())
		.then(res => filterTickets(res))
	}
})

function filterTickets(data){
	let tempClassPrize = document.querySelector('.classPrize')
	if (tempClassPrize != null){
		tempClassPrize.remove()
	}
	
	let classPrize = document.createElement('h2')
	classPrize.className = 'classPrize'
	classPrize.innerHTML = `ფასი: ${data[0].seats[0].price}₾`
	classesDiv.appendChild(classPrize)

	ticketsData.innerHTML = ''

	for (let seat of data[0].seats){
		if (localStorage.getItem(seat.number) == seat.price){
			if (!cart.some(number => number.number == seat.number)){
				cart.push({ number: seat.number, price: seat.price })
			}
		
			ticketsData.innerHTML += `
			<button class="seatBTN" style="background-color: rgb(255, 50, 50)" onclick="addTicket(this, ${seat.price})">${seat.number}</button>
			`
		} else {
			ticketsData.innerHTML += `
			<button class="seatBTN" onclick="addTicket(this, ${seat.price})">${seat.number}</button>
			`
		}
	}

	showCost()
}

function addTicket(btn, price){
	if (btn.style.backgroundColor == 'rgb(255, 50, 50)'){
		btn.style.backgroundColor = 'white'
		cart = cart.filter(seat => seat.number != btn.innerHTML)
		console.log(cart)
		localStorage.removeItem(btn.innerHTML, price)
	} else {
		btn.style.backgroundColor = 'rgb(255, 50, 50)'	
		cart.push({ number: btn.innerHTML, price: price })
		localStorage.setItem(btn.innerHTML, price);
	}

	showCost()
	saveCost()
}

function saveCost(){
	localStorage.setItem('lastprice', `${priceToPay}`)
}

function setCost(){
	if (localStorage.getItem('lastprice') != null){
	priceToPay = Number(localStorage.getItem('lastprice'))
	}
	showCost()
}

function showCost(){
	priceToPay = 0
	for (let ticket of cart){
		priceToPay += ticket.price
	}
	price.innerHTML= `გადასახდელი თანხა: ${priceToPay}₾`
}

buyBTN.addEventListener('click', function() {
    if (priceToPay == 0) {
			saveCost()
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "სამწუხაროდ გადახდა ვერ მოხერხდა!",
        });
    } else {
        Swal.fire({
            title: "გადახდა მოხერხდა წარმატებით!",
            icon: "success",
        }).then(() => {
            window.location.href = 'index.html';
        });
    }
});

