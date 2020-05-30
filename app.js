const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');     // Imposto i routes per le richieste dei prodotti
const orderRoutes = require('./api/routes/orders');         // Imposto i routes per le richieste degli ordini

mongoose.connect('mongodb+srv://nodejs:' + process.env.MONGO_ATLAS_PW + '@node-exemple-kjcjp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

app.use(morgan('dev'));                                     // Il server restart automaticamente ad ogni modifica dei files
app.use(bodyParser.urlencoded({extended: false}));          // Permetto di leggere i dati in entrata (URL-encoded)
app.use(bodyParser.json());                                 // Permetto di leggere i dati in entrata (JSON)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');         // Accetto tutti gli host che riechiedono l`acccesso (o ad esempio: 'https://www.alfornareto.it/')
    res.header('Access-Control-Allow-Headers', '*');        // Tutte le richieste possono essere accettate (o ad esempio: 'Origin, Accept, Authorization')
    if(req.method === 'OPTIONS'){                           // Browser invia sempre un OPTIONS prima di inviare i metodi GET, POST... per vedere se può fare questa richiesta
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');    // Ritorna inviando al browser i metodi accettati
        return res.status(200).json({})
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {                               // Catturo gli errori se non eseguo gli 'app.use' precedenti
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {                        // Catturo gli errori se non eseguo gli 'app.use' precedenti
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;