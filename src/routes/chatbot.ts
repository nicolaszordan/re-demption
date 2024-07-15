import express, { Request, Response } from 'express';
import OpenAI from 'openai';
import logger from '../utils/logger';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORGANIZATION = process.env.OPENAI_ORGANIZATION;

const router = express.Router();
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, organization: OPENAI_ORGANIZATION });

router.post('/', async (req: Request, res: Response) => {
    const message: string = req.body.message;

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: "You are a friendly and wise Catholic priest. You provide thoughtful and compassionate advice, drawing from Catholic teachings and traditions."},
                { role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
        })

        const reply = completion.choices[0].message.content;
        logger.info(`Query: ${message} | Response: ${reply}`);
        res.json({ reply });
    } catch (error) {
        logger.error(`Error processing query: ${message} | Error: ${error}`);
        res.status(500).send('Error');
    }
});

export default router;

