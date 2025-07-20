import { sequelize } from './config.js';
import Fields from './fields.js';
import Courses from './courses.js';
import Chapters from './chapters.js';
import Topics from './topics.js';
import Users from './users.js';
import Assistants from './assistants.js';
import Subscriptions from './subscriptions.js';
import Payments from './payments.js';
import Interactions from './interactions.js';

sequelize.sync({ force: false })
    .then(() => {
        // console.log('Database & tables created!');
    })
    .catch((error) => {
        console.error('Error creating database tables:', error);
    });

export {
    sequelize,
    Fields,
    Courses,
    Chapters,
    Topics,
    Users,
    Assistants,
    Subscriptions,
    Payments,
    Interactions
};