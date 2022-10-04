import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setMessage } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

export default function AnecdoteList() {
  const filterPattern= useSelector(state=> state.filter)
  const anecdotes = useSelector((state) => state.anecdotes.filter(anecdote=> anecdote.content.toLowerCase().includes(filterPattern)));
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
          handleVote={() => {
            dispatch(setMessage({ message: `you voted '${anecdote.content}'` }));
            dispatch(voteAnecdote(anecdote.id));
          }}
        />
      ))}
      {/* {anecdotes.map(anecdote=> 
      <Anecdote anecdote={anecdote} key={anecdote.id} handleVote={() => dispatch(setMessage({message:'hello'}))}/>)} */}
      {/* {anecdotes.map(anecdote=> 
      <Anecdote anecdote={anecdote} key={anecdote.id} handleVote={() => dispatch(voteAnecdote(anecdote.id))}/>)} */}
    </>
  );
}
