import { Assistants } from "../models/index.js";
import { find_chapters, find_courses, find_topics } from "./finds.js";

async function checkPermission(userId, fieldId) {
    try {
        const assignment = await Assistants.findOne({
            where: {
                userId,
                fieldId,
            },
        });
        return !!assignment; // Returns true if assignment exists
    } catch (error) {
        console.error('Error checking permission:', error);
        throw new Error('Unable to check permissions. Please try again later.');
    }
}

export async function hasAssistantFieldPermission(userId, fieldId) {
    try {
        const hasPermission = await checkPermission(userId, fieldId);
        return hasPermission ? true : 'You have no permission to access this field.';
    } catch (error) {
        console.error('Error checking field permission:', error);
        return 'Unable to check field permission. Please try again later.';
    }
}

export async function hasAssistantCoursePermission(userId, courseId) {
    try {
        const course_detail = await find_courses(courseId);
        const hasPermission = await checkPermission(userId, course_detail.fields.id);
        return hasPermission ? true : 'You have no permission to access this course.';
    } catch (error) {
        console.error('Error checking course permission:', error);
        return 'Unable to check course permission. Please try again later.';
    }
}

export async function hasAssistantChapterPermission(userId, chapterId) {
    try {
        const chapter_detail = await find_chapters(chapterId);
        const hasPermission = await checkPermission(userId, chapter_detail.fields.id);
        return hasPermission ? true : 'You have no permission to access this chapter.';
    } catch (error) {
        console.error('Error checking chapter permission:', error);
        return 'Unable to check chapter permission. Please try again later.';
    }
}

export async function hasAssistantTopicPermission(userId, topicId) {
    try {
        const topic_detail = await find_topics(topicId);
        const hasPermission = await checkPermission(userId, topic_detail.fields.id);
        return hasPermission ? true : 'You have no permission to access this topic.';
    } catch (error) {
        console.error('Error checking topic permission:', error);
        return 'Unable to check topic permission. Please try again later.';
    }
}