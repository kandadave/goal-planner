import React, { useState } from 'react';

function GoalItem({ goal, onUpdateGoal, onDeleteGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(goal.name);
  const [editedTargetAmount, setEditedTargetAmount] = useState(goal.targetAmount);
  const [editedCategory, setEditedCategory] = useState(goal.category);
  const [editedDeadline, setEditedDeadline] = useState(goal.deadline);

  const progress = (goal.savedAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.savedAmount;
  const isComplete = goal.savedAmount >= goal.targetAmount;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const parsedTargetAmount = parseFloat(editedTargetAmount);
    if (isNaN(parsedTargetAmount) || parsedTargetAmount <= 0) {
      alert('Target amount must be a positive number.');
      return;
    }

    onUpdateGoal(goal.id, {
      name: editedName,
      targetAmount: parsedTargetAmount,
      category: editedCategory,
      deadline: editedDeadline,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset edited fields to original goal values
    setEditedName(goal.name);
    setEditedTargetAmount(goal.targetAmount);
    setEditedCategory(goal.category);
    setEditedDeadline(goal.deadline);
  };

  return (
    <div className={`goal-item ${isComplete ? 'goal-completed' : ''}`}>
      {isEditing ? (
        <div className="edit-form">
          <label>Name:</label>
          <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
          <label>Target:</label>
          <input type="number" value={editedTargetAmount} onChange={(e) => setEditedTargetAmount(e.target.value)} min="1" />
          <label>Category:</label>
          <input type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} />
          <label>Deadline:</label>
          <input type="date" value={editedDeadline} onChange={(e) => setEditedDeadline(e.target.value)} />
          <div className="button-group">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{goal.name} {isComplete && <span className="completed-badge">(Completed!)</span>}</h3>
          <p>Category: {goal.category}</p>
          <p>Deadline: {goal.deadline}</p>
          <p>Created: {goal.createdAt}</p>
          <p>
            Saved: ${goal.savedAmount.toLocaleString()} / Target: ${goal.targetAmount.toLocaleString()}
          </p>
          <p>Remaining: ${remaining.toLocaleString()}</p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{progress.toFixed(2)}%</span>

          <div className="button-group">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalItem;