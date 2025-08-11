import { Fields, Subscriptions } from '../models/index.js';
import { Op } from 'sequelize';

// Helper function to create standardized errors
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
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
    } catch (error) {
        next(createError(500, 'Error creating subscription.'));
        console.log(error);
        
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
        // Handle unexpected errors
        console.error('Error deleting subscription:', err);
        return next(createError(500, 'An error occurred while deleting the subscription.'));
    }
}

export {
    subscription_create,
    subscription_current_fields,
    subscription_delete
}