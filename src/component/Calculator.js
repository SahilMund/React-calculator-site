import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";

function Calculator() {
  /*  PrevState is used to store the previously entered inputs before the operator input is given whereas
   ,currState stores the input which is given after the operator input.
   i.e. PrevState stores the first operand and currState stores the next operand
   */
  const [prevState, setPrevState] = useState("");
  const [currState, setCurrState] = useState("");

  //  input will store the text which will show in the screen
  const [input, setInput] = useState("0");
  //   To store the operator input
  const [operator, setOperator] = useState(null);
  const [isOperator, setIsOperator] = useState(false);

  //    To check if total is calculated / displayed 
  const [total, setTotal] = useState(false);

  const handleInputNum = (e) => {
    //  To prevent the user from entering two dots while entering decimal places inputs
    if (currState.includes(".") && e.target.innerText === ".") return;

    // after calculating the total, we are removing the data present in the prev state
    if (total) {
      setPrevState("");
    }

    // If previously some data is present in currState then add the value with the prev value else just assign this value
    currState
      ? setCurrState((pre) => pre + e.target.innerText)
      : setCurrState(e.target.innerText);

    if (isOperator) {
      setIsOperator(false);
    }
    //   Setting total to false
    setTotal(false);
  };

  //  Every time if there is a change in the current state, also update the input
  useEffect(() => {
    setInput(currState);
  }, [currState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operatorType = (e) => {
    // Setting total to false, as we are not yet completed our calculations
    setTotal(false);

    // Take the entered operator
    setOperator(e.target.innerText);
    // show the operator
    setIsOperator(true);

    // If there is nothing there in the currentState then we do not need to do anything, as user needs to enter something before proceeding for calculations.
    if (currState === "") return;
    if (prevState !== "") {
      // If both current state and prev state is present , then do the calculation
      calculateResult();
    } else {
      // If prev state is empty then, store the value of current state to prev state and make the curr state empty to take the 2nd operand
      setPrevState(currState);
      setCurrState("");
      //   setIsOperator(false);
    }
  };

  //   Function to perform the calculations
  const calculateResult = (e) => {
    if (e?.target.innerText === "=") {
      // If equals value is clicked then show the total
      setTotal(true);
    }
    let cal;
    // Decide which operation needs to be performed
    switch (operator) {
      case "/":
        cal = String(parseFloat(prevState) / parseFloat(currState));
        break;

      case "+":
        cal = String(parseFloat(prevState) + parseFloat(currState));
        break;
      case "X":
        cal = String(parseFloat(prevState) * parseFloat(currState));
        break;
      case "-":
        cal = String(parseFloat(prevState) - parseFloat(currState));
        break;
      default:
        return;
    }

    setInput("");
    // storing the result in prev state
    setPrevState(cal);
    setCurrState("");
    setIsOperator(false);
  };

  const addOrSubtract = () => {
    //  To toggle the sign
    setIsOperator(false);
    if (currState.charAt(0) === "-") {
      // if minus sign is already present then remove the first char
      setCurrState(currState.substring(1));
    } else {
      // add one minus sign to the first
      setCurrState("-" + currState);
    }
  };

  const percentOp = () => {
    setIsOperator(false);
    prevState
      ? setCurrState(String((parseFloat(currState) / 100) * prevState))
      : setCurrState(String(parseFloat(currState) / 100));
  };

  const resetState = () => {
    // When "AC" is clicked, we will be resetting all our states to it's default values
    setPrevState("");
    setCurrState("");
    setInput("0");
    setIsOperator(false);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            // using NumericFormat to disabling leading zeros in the input field
            <>
              <NumericFormat
                value={input}
                displayType={"text"}
                thousandSeparator={true}
              />
            </>
          ) : (
            <NumericFormat
              value={prevState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}

          {isOperator && (
            <span style={{ color: "whitesmoke", fontSize: "large" }}>
              {operator}
            </span>
          )}
        </div>
        <div className="btn light-gray" onClick={resetState}>
          AC
        </div>
        <div className="btn light-gray" onClick={percentOp}>
          %
        </div>
        <div className="btn light-gray" onClick={addOrSubtract}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={handleInputNum}>
          7
        </div>
        <div className="btn" onClick={handleInputNum}>
          8
        </div>
        <div className="btn" onClick={handleInputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn" onClick={handleInputNum}>
          4
        </div>
        <div className="btn" onClick={handleInputNum}>
          5
        </div>
        <div className="btn" onClick={handleInputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={handleInputNum}>
          1
        </div>
        <div className="btn" onClick={handleInputNum}>
          2
        </div>
        <div className="btn" onClick={handleInputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>

        <div className="btn" onClick={handleInputNum}>
          .
        </div>
        <div className="btn zero" onClick={handleInputNum}>
          0
        </div>
        <div className="btn equals" onClick={calculateResult}>
          =
        </div>
      </div>
    </div>
  );
}

export default Calculator;
