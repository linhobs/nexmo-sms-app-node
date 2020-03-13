const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const Nexmo=require('nexmo');
const socketio=require('socket.io');

//initialize app
const app=express();
app.set('view engine','html')
app.engine('html',ejs.renderFile)

//public folder set up
app.use(express.static(__dirname+'/public'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//routes handling
app.get('/',(req,res)=>{
    res.render('index');
})

//catch for submit
app.post('/',(req,res)=>{
//    res.send(req.body)
//    console.log(req.body)
const from = 'Pius';
const number=req.body.number;
const text=req.body.text;
//implement sms
const nexmo = new Nexmo({

  });
  nexmo.message.sendSms(from,number,text,(err,responseData)=>{
      if(err){
          console.log(err)
      }
      else{
          console.dir(responseData);
          //get data from the response
          const data={
              id:responseData.messages[0]['message-id'],
              number:responseData.messages[0]['to']
          }
          //emit to client.
          io.emit('smsStatus',data)
      }
  })





});

//set up server
const port=3000;
const server=app.listen(port,()=>{
    console.log('server running on ',port);
})

//connect to socket.io
const io=socketio(server);
io.on('connection',(socket)=>{
    console.log('connected to socket');
    io.on('disconnect',()=>{
        console.log('disconnectec');
    })
})