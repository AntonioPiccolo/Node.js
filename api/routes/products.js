const express = require(`express`);
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Richiesta di GET'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Richiesta di POST',
        CREATED_Product: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'Questo è l`ID speciale',
            id: id
        });
    } 
    else{
        res.status(200).json({
            message: 'Non hai trovato ID speciale'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Aggiornato con PATCH'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Cancellato il prodotto!'
    });
});


module.exports = router;