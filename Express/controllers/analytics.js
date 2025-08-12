import { Fields, Topics, Subscriptions, Users, Payments, sequelize, Feedbacks, Results } from '../models/index.js';
import { Op } from 'sequelize';

async function analytic_fields(req, res, next) {
    try {
        const totalFields = await Fields.count();
        const freeFields = await Fields.count({ where: { isFree: true } });

        res.json({
            message: 'Field analytic are fetched successfully',
            data: {
                totalFields,
                freeFields,
                paidFields: totalFields - freeFields
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function analytic_topics(req, res, next) {
    try {
        const totalTopics = await Topics.count();
        const topicsWithContent = await Topics.count({
            where: {
                content_file_path: {
                    [Op.ne]: null
                }
            }
        });

        res.json({
            message: 'Topic analytic are fetched successfully',
            data: {
                totalTopics,
                topicsWithContent,
                topicsWithoutContent: totalTopics - topicsWithContent
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function analytic_subscriptions(req, res, next) {
    try {
        const totalSubscriptions = await Subscriptions.count();
        const activeSubscriptions = await Subscriptions.count({
            where: { status: 'active' }
        });

        const avgLearnedTopics = await Subscriptions.findAll({
            attributes: [[sequelize.fn('AVG', sequelize.col('learned_topic_numbers')), 'avgLearned']],
            raw: true
        });

        res.json({
            message: 'Subscription analytic are fetched successfully',
            data: {
                totalSubscriptions,
                activeSubscriptions,
                inactiveSubscriptions: totalSubscriptions - activeSubscriptions,
                avgLearnedTopics: parseFloat(avgLearnedTopics[0].avgLearned || 0).toFixed(2)
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function analytic_users(req, res, next) {
    try {
        const totalUsers = await Users.count();
        const roleCounts = await Users.findAll({
            attributes: ['role', [sequelize.fn('COUNT', sequelize.col('role')), 'count']],
            group: ['role'],
            raw: true
        });

        const breakdown = roleCounts.reduce((acc, role) => {
            acc[role.role] = parseInt(role.count);
            return acc;
        }, {});

        res.json({
            message: 'User analytic are fetched successfully',
            data: {
                totalUsers,
                ...breakdown
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function analytic_payments(req, res, next) {
    try {
        const totalPayments = await Payments.count();
        const completedPayments = await Payments.count({
            where: { status: 'completed' }
        });

        const totalRevenue = await Payments.sum('amount', {
            where: { status: 'completed' }
        });

        const pendingPayments = await Payments.count({
            where: { status: 'pending' }
        });

        res.json({
            message: 'Payment analytic are fetched successfully',
            data: {
                totalPayments,
                completedPayments,
                pendingPayments,
                failedPayments: totalPayments - completedPayments - pendingPayments,
                totalRevenue: parseFloat(totalRevenue || 0).toFixed(2)
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function analytic_feedbacks(req, res, next) {
    try {
        const totalFeedbacks = await Feedbacks.count();
        const averageRating = await Feedbacks.findOne({
        attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'average']],
        });
    

        res.status(200).json({
            message: 'Feedback analytic are fetched successfully',
            data: {
                totalFeedbacks,
                averageRating: averageRating ? parseFloat(averageRating.dataValues.average) : 0,
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function analytic_certifications(req, res, next) {
    try {
        const totalResults = await Results.count();
        const averageScore = await Results.findOne({
        attributes: [[sequelize.fn('AVG', sequelize.col('value')), 'average']],
        });

        res.status(200).json({
            message: 'Certification Result analytic are fetched successfully',
            data: {
                totalResults,
                averageScore: averageScore ? parseFloat(averageScore.dataValues.average) : 0,
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

export {
    analytic_fields,
    analytic_topics,
    analytic_subscriptions,
    analytic_users,
    analytic_payments,
    analytic_feedbacks,
    analytic_certifications
};
