import React from 'react';
import $ from 'jquery';

import Component from './component';


export default class Question extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('getQuestion', 'focusAnswer', 'onKeyUp', 'onSubmit');
		this.state = {
			question: {},
			answer: '',
			result: null,
			correctAnswer: null
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

		return (
			<div className={'question-container'}>
				<span key={this.state.question.id} className={'question'}>{this.state.question.text}</span>
				<input className={'answer'} type={'text'} ref={'answer'} onKeyUp={this.onKeyUp} onBlur={this.focusAnswer} />
				<button className={'submit'} onClick={this.onSubmit}>{'Guess'}</button>
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
			question
		}))
		.fail(err => console.log(err));
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
			correctAnswer: null
		});

		this.focusAnswer();
	}
}