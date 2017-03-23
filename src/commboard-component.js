import React from "react";
import ReactDOM from "react-dom";
import Radium from "radium";

const layout_default = ['a', 'b', 'c', 'd', 'e', 'f', '',
                        'g', 'h', 'i', 'j', 'k', 'l', 'm',
                        'n', 'o', 'p', 'q', 'r', 's', '',
                        't', 'u', 'v', 'w', 'x', 'y', 'z'];

const styles = {
      container: {
            backgroundColor: "#073642",
            borderColor: "#657b83",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "10px",
            margin: "5px",
            padding: "5px",
            position: "absolute",
            bottom: "0px"

      },
      table: {
            width: "70em",
            tableLayout: "fixed"
      },
      highlightedRow: {
            backgroundColor: "#dc322f",
            color: "#268bd2"
      },
      baseButton: {
            height: "100%",
            width: "95%",
            padding: "5px",
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
//Ryan Campbell
//The main input interface
class CommBoard extends React.Component {
      constructor(props) {
            super(props);
            this.rows = 6;
            this.columns = 7;
            this.buttons = [];
            this.state = {
                  guesses: [],
                  letters: layout_default,
                  buttonHL: null,
                  rowHL: null
            };

      }
      //RC
      highlightRow(i) {
            this.setState({rowHL: i});
      }
      //RC
      highlightButton(i) {
            this.setState({buttonHL: i});
      }
      //RC
      clearHighlight() {
            this.setState({buttonHL: null, rowHL: null});
      }
      //RC
      selectButton(i) {
            if(this.buttons[i]) {
                  this.buttons[i]();
            }
            this.clearHighlight();
      }
      //For all the following buttons, pos is the position in the commboard button array and display is what is displayed on the UI
      //RC- render a React function button.
      renderFunctionButton(pos, display, func) {
            this.buttons[pos] = func
            return (<input type="button" 
                  value={display} 
                  style={[styles.baseButton, styles.functionButton, this.state.buttonHL == pos && styles.highlightedButton]} 
                  onClick={() => func()} />);
      }
      //RC- render a React text button
      renderTextButton(pos, display, value) {//value is what is passed to the buffer
            this.buttons[pos] = () => this.props.buffer.write(value, "letter");
		return (<input type="button" 
                  value={display} 
                  style={[styles.baseButton, styles.textButton, this.state.buttonHL == pos && styles.highlightedButton]} 
                  onClick={this.buttons[pos]} />);
	}
      //RC
      renderLetterButton(pos, value) {
            return this.renderTextButton(pos, value, value);
      }
      //RC
	renderGuessButton(pos, word) {
            this.buttons[pos] = () => this.props.bufer.write(word, "word");
            return (<input type="button" 
                  value={word} 
                  style={[styles.baseButton, styles.textButton, this.state.buttonHL == pos && styles.highlightedButton]} 
                  onClick={this.buttons[pos]} />);
	}
      //RC
      renderRow(i) {
            let rowOffset = i * 7;
            if(i == 0) { //render the guess row.
                  return (
                        <tr style={[this.state.rowHL == i && styles.highlightedRow]}>
                              <td>{this.renderGuessButton(0, this.state.guesses[0])}</td>
                              <td>{this.renderGuessButton(1, this.state.guesses[1])}</td>
                              <td>{this.renderGuessButton(2, this.state.guesses[2])}</td>
                              <td>{this.renderGuessButton(3, this.state.guesses[3])}</td>
                              <td>{this.renderGuessButton(4, this.state.guesses[4])}</td>
                              <td>{this.renderGuessButton(5, this.state.guesses[5])}</td>
                              <td>{this.renderGuessButton(6, this.state.guesses[6])}</td>
                        </tr>
                        );
            }

            if(i == 5) { //render the function row.
                  return (
                        <tr style={[this.state.rowHL == i && styles.highlightedRow]}>
                              <td>{this.renderFunctionButton(rowOffset + 0, "Delete", () => this.props.buffer.executeAction("delete", () => 1))}</td>
                              <td>{this.renderTextButton(rowOffset + 1, "Space", " ")}</td>
                              <td>{this.renderTextButton(rowOffset + 2, ",", ",")}</td>
                              <td>{this.renderTextButton(rowOffset + 3, ".", ".")}</td>
                              <td>{this.renderTextButton(rowOffset + 4, "?", "?")}</td>
                              <td>{this.renderFunctionButton(rowOffset + 5, "Speak", () => this.props.buffer.executeAction("read", () => 1))}</td>
                        </tr>
                        );
            }

            //render a row of letters.
            let offset = (i - 1) * this.columns;
            return (
                  <tr style={[this.state.rowHL == i && styles.highlightedRow]}>
                        <td>{this.renderLetterButton(rowOffset + 0, this.state.letters[0 + offset])}</td>
                        <td>{this.renderLetterButton(rowOffset + 1, this.state.letters[1 + offset])}</td>
                        <td>{this.renderLetterButton(rowOffset + 2, this.state.letters[2 + offset])}</td>
                        <td>{this.renderLetterButton(rowOffset + 3, this.state.letters[3 + offset])}</td>
                        <td>{this.renderLetterButton(rowOffset + 4, this.state.letters[4 + offset])}</td>
                        <td>{this.renderLetterButton(rowOffset + 5, this.state.letters[5 + offset])}</td>
                        <td>{this.renderLetterButton(rowOffset + 6, this.state.letters[6 + offset])}</td>
                  </tr>);
      }
	render() {
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
                  </div>
		);
	}
}

module.exports = Radium(CommBoard);