import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { Courses, Fields, Users, Certifications, Results } from "../models/index.js";
import { Op } from "sequelize";
import { generateQuestion_By_OpenAI, generateQuestion_By_GoogleGenAI } from '../utilities/ai-service.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to create standardized errors
const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

async function certification_questions(req, res, next) {
    const { fieldId } = req.params;
    if (!fieldId) {
        return next(createError(400, 'Field ID is required.'));
    }

    try {
        let certification = await Certifications.findOne({ where: { fieldId } });
        
        if (!certification) {
            certification = await Certifications.create({ fieldId });
        }

        if (certification.questions_file_path) {
            const questions = fs.readFileSync(certification.questions_file_path, 'utf8');
            return res.status(200).json({
                message: 'Certification questions fetched successfully.',
                data: JSON.parse(questions),
                success: true,
            });
        }

        const field = await Fields.findByPk(fieldId);
        const courses = await Courses.findAll({ where: { fieldId } });
        const generatedQuestions = await generateQuestion(field, JSON.stringify(courses));
        
        const dirPath = path.join(__dirname, `../public/Fields_${fieldId}/Certifications`);
        const filePath = path.join(dirPath, `Certifications_${certification.id}.json`);

        await fs.promises.mkdir(dirPath, { recursive: true });
        await fs.promises.writeFile(filePath, generatedQuestions);
        
        certification.questions_file_path = filePath;
        await certification.save();

        res.status(200).json({
            message: 'Certification questions generated successfully.',
            data: generatedQuestions,
            success: true,
        });
    } catch (err) {
        console.error('Error in certification_questions:', err);
        return next(createError(500, 'An error occurred while processing certification questions.'));
    }
}

async function certification_result(req, res, next) {
    const { value, fieldId } = req.body;
    if (!value || !fieldId) {
        return next(createError(400, 'Certification details are required.'));
    }

    try {
        const certification = await Certifications.findOne({ where: {fieldId} });
        if (!certification) {
        return next(createError(400, 'Certification not found'));
        }

        const result = await Results.create({
            userId: req.user.id,
            certificationId: certification.id,
            value,
        });

        res.status(201).json({
            message: 'Certification result submitted successfully.',
            data: result,
            success: true,
        });
    } catch (err) {
        console.error('Error in certification_result:', err);
        return next(createError(500, 'An error occurred while processing certification results.'));
    }
}

async function certification_get_results(req, res, next) {
    try {
        const results = await Results.findAll();
        
        if (!results.length) {
            return next(createError(404, 'Certification results not found.'));
        }

        res.status(200).json({
            message: 'Certification results fetched successfully.',
            data: results,
            success: true,
        });
    } catch (err) {
        console.error('Error fetching certification results:', err);
        return next(createError(500, 'An error occurred while fetching certification results.'));
    }
}
async function certification_delete(req, res, next) {
    const { resultId } = req.params;
    if (!resultId) {
        return next(createError(400, 'Result ID is required.'));
    }

    try {
        const deletedResultCount = await Results.destroy({ where: { id: resultId } });

        if (!deletedResultCount) {
            return next(createError(404, 'Result not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Result deleted successfully.',
            success: true,
        });
    } catch (err) {
        console.error('Error in certification_delete:', err);
        return next(createError(500, 'An error occurred while deleting the result.'));
    }
}

async function get_my_certificate_doc(req, res, next) {
    const { fieldId, userId } = req.params;
    if (!fieldId || !userId) {
        return next(createError(400, 'Field ID and User ID are required.'));
    }

    try {
        const field = await Fields.findByPk(fieldId);
        if (!field) {
            return next(createError(404, 'Field not found.'));
        }

        const user = await Users.findByPk(userId); // Corrected to use userId
        if (!user) {
            return next(createError(404, 'User not found.'));
        }
        
        const certification = await Certifications.findOne({ where: { fieldId } });
        if (!certification) {
            return next(createError(404, 'Certification not found.'));
        }

        const result = await Results.findOne({
            where: {
                [Op.and]: [
                    { userId },
                    { certificationId: certification.id },
                ],
            },
        });
        
        if (!result) {
            return next(createError(404, 'Certification result not found.'));
        }

        res.status(200).send(generate_certificate(field, result, user));
    } catch (err) {
        console.error('Error in get_my_certificate_doc:', err);
        return next(createError(500, 'An error occurred while retrieving the certificate.'));
    }
}

async function redirect_certification_doc(req, res, next) {
    const result = await Results.findByPk(req.params.resultId);
    const userId = result.userId;
    const certification = await Certifications.findByPk(result.certificationId);
    const fieldId = certification.fieldId;

    res.status(200).redirect(`/certifications/field/${fieldId}/user/${userId}/doc`);
}

async function generateQuestion(field, courses) {
    // Uncomment the appropriate AI generation method
    // return await generateQuestion_By_OpenAI(field, courses);
    // return await generateQuestion_By_GoogleGenAI(field, courses);
    return `
[
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    },
    {
        "question": "Question text",
        "options": ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
        "correct": "A"
    }
]`;
}

function generate_certificate(field, result, user) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AiPLP Certificate</title>
</head>
<body>
    <h1>AiPLP Certificate</h1>
    <ul>
        <h3>Field detail</h3>
        <li>Field Title: ${field.title}</li>
        <li>Field Description: ${field.description}</li>
        <li>Field Years Length: ${field.years_length}</li>
        
        <h3>User detail</h3>
        <li>Full Name: ${user.first_name} ${user.last_name}</li>
        <li>Email: ${user.email}</li>
        <li>Phone Number: ${user.phone}</li>

        <h3>Certificate result detail</h3>
        <li>Score: ${result.value}%</li>
        <li>Exam date: ${result.createdAt}%</li>
    </ul>
    <button onclick="window.print()">Download the certificate!</button>
</body>
</html>
    `;
}

export {
    certification_questions,
    certification_result,
    certification_get_results,
    certification_delete,
    get_my_certificate_doc,
    redirect_certification_doc
};