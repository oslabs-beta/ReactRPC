//Library includes
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.use(bodyParser());

app.use('/build', express.static(path.resolve(__dirname, '../build/')));

//Send the main page 
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.post('/restful', (req, res) => {
    const str = req.body.data;
    res.status(200).json({message: str});
});

//Unhandled request handler
app.use((req, res) => {
    res.sendStatus(404);
})

//Global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal server error');
})

//Listen on the port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});