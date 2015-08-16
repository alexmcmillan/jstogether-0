import React from 'react';
import $ from 'jquery';

import Component from './component';


export default class Question extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('getQuestion', 'getAnswerOptions', 'focusAnswer', 'onKeyUp', 'onSubmitClick', 'onClickTrue', 'onClickFalse', 'submit');
		this.state = {
			question: {},
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
	onKeyUp (e) {
		if (e.which === 13) {
			e.preventDefault();
			this.onSubmitClick();
		}
	}

	/**
	 *
	 */
	onSubmitClick () {
		let answerNode = React.findDOMNode(this.refs.answer);
		let answer = answerNode.value;

		this.submit(answer);
	}

	/**
	 *
	 */
	onClickTrue () {
		this.submit('true');
	}

	/**
	 *
	 */
	onClickFalse () {
		this.submit('false');
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
		case 'tf':
			return [
				<button key={'true'} onClick={this.onClickTrue}>{'TRUE'}</button>,
				<button key={'false'} onClick={this.onClickFalse}>{'FALSE'}</button>
			];
		break;
		default:
			return [
				<input key={'input'} className={'answer'} type={'text'} ref={'answer'} onKeyUp={this.onKeyUp} onBlur={this.focusAnswer} />,
				<button key={'submit'} className={'submit'} onClick={this.onSubmitClick}>{'Guess'}</button>
			];
		}
	}

	/**
	 *
	 */
	focusAnswer () {
		let answerNode = React.findDOMNode(this.refs.answer);

		if (answerNode) {
			answerNode.focus();
		}
	}

	/**
	 *
	 */
	submit (answer) {
		if (this.state.submitting) {
			return;
		}

		this.setState({
			submitting: true
		});

		$.post('/quiz', {
			questionId: this.state.question.id,
			answer
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
		let answerNode = React.findDOMNode(this.refs.answer);
		
		if (answerNode) {
			answerNode.value = '';
		}

		this.setState({
			answer: '',
			result: null,
			correctAnswer: null,
			submitting: false
		});

		this.focusAnswer();
	}
}