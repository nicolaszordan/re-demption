"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
// Load environment variables
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body.message;
    try {
        const response = yield axios_1.default.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const reply = response.data.choices[0].message.content;
        logger_1.default.info(`Query: ${message} | Response: ${reply}`);
        res.json({ reply });
    }
    catch (error) {
        logger_1.default.error(`Error processing query: ${message} | Error: ${error}`);
        console.error('ERROR:', error);
        res.status(500).send('Error');
    }
}));
exports.default = router;
