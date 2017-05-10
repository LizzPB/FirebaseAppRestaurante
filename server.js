var express = require('express');
var app = express();
//ruteo de archivos estáticos
app.use(express.static(__dirname + '/'));
//llamado al index
app.get('/',function(request, response){
  response.sendFile(__dirname + 'index.html');
});
//puerto en escucha del servidor
app.listen(3000, function(){
  console.log('Server Express Ready!');
});