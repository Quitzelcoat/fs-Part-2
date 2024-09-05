/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <p>total of {totalExercises} exercises </p>
    </div>
  );
};

export default Total;
