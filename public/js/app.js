  const weatherForm = document.querySelector('form')
  const search = document.querySelector('input')
  const messageOne = document.querySelector('#message-one')
  const messageTwo = document.querySelector('#message-two') 
  const forecastImg = document.querySelector('#forecast-image') 

  weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address= ' + location + '')
    .then((response)=> {
      response.json()
      .then((data) => {
        if(data.error) {
          messageOne.textContent = data.error
        }
        else {
          let Img = document.createElement('img')
          Img.src = data.icon
          Img.width = '200'
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
          forecastImg.appendChild(Img)
        }
    
        })
      })
  })