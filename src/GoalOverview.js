import React from 'react';

function GoalOverview({ goals }) {
  const totalGoals = goals.length;
  const totalMoneySaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);

  // Helper to calculate time left and status
  const getGoalStatus = (goal) => {
    const deadlineDate = new Date(goal.deadline);
    const currentDate = new Date();
    const timeLeftMs = deadlineDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeLeftMs / (1000 * 60 * 60 * 24));

    if (goal.savedAmount >= goal.targetAmount) {
      return <span style={{ color: 'green', fontWeight: 'bold' }}>Completed!</span>;
    } else if (daysLeft < 0) {
      return <span style={{ color: 'red', fontWeight: 'bold' }}>Overdue!</span>;
    } else if (daysLeft <= 30) {
      return <span style={{ color: 'orange', fontWeight: 'bold' }}>Warning: {daysLeft} days left</span>;
    } else {
      return `${daysLeft} days left`;
    }
  };

  return (
    <div className="goal-overview">
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Money Saved:</strong> ${totalMoneySaved.toLocaleString()}</p>
      <p><strong>Goals Completed:</strong> {completedGoals.length} / {totalGoals}</p>

      <h3>Individual Goal Status:</h3>
      <ul>
        {goals.map(goal => (
          <li key={goal.id}>
            <strong>{goal.name}:</strong> {getGoalStatus(goal)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalOverview;