import React, { useState } from 'react';

function DepositForm({ goals, onMakeDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoalId || !depositAmount) {
      alert('Please select a goal and enter an amount.');
      return;
    }
    const parsedDepositAmount = parseFloat(depositAmount);
    if (isNaN(parsedDepositAmount) || parsedDepositAmount <= 0) {
      alert('Deposit amount must be a positive number.');
      return;
    }

    onMakeDeposit(selectedGoalId, parsedDepositAmount);

    // Clear form
    setSelectedGoalId('');
    setDepositAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <div>
        <label>Select Goal:</label>
        <select
          value={selectedGoalId}
          onChange={(e) => setSelectedGoalId(e.target.value)}
          required
        >
          <option value="">-- Select a Goal --</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.savedAmount} / ${goal.targetAmount})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Deposit Amount:</label>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          required
          min="1"
        />
      </div>
      <button type="submit">Make Deposit</button>
    </form>
  );
}

export default DepositForm;