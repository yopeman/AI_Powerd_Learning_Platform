import OpenAI from 'openai';

const generate_content = async (topicTitle, context) => {
    const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
    });

    const prompt = `Generate comprehensive learning material about: ${topicTitle}
  Context: 
  - Field: ${context.field}
  - Course: ${context.course}
  - Year: ${context.year}
  - Semester: ${context.semester}
  Format: Markdown with headings, examples, and quizzes`;
  
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "user", content: prompt }]
  });
  
  return response.choices[0].message.content;
};

export default generate_content;

/*
  Check out official docs at: https://github.com/openai/openai-node
  Check out https://github.com/microsoft/generative-ai-with-javascript, for a fun free course on how to use GenAi, it has time traveling :)
*/