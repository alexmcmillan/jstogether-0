import coreRouter from './route/core';
import quizRouter from './route/quiz';

export default (app) => {
	app.use('/', coreRouter);

	app.use('/quiz', quizRouter);
}