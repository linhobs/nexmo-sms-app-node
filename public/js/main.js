const numberInput=document.getElementById('number');
textInput=document.getElementById('msg');
 button=document.getElementById('button');
response=document.querySelector('.response');

button.addEventListener('click',send,false);
const socket=io();
socket.on('smsStatus',function(data){
    response.innerHTML='<h5> text message sent to '+data.number+'</h5>'
})

function send(){
    console.log('button clicked');
    const number=numberInput.value.replace(/\D/g,'');
    const text=textInput.value;
    //make request to api request. our api is siting in the app as well
    fetch('/',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:  JSON.stringify({number:number,text:text})
    }).then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}