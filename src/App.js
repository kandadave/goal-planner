import React, { useState, useEffect } from 'react';
import GoalList from './GoalList';
import GoalOverview from './GoalOverview';
import AddGoalForm from './AddGoalForm';
import DepositForm from './DepositForm';
import './App.css'; 

const API_URL = 'https://json-server-smart-goal-planner.onrender.com/goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Initial Goals 
  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGoals(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        console.error("Failed to fetch goals:", err);
      });
  }, []); 


  // Add New Goal
  const handleAddGoal = async (newGoalData) => {
    const newGoal = {
      id: Date.now().toString(), // Simple unique ID
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      ...newGoalData, // name, targetAmount, category, deadline
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal),
      });
      if (!response.ok) {
        throw new Error('Failed to add goal');
      }
      const addedGoal = await response.json();
      setGoals(prevGoals => [...prevGoals, addedGoal]);
    } catch (err) {
      console.error('Error adding goal:', err);
      setError(err);
    }
  };

  // Update Existing Goal (used for name, target, category, deadline)
  const handleUpdateGoal = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH', // Using PATCH for partial updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
      const updatedGoal = await response.json();
      setGoals(prevGoals =>
        prevGoals.map(goal => (goal.id === id ? updatedGoal : goal))
      );
    } catch (err) {
      console.error('Error updating goal:', err);
      setError(err);
    }
  };

  // Delete Goal
  const handleDeleteGoal = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError(err);
    }
  };

  // Make a Deposit (updates savedAmount)
  const handleMakeDeposit = async (goalId, depositAmount) => {
    const goalToUpdate = goals.find(g => g.id === goalId);
    if (!goalToUpdate) {
      console.error("Goal not found for deposit:", goalId);
      return;
    }

    const newSavedAmount = goalToUpdate.savedAmount + depositAmount;

    try {
      const response = await fetch(`${API_URL}/${goalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });
      if (!response.ok) {
        throw new Error('Failed to make deposit');
      }
      const updatedGoal = await response.json();
      setGoals(prevGoals =>
        prevGoals.map(goal => (goal.id === goalId ? updatedGoal : goal))
      );
    } catch (err) {
      console.error('Error making deposit:', err);
      setError(err);
    }
  };

  if (loading) return <div>Loading goals...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app-container">
      <h1>Smart Goal Planner</h1>

      <section className="overview-section">
        <h2>Savings Overview</h2>
        <GoalOverview goals={goals} />
      </section>

      <section className="add-deposit-section">
        <div className="form-card">
          <h2>Add New Goal</h2>
          <AddGoalForm onAddGoal={handleAddGoal} />
        </div>
        <div className="form-card">
          <h2>Make a Deposit</h2>
          <DepositForm goals={goals} onMakeDeposit={handleMakeDeposit} />
        </div>
      </section>

      <section className="goals-list-section">
        <h2>My Financial Goals</h2>
        <GoalList
          goals={goals}
          onUpdateGoal={handleUpdateGoal}
          onDeleteGoal={handleDeleteGoal}
        />
      </section>
    </div>
  );
}

export default App;