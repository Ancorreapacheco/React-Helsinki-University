const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Content = ({ part }) => {
  return (
    <Part part={part}/>
  );
};
const Course=({course})=>{

    const total= course.parts.reduce((acc,cur)=> acc+cur.exercises,0)
    
    return (
      <div>
        <Header course={course.name}/>
        <ul>
          {course.parts.map((part)=><Content key={part.id} part={part}/>)}
        </ul>
        <Total sum={total}/>
      </div>
    )
  }

export default Course