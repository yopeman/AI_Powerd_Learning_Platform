import axios from 'axios';
import { v4 as uuidv7 } from 'uuid';
import { Users, Payments, Fields } from '../models/index.js';

async function payment_create(req, res, next) {
    const { fieldId, subscriptionId, year, semester } = req.body;

    // Validate input
    if (!fieldId || !subscriptionId || !year || !semester) {
        return next(createError(400, 'Payment details are required.'));
    }

    try {
        const field = await Fields.findByPk(fieldId);
        if (field.isFree) {
            return next(createError(400, 'Field is free, no payment required.'));
        }

        const amount = 200;
        const paymentId = uuidv7();
        const user = await Users.findByPk(req.user.id);

        const paymentInit = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
            amount,
            currency: 'ETB',
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone,
            tx_ref: paymentId,
            callback_url: `${process.env.DOMAIN}/payments/webhook`,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.CHAPA_SECRET}`,
                'Content-Type': 'application/json'
            }
        });

        if (paymentInit.data.status !== 'success') {
            return next(createError(500, 'Payment initialization failed.'));
        }

        const newPayment = await Payments.create({
            id: paymentId,
            subscriptionId,
            amount,
            checkout_url: paymentInit.data.data.checkout_url,
            year,
            semester
        });

        res.status(201).json({
            message: 'Payment initialized successfully.',
            data: newPayment,
            success: true
        });
    } catch (error) {
        next(createError(500, `Error creating payment: ${error.message}`));
    }
}

async function payment_webhook(req, res, next) {
    const { status, trx_ref } = req.query;

    if (!trx_ref) {
        return next(createError(400, 'Transaction reference is required.'));
    }

    try {
        const payment = await Payments.findByPk(trx_ref);
        if (!payment) {
            return next(createError(404, 'Payment not found.'));
        }

        if (status === 'success') {
            const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${trx_ref}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.CHAPA_SECRET}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 'success') {
                payment.recipt_url = `https://checkout.chapa.co/checkout/test-payment-receipt/${response.data.data.reference}`;
                payment.status = 'completed';
                payment.transactionId = response.data.data.reference;
                payment.method = response.data.data.method;
            } else {
                payment.status = 'failed';
            }
        } else {
            payment.status = 'failed';
        }

        await payment.save();
        res.status(200).json();
    } catch (error) {
        next(createError(500, `Error processing webhook: ${error.message}`));
    }
}

async function payment_get_by_id(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'Payment ID is required.'));
    }

    try {
        const payment = await Payments.findByPk(id);
        if (!payment) {
            return next(createError(404, 'Payment not found.'));
        }

        res.status(200).json({
            message: 'Payment fetched successfully.',
            data: payment,
            success: true
        });
    } catch (error) {
        next(createError(500, `Error fetching payment: ${error.message}`));
    }
}

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

export {
    payment_create,
    payment_webhook,
    payment_get_by_id
}