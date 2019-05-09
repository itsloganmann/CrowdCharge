console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})
const fetchLocation = (search) => {
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(search)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// Adds listener and stops page from reloading after the event.
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchLocation(search.value);
})