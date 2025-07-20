import axios from 'axios';
import { Payments } from '../models/index.js';

async function payment_webhook(req, res, next) {
    const { status, trx_ref } = req.query;
    if (!trx_ref) {
        const e = new Error('payment is failed');
        e.status = 500;
        return next(e);
    }

    const payment = await Payments.findByPk(trx_ref);
    if (status === 'success') {
        const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${trx_ref}`, {
            'Authorization': `Bearer ${process.env.CHAPA_SECRET}`,
            'Content-Type': 'application/json'
        });
        const pay_response = response.data;

        if (pay_response.status === 'success') {
            payment.recipt_url = `https://checkout.chapa.co/checkout/test-payment-receipt/${pay_response.data.reference}`;
            payment.status = 'completed';
            payment.transactionId = pay_response.data.reference;
            await payment.save();
        } else {
            payment.status = 'failed';
            await payment.save();
        }
    } else {
        payment.status = 'failed';
        await payment.save();
    }

    res.status(200).json();
}

async function payment_get_by_id(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('payment id are required');
        e.status = 400;
        return next(e);
    }

    const payment = await Payments.findByPk(id);
    if (!payment) {
        const e = new Error('payment are not found');
        e.status = 404;
        return next(e);
    }

    res.status(200).json({
        message: 'payment are fetched',
        data: payment,
        success: true
    });
}

export {
    payment_webhook,
    payment_get_by_id
}