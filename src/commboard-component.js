import React from "react";
import ReactDOM from "react-dom";
import Radium from "radium";
const jQuery = require("jquery");

const layout_default = [' ', 'a', 'b', 'c', 'd', 'e', 'f', ' ',
' ', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
' ', 'n', 'o', 'p', 'q', 'r', 's', ' ',
' ', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const styles = {
	container: {
		backgroundColor: "#073642",
		borderColor: "#657b83",
		borderWidth: "1px",
		borderStyle: "solid",
		borderRadius: "10px",
		padding: "5px",
		width: "81em"
	},
	table: {
		width: "80em",
		tableLayout: "fixed"
	},
	highlightedRow: {
		backgroundColor: "#dc322f",
		color: "#268bd2"
	},
	baseButton: {
		height: "1.333em",
		width: "95%",
		margin: "5px",
		fontSize: "300%",
		fontWeight: "bold"
	},
	textButton: {
		color: "#268bd2"
	},
	functionButton: {
		backgroundColor: "#dc322f"
	},
	highlightedButton: {
		backgroundColor: "#268bd2",
		color: "#ffffff"
	}
};
const phrases = ["I'm uncomfortable", "I'm hungry", "I'm thirsty", "a", "b", "c"]
class Button extends React.Component {
	constructor(props) {
		super(props);

		this.value = props.value;
		this.func = props.func;
	}
	componentWillReceiveProps(props) {
		this.value = props.value;
		this.func = props.func;
	}
	render() {
		return (<input type="button"
			value={this.props.value} 
			style={this.props.style}
			onClick={() => this.props.func()} />);
	}
}
Button = Radium(Button);
//Ryan Campbell
//The main input interface
class CommBoard extends React.Component {
	constructor(props) {
		super(props);
		this.rows = 6;
		this.columns = 8;
		this.buttons = [];
		this.state = {
			guesses: [],
			letters: layout_default,
			buttonHL: null,
			rowHL: null
		};

	}

	//SCANNING FUNCTIONS
	//RC
	highlightRow(i) {
		this.setState({rowHL: i,
			buttonHL: i * this.columns});
		return this.buttons[i * this.columns];
	}
	//RC
	highlightButton(i) {
		this.setState({buttonHL: i});
		return this.buttons[i];
	}
	//RC
	clearHighlight() {
		this.setState({buttonHL: null, rowHL: null});
	}
	//RC
	selectButton(i) {
		if(this.buttons[i]) {
			this.buttons[i].func();
			this.generateGuesses();
		}
		this.clearHighlight();
	}
	//END SCANNING FUNCTIONS

	//GUESS GENERATION
	generateGuesses() {
		const NUM_GUESSES = this.columns;
		function wordnik(text, success, failure) {
			  const MIN_COUNT = 1000;     // Min number of ocurrences in wordnik corpus
			  const BASE_URL = "http:api.wordnik.com:80/v4/words.json/search/";
			  const API_KEY = "a8a677e1378da5d7a03532c7b57083a570bdd1254c16f6af3"; // This could be set by user instead.
			  // Given an incomplete word "text", query the wordnik API for possible
			  // completions. Invoke one of the two passed-in callbacks depending on
			  // the success of the API call.
			  let queryURL = BASE_URL + text;
			  jQuery.ajax({
			  	url: queryURL,
			  	data: { minCorpusCount: MIN_COUNT,
			  		api_key: API_KEY,
			  		caseSensitive: false,
			  		limit: NUM_GUESSES },
			  		type: "GET",
			  		dataType: "json",
			  		success: success,
			  		error: failure
			  	});
			}
			let text = this.props.buffer.getText().split(" ").slice(-1)[0].slice(0, -1);

			if (text === "") {
				this.setState({guesses: []});
			} else {
				wordnik(text + "*", (data, status) => {
					let guesses = (data.searchResults.slice(1).
						map((o) => o.word));
					this.setState({guesses: guesses});
				}, () => console.log("Wordnik API call failed."));
			}
		}
	//END GUESS GENERATION

	//REACT STUFF
	//For all the following buttons, pos is the position in the commboard button array and display is what is displayed on the UI
	//RC- render a React function button.
	renderFunctionButton(pos, display, func) {
		return (<Button
			key={pos}
			value={display} 
			style={[styles.baseButton, styles.functionButton, this.state.buttonHL == pos && styles.highlightedButton, {fontSize: Math.floor(Math.min(4 / display.length, 1) * 300).toString() + "%", height: (1.333 / Math.min(4 / display.length, 1)).toString() + "em"}]}
			func={() => {func(); this.generateGuesses();}}
			ref={(i) => this.buttons[pos] = i} />);
	}
	//RC- render a React text button
	renderTextButton(pos, display, value) {//value is what is passed to the buffer
		let func = () => {this.props.buffer.write(value, "letter"); this.generateGuesses();};
		return (<Button 
			key={pos}
			value={display} 
			style={[styles.baseButton, styles.textButton, this.state.buttonHL == pos && styles.highlightedButton, {fontSize: Math.floor(Math.min(4 / display.length, 1) * 300).toString() + "%", height: (1.333 / Math.min(4 / display.length, 1)).toString() + "em"}]}
			func={func}
			ref={(i) => this.buttons[pos] = i} />);
	}
	//RC
	renderLetterButtons(row) {
		const FIRST_LETTER_ROW = 1;
		let r = [];
		r[0] = <td key={row * this.columns}>{this.renderTextButton(row * this.columns, (row + 1 - FIRST_LETTER_ROW).toString(), "")}</td>;
		for(let i = 1; i < this.columns; i++) {
			let pos = row * this.columns + i;
			r[i] = <td key={pos}>{this.renderLetterButton(pos, this.state.letters[(row - FIRST_LETTER_ROW) * this.columns + i])}</td>;
		}
		return r;
	}
	//RC
	renderLetterButton(pos, value) {
		return this.renderTextButton(pos, value, value);
	}
	//RC- write the guess label, then iterate through the guesses and render each as a button across the row
	renderGuessButtons(row) {
		let r = [];
		r[0] = <td key={row * this.columns}>{this.renderTextButton(row * this.columns, "Guess", "")}</td>;
		for(let i = 1; i < this.columns; i++) {
			let word = this.state.guesses[i - 1] || " ";
			let pos = row * this.columns + i;
			r[i] = <td key={pos}>{this.renderGuessButton(pos, word)}</td>;
		}
		return r;
	}
	//RC
	renderGuessButton(pos, word) {
		let func = () => {this.props.buffer.write(word, "word"); this.generateGuesses();};
		return (<Button 
			key={pos}
			value={word} 
			style={[styles.baseButton, styles.textButton, this.state.buttonHL == pos && styles.highlightedButton, {fontSize: Math.floor(Math.min(4 / word.length, 1) * 300).toString() + "%", height: (1.333 / Math.min(4 / word.length, 1)).toString() + "em"}]} 
			func={func}
			ref={(i) => this.buttons[pos] = i} />);
	}
	//RC
	renderRow(i) {
		if(i == 0) { //render the guess row.
			return (
				<tr style={[this.state.rowHL == i && styles.highlightedRow]}>
					{this.renderGuessButtons(i)}
				</tr>
				);
		}

		if(i == 5) { //render the function row.
			let rowOffset = i * this.columns;
			return (
				<tr style={[this.state.rowHL == i && styles.highlightedRow]}>
					<td>{this.renderTextButton(rowOffset++, i.toString(), "")}</td>
					<td>{this.renderFunctionButton(rowOffset++, "Delete", () => this.props.buffer.executeAction("delete", () => 1))}</td>
					<td>{this.renderFunctionButton(rowOffset++, "Clear", () => this.props.buffer.executeAction("clear", () => 1))}</td>
					<td>{this.renderTextButton(rowOffset++, "Space", " ")}</td>
					<td>{this.renderFunctionButton(rowOffset++, "Phrases", () => this.props.phrMode())}</td>
					<td>{this.renderTextButton(rowOffset++, ".", ".")}</td>
					<td>{this.renderTextButton(rowOffset++, "?", "?")}</td>
					<td>{this.renderFunctionButton(rowOffset++, "Speak", () => {this.props.buffer.executeAction("read", () => 1); this.props.stop();})}</td>
				</tr>
				);
		}

		//render a row of letters.
		return (
			<tr style={[this.state.rowHL == i && styles.highlightedRow]}>
				{this.renderLetterButtons(i)}
			</tr>);
	}
	render() {
		switch(this.props.mode) {
		case "letters":
			return(
				<div style={[styles.container]}>
					<table style={[styles.table]}><tbody>
						{this.renderRow(0)}
						{this.renderRow(1)}
						{this.renderRow(2)}
						{this.renderRow(3)}
						{this.renderRow(4)}
						{this.renderRow(5)}
					</tbody></table>
				</div>);
			break;
		case "phrases":
			return(
				<div style={[styles.container]}>
					<table style={[styles.table]}><tbody>
						<tr><td>{this.renderTextButton(0, phrases[0], phrases[0])}</td></tr>
						<tr><td>{this.renderTextButton(1, phrases[1], phrases[1])}</td></tr>
						<tr><td>{this.renderTextButton(2, phrases[2], phrases[2])}</td></tr>
						<tr><td>{this.renderTextButton(3, phrases[3], phrases[3])}</td></tr>
						<tr><td>{this.renderTextButton(4, phrases[4], phrases[4])}</td></tr>
						<tr><td>{this.renderFunctionButton(5, "Back", () => this.props.letMode())}</td></tr>
					</tbody></table>
				</div>);
			break;
		default:

		}
	}
}

module.exports = Radium(CommBoard);