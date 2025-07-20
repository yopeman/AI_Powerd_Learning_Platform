
import { fn, col } from 'sequelize';
import { Fields, Topics, Subscriptions, Users } from '../models/index.js';

async function analytic_fields(req, res, next) {
  try {
    const total = await Fields.count();

    const freeCount = await Fields.count({ where: { isFree: true } });
    const paidCount = total - freeCount;

    const avgYears = await Fields.findOne({
      attributes: [[fn('AVG', col('years_length')), 'avg_years_length']],
      raw: true
    });

    res.json({
      totalFields: total,
      freeFields: freeCount,
      paidFields: paidCount,
      averageYearsLength: parseFloat(avgYears.avg_years_length).toFixed(2),
    });
  } catch (err) {
    return next(err);
  }
}

async function analytic_topics(req, res, next) {
  try {
    const totalTopics = await Topics.count();

    const perChapter = await Topics.findAll({
      attributes: [
        'chapterId',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'topicCount'],
        [Sequelize.fn('MIN', Sequelize.col('created_at')), 'earliestCreated'],
        [Sequelize.fn('MAX', Sequelize.col('created_at')), 'latestCreated'],
      ],
      group: ['chapterId']
    });

    res.json({
      totalTopics,
      perChapter: perChapter.map(p => p.toJSON())
    });
  } catch (err) {
    return next(err);
  }
}

async function analytic_subscriptions(req, res, next) {
  try {
    const overall = await Subscriptions.findAll({
      attributes: [
        [fn('COUNT', col('id')), 'totalSubscriptions'],
        [fn('AVG', col('learned_topic_numbers')), 'avgLearnedTopics'],
        [fn('SUM', col('learned_topic_numbers')), 'sumLearnedTopics']
      ]
    });

    const byStatus = await Subscriptions.findAll({
      attributes: [
        'status',
        [fn('COUNT', col('id')), 'count'],
        [fn('AVG', col('learned_topic_numbers')), 'avgLearned']
      ],
      group: ['status']
    });

    const byField = await Subscriptions.findAll({
      attributes: [
        'fieldId',
        [fn('COUNT', col('id')), 'subscriptionCount'],
        [fn('AVG', col('learned_topic_numbers')), 'avgLearned']
      ],
      group: ['fieldId']
    });

    res.json({
      overall: overall[0],
      byStatus: byStatus.map(row => row.toJSON()),
      byField: byField.map(row => row.toJSON())
    });
  } catch (err) {
    return next(err);
  }
}

async function analytic_users(req, res, next) {
  try {
    const totalUsers = await Users.count();

    const usersByRole = await Users.findAll({
      attributes: [
        'role',
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['role']
    });

    const usersByDate = await Users.findAll({
      attributes: [
        [fn('DATE', col('created_at')), 'createdDate'],
        [fn('COUNT', col('id')), 'count']
      ],
      group: [literal('DATE(created_at)')],
      order: [[literal('createdDate'), 'ASC']]
    });

    res.json({
      totalUsers,
      usersByRole: usersByRole.map(u => u.toJSON()),
      usersByDate: usersByDate.map(u => u.toJSON())
    });

  } catch (err) {
    return next(err);
  }
}

export {
    analytic_fields,
    analytic_topics,
    analytic_subscriptions,
    analytic_users
}