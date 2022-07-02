const Hello=(props)=>{
  return(
    <div>
      <p>Hello World: {props.name} you are {props.age} old</p>
    </div>
  )
}

const App = () => {
  
  const a = 120;
  const b = 50;
  const clauddiaAge=40

  return (
    <>      
      <p>
        {a} + {b} = {a+b}
      </p>
      <Hello name="Jorge" age="25"/>
      <Hello name="Claudia" age={clauddiaAge}/>
    </>
  );
};

export default App;
