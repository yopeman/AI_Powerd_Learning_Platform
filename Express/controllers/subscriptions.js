import { Fields, Subscriptions } from '../models/index.js';
import { Op } from 'sequelize';

// Helper function to create standardized errors
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

async function subscription_create(req, res, next) {
    const { userId, fieldId } = req.body;

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
    } catch (error) {
        next(createError(500, 'Error creating subscription.'));
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
    } catch (error) {
        console.log(error);
        
        next(createError(500, 'Error fetching subscriptions.'));
    }
}

async function subscription_cancel(req, res, next) {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return next(createError(400, 'Subscription ID is required.'));
    }

    try {
        const [updated] = await Subscriptions.update(
            { status: 'inactive' },
            {
                where: {
                    [Op.and]: [
                        { id },
                        { userId }
                    ]
                }
            }
        );

        if (!updated) {
            return next(createError(404, 'Subscription not found.'));
        }

        res.status(200).json({
            message: 'Subscription canceled successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error canceling subscription.'));
    }
}

export {
    subscription_create,
    subscription_current_fields,
    subscription_cancel
}