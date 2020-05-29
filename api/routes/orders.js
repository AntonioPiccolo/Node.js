const express = require(`express`);
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Ordini GET"
    });
});

router.post('/', (req, res, next) => {
    const order = {
        orderID: req.body.orderID,
        quantity: req.body.quantity 
    }
    res.status(201).json({
        message: 'Ordine creato!',
        CREATED_order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Dettagli dell`ordine',
        orderID: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'L`ordine '+req.params.orderId+' è stato eliminato!',
        DELETED_order: req.params.orderId
    });
});


module.exports = router;