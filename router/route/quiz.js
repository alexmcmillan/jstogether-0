import express from 'express';
import React from 'react';

import questions from '../../db/questions.js';

let router = express.Router();

/**
 *
 */
router.get('/', (req, res) => {
	let random = Math.floor(Math.random() * questions.length);
	let question = questions[random];

	res.send({
		id: question.id,
		text: question.text
	});
});

/**
 *
 */
router.post('/', (req, res) => {
	let answer = req.body.answer.toLowerCase().trim();
	let question = questions.find(q => q.id === req.body.questionId);

	if (question && question.answer.toLowerCase().trim() === answer) {
		res.send({
			correct: true
		});
	}
	else {
		res.send({
			correct: false,
			answer: question.answer
		});
	}
});

export default router;