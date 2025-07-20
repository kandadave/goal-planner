import React, { useState } from 'react';

function AddGoalForm({ onAddGoal }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || !category || !deadline) {
      alert('Please fill in all fields.');
      return;
    }
    const parsedTargetAmount = parseFloat(targetAmount);
    if (isNaN(parsedTargetAmount) || parsedTargetAmount <= 0) {
      alert('Target amount must be a positive number.');
      return;
    }

    onAddGoal({
      name,
      targetAmount: parsedTargetAmount,
      category,
      deadline,
    });

    // Clear form
    setName('');
    setTargetAmount('');
    setCategory('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-goal-form">
      <div>
        <label>Goal Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Target Amount:</label>
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
          min="1"
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default AddGoalForm;