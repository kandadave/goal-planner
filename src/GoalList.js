import React from 'react';
import GoalItem from './GoalItem';

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  if (goals.length === 0) {
    return <p>No goals added yet. Start by adding a new goal!</p>;
  }

  return (
    <div className="goal-list">
      {goals.map(goal => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
        />
      ))}
    </div>
  );
}

export default GoalList;