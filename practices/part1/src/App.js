import { useState } from "react";

const Hello = ({ name, age }) => {
  //const {name,age}= props
  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>
        Hello World: {name} you are {age} years old
      </p>
      <p>So you were born probably in {bornYear()}</p>
    </div>
  );
};

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const a = 120;
  const b = 50;
  const clauddiaAge = 40;

  //EJEMPLO DE CONTADOR
  //usesState lo inicia en 0, con setCounter lo voy modificando y el se renderiza
  const [counter, setCounter] = useState(0);

  //setTimeout(()=>setCounter(counter+1),1000)

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  //EJEMPLO DE COMPLEX STATE

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks,setAllClicks]=useState([])

  const [clicksDir, setClicksDir] = useState({ cLeft: 0, cRight: 0 });

  const hanldleLeftClick=()=>{

    setAllClicks(allClicks.concat('L'))
    //Esto es lo mismo que lo que esta comentado abajo, simplemte la notación
    //{...object,objectpropertie:value} crea un objeto con las propiedades originales, e inmediatamente la cambio despues
    // de la coma
    setClicksDir({...clicksDir,cLeft:clicksDir.cLeft+1})

    /* const newClick={
      cLeft: clicksDir.cLeft+1,
      cRight: clicksDir.cRight
    }
    setClicksDir(newClick) */
  }

  const handleRightClick=()=>{
    setAllClicks(allClicks.concat('R'))
    const newClick={
      ...clicksDir,
      cRight:clicksDir.cRight+1
    }
    setClicksDir(newClick)
  }
  

  return (
    <>
      <p>
        {a} + {b} = {a + b}
      </p>
      <Hello name="Jorge" age="25" />
      <Hello name="Claudia" age={clauddiaAge} />

      <h1> EJEMPLO DE CONTADOR</h1>

      <Display counter={counter} />
      <Button onClick={increaseByOne} text="Plus" />
      <Button onClick={decreaseByOne} text="Minus" />
      <Button onClick={setToZero} text="Reset" />

      <h1> EJEMPLO DE COMPLEX STATE</h1>

      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}> Left</button>
        {right}
        <button onClick={() => setRight(right + 1)}> Right</button>
      </div>

      <div>
        {clicksDir.cLeft}
        <button onClick={hanldleLeftClick}> Left</button>
        {clicksDir.cRight}
        <button onClick={handleRightClick}> Right</button>
      </div>
      <p>All clicks: {allClicks.join(' ')}</p>
    </>
  );
};

export default App;
