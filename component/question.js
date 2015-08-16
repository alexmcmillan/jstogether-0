import React from 'react';
import $ from 'jquery';

import Component from './component';


export default class Question extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('getQuestion', 'getAnswerOptions', 'focusAnswer', 'onKeyUp', 'onSubmit');
		this.state = {
			question: {},
			answer: '',
			result: null,
			correctAnswer: null,
			submitting: false,
			loading: true
		};
	}

	/**
	 *
	 */
	componentDidMount () {
		this.getQuestion();
		this.focusAnswer();
	}

	/**
	 *
	 */
	render () {
		let correct = this.state.result ? 'correct' : 'incorrect';
		let correctAnswer;
		let result;

		if (this.state.result !== null) {
			correctAnswer = this.state.correctAnswer ? <span className={'correctAnswer'}>{this.state.correctAnswer}</span> : null;
			result = <span className={'result ' + correct}>{correct}</span>;
		}

		let answerOptions = this.getAnswerOptions(this.state.question);
		let loadingSpinner = this.state.loading ? <div className={'loading'} /> : null;

		return (
			<div className={'question-container'}>
				{loadingSpinner}
				<span key={this.state.question.id} className={'question'}>{this.state.question.text}</span>
				{answerOptions}
				{result}
				{correctAnswer}
			</div>
		);
	}

	/**
	 *
	 */
	getQuestion () {
		this.clear();

		$.get('/quiz')
		.done(question => this.setState({
			question,
			loading: false
		}))
		.fail(err => console.log(err));
	}

	/**
	 *
	 */
	getAnswerOptions (question) {
		switch (question.type) {
		default:
			return [
				<input key={'input'} className={'answer'} type={'text'} ref={'answer'} onKeyUp={this.onKeyUp} onBlur={this.focusAnswer} />,
				<button key={'submit'} className={'submit'} onClick={this.onSubmit}>{'Guess'}</button>
			];
		}
	}

	/**
	 *
	 */
	focusAnswer () {
		React.findDOMNode(this.refs.answer).focus();
	}

	/**
	 *
	 */
	onKeyUp (e) {
		if (e.which === 13) {
			e.preventDefault();
			return this.onSubmit();
		}

		this.setState({
			answer: e.target.value
		});
	}

	/**
	 *
	 */
	onSubmit () {
		if (this.state.submitting) {
			return;
		}

		this.setState({
			submitting: true
		});

		$.post('/quiz', {
			questionId: this.state.question.id,
			answer: this.state.answer
		})
		.done(result => {
			this.setState({
				result: result.correct,
				correctAnswer: result.answer
			});

			this.props.onGuess(result.correct);
			setTimeout(this.getQuestion, result.correct ? 1000 : 3000);
		});
	}

	/**
	 *
	 */
	clear () {
		React.findDOMNode(this.refs.answer).value = '';

		this.setState({
			answer: '',
			result: null,
			correctAnswer: null,
			submitting: false,
			loading: true
		});

		this.focusAnswer();
	}
}