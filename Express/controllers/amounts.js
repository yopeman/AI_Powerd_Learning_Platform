import {Amounts} from "../models/index.js";

// Helper function to create standardized errors
const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

async function amount_get(req, res, next) {
    try {
        const amount = await Amounts.findOne();
        if (!amount) {
            return next(createError(404, 'No payment amount found.'));
        }
        
        res.status(200).json({
            message: 'Payment amount fetched successfully.',
            data: amount,
            success: true,
        });
    } catch (err) {
        console.error('Error fetching amount:', err);
        return next(createError(500, 'An error occurred while fetching the payment amount.'));
    }
}

async function amount_update(req, res, next) {
    try {
        const { amount } = req.body;
        if (amount === undefined) {
            return next(createError(400, 'Amount is required.'));
        }

        const amountRecord = await Amounts.findOne();
        if (!amountRecord) {
            return next(createError(404, 'No payment amount found to update.'));
        }

        amountRecord.amount = amount;
        await amountRecord.save();

        res.status(200).json({
            message: 'Payment amount updated successfully.',
            data: amountRecord,
            success: true,
        });
    } catch (err) {
        console.error('Error updating amount:', err);
        return next(createError(500, 'An error occurred while updating the payment amount.'));
    }
}

export {
    amount_get,
    amount_update,
};