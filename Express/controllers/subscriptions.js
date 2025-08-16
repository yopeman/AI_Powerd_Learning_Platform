import { Fields, Subscriptions } from '../models/index.js';
import { Op } from 'sequelize';
import { createError } from '../utilities/error-handlers.js';

async function subscription_get_by_id(req, res, next) {
    const { id } = req.params;

    // Validate subscription ID
    if (!id) {
        return next(createError(400, 'Subscription ID is required.'));
    }

    try {
        const subscription = await Subscriptions.findByPk(id);

        if (!subscription) {
            return next(createError(404, 'Subscription not found.'));
        }

        res.status(200).json({
            message: 'Subscription fetched successfully.',
            data: subscription,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

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

        if (!subscriptions || subscriptions.length === 0) {
            return next(createError(404, 'No subscriptions found for this user.'));
        }

        const subscriptionIds = subscriptions.map(subscription => subscription.fieldId);
        const fields = await Fields.findAll({
            where: {
                id: { [Op.in]: subscriptionIds },
                status: 'active'
            }
        });

        res.status(200).json({
            message: 'Subscriptions and fields fetched successfully.',
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
        const { role, id: userId } = req.user;
        const whereCondition = role === 'admin' ? { id } : { id, userId };

        if (role !== 'admin' && role !== 'student') {
            return next(createError(403, 'You do not have the required privileges.'));
        }

        const deletedSubscription = await Subscriptions.destroy({ where: whereCondition });

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
    subscription_get_by_id,
    subscription_create,
    subscription_current_fields,
    subscription_delete
}