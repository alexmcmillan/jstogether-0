import React from 'react';

import Component from './component';


export default class Score extends Component {
	/**
	 *
	 */
	render () {
		let percentage;
		
		if (this.props.guesses) {
			percentage = (
				<span className={'percentage'}>
					<span>{' ('}</span>
					<span>{Math.round(this.props.score / this.props.guesses * 100)}</span>
					<span>{'%)'}</span>
				</span>
			);
		}
		return (
			<div className={'score-container'}>				
				<span>{'Score:'}</span>
				<span className={'score'}>{this.props.score}</span>
				<span>{' out of '}</span>
				<span className={'guesses'}>{this.props.guesses}</span>
				{percentage}
			</div>
		);
	}
}