import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
const ding = `https://thumbs.dreamstime.com/audiothumb_16966/169665474.mp3`;

const HCounter = styled.h1`
  font-size: 40px;
  line-height: 0px;
  padding: 40px;
  text-align: center;
`;

const HNumber = styled.h1`
  text-align: center;
  line-height: 0px;
  padding: 20px;
  font-size: 80px;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 20px 30px;
  margin: 20px;
  font-size: 20px;
  background-color: ${(props) => props.color || "seagreen"};
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-content: center;
`;

const Counter = () => {
  const initialState = { count: 0, history: [] };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UP":
        return {
          count: state.count + 1,
          history: [
            ...state.history,
            `count increased to ${state.count + 1}`,
          ].slice(-5),
        };

      case "DOWN":
        return {
          count: state.count - 1,
          history: [
            ...state.history,
            `count decreased to ${state.count - 1}`,
          ].slice(-5),
        };
      case "RESET":
        return {
          count: 0,
          history: [...state.history, `Count reset`].slice(-5),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.count % 5 === 0 && state.count > 0) {
      const audio = new Audio(ding);

      audio.play();
    }
  }, [state.count]);
  const formatNumber = (num) => {
    return num > 0 ? (
      <span>
        <span style={{ color: "black" }}>+</span>
        <span style={{ color: "green" }}>{num}</span>
      </span>
    ) : (
      num
    );
  };

  const formatHistory = (item) => {
    const parts = item.split(" ");
    const change = parts[1];
    let color;
    if (change === "increased") {
      color = "green";
    } else if (change === "decreased") {
      color = "red";
    } else {
      color = "black";
    }
    return <span style={{ color }}>{parts.join(" ")}</span>;
  };

  return (
    <div>
      <HCounter>Counter</HCounter>
      <HNumber>{formatNumber(state.count)}</HNumber>
      <Wrapper>
        <div>
          <Button color="springgreen" onClick={() => dispatch({ type: "UP" })}>
            +
          </Button>
          <Button onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
          <Button color="hotpink" onClick={() => dispatch({ type: "DOWN" })}>
            -
          </Button>
        </div>
        <div>
          <h2>History (last 5 actions):</h2>
          <ul>
            {state.history.map((item, index) => (
              <li key={index}>{formatHistory(item)}</li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};

export default Counter;
