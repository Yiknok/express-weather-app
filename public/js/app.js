console.log('Js consoe log from static file!')

const locationForm=document.querySelector('form')
const inputElement=document.querySelector('input')
let message1=document.querySelector('#message-1')
let message2=document.querySelector('#message-2')


locationForm.addEventListener('submit', (event)=>{

    event.preventDefault()

    const location = inputElement.value
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{ 
    response.json().then((data)=>{
        if(data.error){
            message1.textContent='Error'
            message2.textContent=data.error
        }else{
            message1.textContent=data.location
            message2.textContent=data.message
        }
    })
})
})