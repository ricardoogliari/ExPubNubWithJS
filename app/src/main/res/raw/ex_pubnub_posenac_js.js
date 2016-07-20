var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-2e25ef2a-b358-437e-938d-cca47b438d56",
    subscribe_key : "sub-c-6814b2de-4934-11e6-85a4-0619f8945a4f"
});
  
/* ---------------------------------------------------------------------------
Publish Messages
--------------------------------------------------------------------------- */
var messageLigou = { "msg": "Ligou" };
var messageDesligou = { "msg": "Desligou"};
  
/* ---------------------------------------------------------------------------
Listen for Messages
--------------------------------------------------------------------------- */
pubnub.subscribe({
    channel  : "my_channel",
    message : function(message) {
        console.log( " > ", message );
    }
});

var express = require('express');
var app = express();

var five = require('johnny-five');
var board = new five.Board();

var led1;
var led2;

var server = app.listen(8080);

board.on("ready", function(){
        console.log("Arduino Conectado");
        led1 = new five.Led(13);
        led2 = new five.Led(8);
});

console.log('Servidor Express iniciado na porta %s', server.address().port);

app.get('/ligar', function(req, res){
        led1.on();
        led2.on();
        res.send('Ligado');
pubnub.publish({
    channel   : 'my_channel',
    message   : messageLigou,
    callback  : function(e) {
        console.log( "SUCCESS!", e );
    },
    error     : function(e) {
        console.log( "FAILED! RETRY PUBLISH!", e );
    }
});
});

app.get('/desligar', function(req, res){
        led1.off();
        led2.off();
        res.send('Ligado');
pubnub.publish({
    channel   : 'my_channel',
    message   : messageDesligou,
    callback  : function(e) {
        console.log( "SUCCESS!", e );
    },
    error     : function(e) {
        console.log( "FAILED! RETRY PUBLISH!", e );
    }
});
});

