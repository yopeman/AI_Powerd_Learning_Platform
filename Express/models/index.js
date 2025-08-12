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
import Amounts from './amounts.js';
import Feedbacks from './feedbacks.js';
import Certifications from './certifications.js';
import Results from './results.js';

(async () => {
    await sequelize.sync( {force: true} );
})();

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
    Interactions,
    Amounts,
    Feedbacks,
    Certifications,
    Results
};