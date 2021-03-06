

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#msg1');
const message2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log("error: ", data);
                message1.textContent = data.error;
            }else{
                console.log("datataA: ", data);
                message1.textContent = data.address;
                message2.textContent = data.forecastData;
            }
        })   
    })

})