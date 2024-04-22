const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/selecao-pitang-frontend'));

app.get('/*', (req, res)=>{
    res.sendFile('index.html', {root: 'dist/selecao-pitang-frontend/'})
});
/*app.all('/*', (req, res)=>{
    res.status(200).sendFile(__dirname + '/dist/index.html');
});*/

app.listen(process.env.PORT || 8080);