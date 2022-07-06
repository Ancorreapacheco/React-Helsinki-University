import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}> {text}</button>;
};

const VoteLine = ({ votes }) => {
  if (votes > 0) {
    return <p>Has {votes} votes</p>;
  }
  return <p>Has 0 votes</p>;
};

const AnecdoteMostVoted = ({ votes, anecdote }) => {
  if (votes === 0) {
    return (
      <div>
        <p>Anyone has vote yet</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

function App() {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const selectAnecdote = () => {
    const numberRandom = Math.floor(Math.random() * anecdotes.length);
    setSelected(numberRandom);
  };

  const addVote = () => {
    const copyVotes = { ...votes };

    if (selected in copyVotes) {
      copyVotes[selected] += 1;
    } else {
      copyVotes[selected] = 1;
    }

    setVotes(copyVotes);
  };

  const getVotes = () => {
    return votes[selected];
  };

  const mostVoted=()=>{
    
    if(Object.keys(votes).length ===0) return [0,0]
    return Object.entries(votes).reduce((v, max) => (max[1] < v[1] ? v : max))
  }

  

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <VoteLine votes={getVotes()} />
      <Button onClick={addVote} text="Vote" />
      <Button onClick={selectAnecdote} text="Next Anecdote" />
      <AnecdoteMostVoted votes={mostVoted()[1]} anecdote={anecdotes[mostVoted()[0]]} />
    </>
  );
}

export default App;
