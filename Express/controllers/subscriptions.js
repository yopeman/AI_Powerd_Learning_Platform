import { uuidv4 } from '../models/config.js';
import { Payments, Subscriptions, Users } from '../models/index.js';
import axios from 'axios';
import { find_fields } from '../utilities/finds.js';

async function subscription_create(req, res, next) {
    const { userId, fieldId } = req.body;
    if (!userId || !fieldId) {
        const e = new Error('subscription detail are required');
        e.status = 400;
        return next(e);
    }

    const new_subscription = await Subscriptions.create({
        userId: userId,
        fieldId: fieldId
    });

    if (!new_subscription) {
        const e = new Error('subscription are not created');
        e.status = 500;
        return next(e);
    }
    
    let new_payment;
    const field_info = await find_fields(fieldId);
    if (field_info.fields.isFree) {
        let amount = 100;
        const payment_id = uuidv4();
        const user = await Users.findByPk(userId);
        const payment_init = await axios.post('https://api.chapa.co/v1/transaction/initialize', {
            amount: amount,
            currency: 'ETB',
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone,
            tx_ref: payment_id,
            callback_url: `${process.env.DOMMAIN}/payments/webhook`,
            // return_url: 'https://www.google.com/',
        }, {
            'Authorization': `Bearer ${process.env.CHAPA_SECRET}`,
            'Content-Type': 'application/json'
        });
                
        const payment_info = payment_init.data;
        if (payment_info.status != 'success') {
            const e = new Error('payment is not enitailized');
            e.status = 500;
            return next(e);
        }

        new_payment = await Payments.create({
            id: payment_id,
            subscriptionId: new_subscription.id,
            amount: amount,
            checkout_url: payment_info.data.checkout_url,
        });
    }

    res.status(201).json({
        message: 'subscription are created',
        data: {
            ...new_subscription,
            ...new_payment
        },
        success: true
    });
}

async function subscription_get(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('subscription id are required');
        e.status = 400;
        return next(e);
    }

    const subscription = await Subscriptions.findByPk(id);
    if (!subscription) {
        const e = new Error('subscription are not found');
        e.status = 404;
        return next(e);
    }

    res.status(200).json({
        message: 'subscription are fetched',
        data: subscription,
        success: true
    });
}

async function subscription_cancel(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('subscription id are required');
        e.status = 400;
        return next(e);
    }

    const canceld_subscription = await Subscriptions.findByPk(id);
    if (!canceld_subscription) {
        const e = new Error('subscription are not found');
        e.status = 404;
        return next(e);
    }

    canceld_subscription.status = 'inactive';
    await canceld_subscription.save();
    res.status(201).json({
        message: 'subscription are canceled',
        data: canceld_subscription,
        success: true
    });
}

export {
    subscription_create,
    subscription_get,
    subscription_cancel
}