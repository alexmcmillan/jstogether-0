import React from 'react'

import Component from './component';
import Score from './score';
import Question from './question';

export default class App extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onGuess');

		this.state = {
			guesses: 0,
			score: 0
		};
	}

	/**
	 *
	 */
	render () {
		return (
			<div className={'main'}>
				<div className={'wrapper'}>
					<header>
						<h1 className={'main-title'}>{'JSTogether Quiz'}</h1>
					</header>

					<Score score={this.state.score} guesses={this.state.guesses} />

					<Question onGuess={this.onGuess} />

					<div className={'push'} />
				</div>

				<footer>
					<span>
						<span>{'Made by sqrtnegative1'}</span>
						<a href={'https://www.reddit.com/r/jstogether/comments/3fr1ai/project_0_quiz_app/'} alt={'JSTogether on Reddit'}>{'JSTogether on Reddit'}</a>
					</span>
				</footer>
			</div>
		);
	}

	/**
	 *
	 */
	onGuess (correct) {
		let guesses = this.state.guesses + 1;
		let score = this.state.score;

		if (correct) {
			score += 1;
		}

		this.setState({
			guesses,
			score
		});
	}
}