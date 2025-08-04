import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

// Function to retrieve the token from AsyncStorage
const getToken = async () => {
  const response = await AsyncStorage.getItem('response');
  return response ? JSON.parse(response).token : null;
};

// Centralized API response handling with caching
const handleApiResponse = async (apiCall, storageKey) => {
  try {
    const response = await apiCall();
    const data = response.data; // Accessing data directly from response
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  } catch (err) {
    const cachedData = await AsyncStorage.getItem(storageKey);
    return cachedData ? JSON.parse(cachedData) : null; // Return null if there's no cached data
  }
};

// Function to get all fields
export const get_all_fields = async () => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get('/fields'), '/fields');
};

// Function to get user's fields
export const get_my_fields = async () => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get('/subscriptions/me/fields'), '/subscriptions/me/fields');
};

// Function to get a field by its ID
export const get_field_by_id = async (id) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/fields/${id}`), `/fields/${id}`);
};

// Function to subscribe to a field
export const subscribe_field = async (fieldId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).post('/subscriptions', { fieldId }), `/subscriptions/${fieldId}`);
};

// Function to cancel a subscription
export const cancel_subscription = async (subscriptionId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/subscriptions/${subscriptionId}/cancel`), `/subscriptions/${subscriptionId}/cancel`);
};

// Function to get courses for a field
export const get_courses = async (fieldId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/fields/${fieldId}/courses`), `/fields/${fieldId}/courses`);
};

// Function to get a course by its ID
export const get_course_by_id = async (id) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/courses/${id}`), `/courses/${id}`);
};

// Function to get chapters for a course
export const get_chapters = async (courseId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/courses/${courseId}/chapters`), `/courses/${courseId}/chapters`);
};

// Function to get a chapter by its ID
export const get_chapter_by_id = async (id) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/chapters/${id}`), `/chapters/${id}`);
};

// Function to get topics for a chapter
export const get_topics = async (chapterId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/chapters/${chapterId}/topics`), `/chapters/${chapterId}/topics`);
};

// Function to get content for a topic
export const get_topic_content = async (topicId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/topics/${topicId}/content`), `/topics/${topicId}/content`);
};

// Function to ask about a topic
export const ask_about_topic = async (topicId, question) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).post(`/topics/${topicId}/ask`, { question }), `/topics/${topicId}/ask/${question}`);
};

// Function to get interactions for a topic
export const get_topic_interactions = async (topicId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/topics/${topicId}/interactions/me`), `/topics/${topicId}/interactions/me`);
};

// Function to payment
export const payment_init = async ({fieldId, year, semester}) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).post(`/payments`, {fieldId, year, semester}), `/payments/${fieldId}/${year}/${semester}`);
};