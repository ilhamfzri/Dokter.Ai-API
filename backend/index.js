
const express = require('express');
const bodyParser = require('body-parser');
const diseasesRoutes = require('./routes/diseasesRoutes');
const symptomsRoutes = require('./routes/symptomsRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use('/diseases',diseasesRoutes);
app.use('/symptoms',symptomsRoutes);
app.use('/question',questionRoutes);

app.listen(PORT, ()=> console.log(`Server Running On Port : https://localhost:${PORT}`));
app.get('/',(req, res) =>{
    console.log('Connection Sucessful');
    res.send("Connection Sucessful");
});