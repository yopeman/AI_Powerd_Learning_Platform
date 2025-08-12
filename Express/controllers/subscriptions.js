import { Fields, Subscriptions } from '../models/index.js';
import { Op } from 'sequelize';

async function subscription_create(req, res, next) {
    const { fieldId } = req.body;
    const userId = req.user.id;

    if (!userId || !fieldId) {
        return next(createError(400, 'Subscription details are required.'));
    }

    try {
        const new_subscription = await Subscriptions.create({ userId, fieldId });

        res.status(201).json({
            message: 'Subscription created successfully.',
            data: new_subscription,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function subscription_current_fields(req, res, next) {
    const userId = req.user.id;

    try {
        const subscriptions = await Subscriptions.findAll({ where: { userId } });

        if (!subscriptions.length) {
            return next(createError(404, 'No subscriptions found for this user.'));
        }

        const subscriptionIds = subscriptions.map(s => s.fieldId);
        const fields = await Fields.findAll({
            where: { id: { [Op.in]: subscriptionIds } }
        });

        res.status(200).json({
            message: 'Subscriptions fetched successfully.',
            data: { subscriptions, fields },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function subscription_delete(req, res, next) {
    const { id } = req.params;

    // Validate subscription ID
    if (!id) {
        return next(createError(400, 'Subscription ID is required.'));
    }

    try {
        const deletedSubscription = await Subscriptions.destroy({
            where: {
                id,
                userId: req.user.id // Implicitly checks for user ID
            }
        });

        // Check if deletion was successful
        if (!deletedSubscription) {
            return next(createError(404, 'Subscription not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Subscription deleted successfully.',
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

export {
    subscription_create,
    subscription_current_fields,
    subscription_delete
}