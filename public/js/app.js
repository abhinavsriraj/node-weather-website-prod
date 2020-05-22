const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

document.querySelector('#current-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('your browser is doesnt support geo location')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        messageone.textContent = 'loading'

    })
})



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
    messageone.textContent = 'loading'

    fetch('http://localhost:5000/weather?address=' +  search.value + '').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageone.textContent = data.error
            } else {
                messageone.textContent = data.forecast
                messagetwo.textContent = data.Weather_location
            }

        })
    })
})