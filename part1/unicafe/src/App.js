import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text}</td>
       <td>{value}</td>
    </tr>
  );
};

const Statistics = ({
  contador,
  neutralValue,
  badValue,
  goodValue,
  average,
  positive,
}) => {
  if (contador === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={goodValue} />
          <StatisticLine text="Neutral" value={neutralValue} />
          <StatisticLine text="Bad" value={badValue} />
          <StatisticLine text="All" value={contador} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setbad] = useState(0);

  let contador = good + neutral + bad;
  let average = contador === 0 ? 0 : (good * 1 + bad * -1) / contador;
  let positive = good === 0 ? 0 : `${(good / contador) * 100}%`;

  const handlerGood = () => {
    setGood(good + 1);
  };
  const handlerNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handlerBad = () => {
    setbad(bad + 1);
  };

  return (
    <>
      <h1>Give FeedBack -Unicafe</h1>
      <Button onClick={handlerGood} text="Good" />
      <Button onClick={handlerNeutral} text="Neutral" />
      <Button onClick={handlerBad} text="Bad" />
      <Statistics
        contador={contador}
        goodValue={good}
        neutralValue={neutral}
        badValue={bad}
        average={average}
        positive={positive}
      />
    </>
  );
}

export default App;
