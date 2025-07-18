import * as db from '../models/index.js';

async function find_fields(fieldId) {
    const fields = await db.Fields.findByPk(fieldId);
    return {
        fields: fields
    }
}

async function find_courses(courseId) {
    const courses = await db.Courses.findByPk(courseId);
    const fields = await db.Fields.findByPk(courses.fieldId);
    return {
        fields: fields,
        courses: courses
    }
}

async function find_chapters(chapterId) {
    const chapters = await db.Chapters.findByPk(chapterId);
    const courses = await db.Courses.findByPk(chapters.courseId);
    const fields = await db.Fields.findByPk(courses.fieldId);
    return {
        fields: fields,
        courses: courses,
        chapters: chapters
    }
}

async function find_topics(topicId) {
    const topics = await db.Topics.findByPk(topicId);
    const chapters = await db.Chapters.findByPk(topics.chapterId);
    const courses = await db.Courses.findByPk(chapters.courseId);
    const fields = await db.Fields.findByPk(courses.fieldId);
    return {
        fields: fields,
        courses: courses,
        chapters: chapters,
        topics: topics
    }
}

async function find_interactions(interactionId) {
    const interactions = await db.Interactions.findByPk(interactionId);
    const topics = await db.Topics.findByPk(interactions.topicId);
    const chapters = await db.Chapters.findByPk(topics.chapterId);
    const courses = await db.Courses.findByPk(chapters.courseId);
    const fields = await db.Fields.findByPk(courses.fieldId);
    return {
        fields: fields,
        courses: courses,
        chapters: chapters,
        topics: topics,
        interactions: interactions
    }
}

export {
    find_fields,
    find_courses,
    find_chapters,
    find_topics,
    find_interactions
}