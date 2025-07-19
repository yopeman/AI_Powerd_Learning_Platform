import { Interactions } from '../models/index.js';

async function interaction_get(req, res, next) {
    const interactions = await Interactions.findAll({
        where: { userId: user.id }
    });
    res.status(200).json({
        message: 'interaction are fetched',
        data: interactions,
        success: true
    });
}

export {
    interaction_get
}