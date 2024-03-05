/// <reference path="../microsoft/signalr/dist/browser/signalr.js" />


'use strict';


var username = prompt("enter your name", "DITC");

var hubBuilder = new signalR.HubConnectionBuilder();
var connection = hubBuilder.withUrl("/chathub").build();




connection.on("msgRcv", function (user, message) {
    var a = document.createElement("li");


    a.textContent = `${user} : ${message}`;

    $('#chatLog').append(a);


});

connection.on("imgRcv", function (user, imgData) {


    var img = document.createElement('img');

    img.src = imgData;
    var li = document.createElement('li');
    var br = document.createElement('br');
    li.append(user);
    li.appendChild(br);
    li.appendChild(img);
    $('#chatLog').append(li);




});



connection.on("selfMsg", function (message) {
    var a = document.createElement("li");


    a.textContent = `(self) : ${message}`;

    $(a).appendTo($('#chatLog'));


});


connection.start();


$('#btnSend').on('click', function () {

    var message = $('#txtInput').val();

    connection.invoke("Share", username, message);
    $('#txtInput').val(null);
})

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

    });
}

$('#userFile').on('change', async (e) => {
    // Get a reference to the file
    const file = e.target.files[0];


    var baseData = await getBase64(file);
    connection.invoke("ShareImage", username, baseData);


});

$('#dropbox').on('dragenter', (evt) => evt.preventDefault());
$('#dropbox').on('dragover', (evt) => evt.preventDefault());

$('#dropbox').on('drop', UploadFile);

async function UploadFile(evt) {

    evt.preventDefault();

    var file = evt.originalEvent.dataTransfer.files[0];

    if (file.size > 1 * 1024 * 1024) {
        alert(`invalid sile size: ${file.size}`);
        return;
    }



    if (!(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg')) return;

    var baseData = await getBase64(file);
    connection.invoke("ShareImage", username, baseData);

}