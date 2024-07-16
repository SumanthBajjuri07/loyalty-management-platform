import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './PointsManagement.css';

const supabaseUrl = 'https://vfcdcttmvwskzqfpuqxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmY2RjdHRtdndza3pxZnB1cXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NjIwMDUsImV4cCI6MjAzNTQzODAwNX0.Y94iLW2Piy7Cqdcu9S0I9k_rr3CD99RbE--MDtpI4P0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PointsManagement = () => {
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [operationType, setOperationType] = useState('Credit');
  const [points, setPoints] = useState('');

  useEffect(() => {
    fetchUsernames();
  }, []);

  const fetchUsernames = async () => {
    let { data: Transactions, error } = await supabase
      .from('Transactions')
      .select('username')
      .order('username', { ascending: true });

    if (error) console.error('Error fetching usernames:', error);
    else setUsernames([...new Set(Transactions.map(tx => tx.username))]);
  };

  const handleInsert = async () => {
    const { data, error } = await supabase
      .from('Transactions')
      .insert([
        {
          member_id: 'default_member_id', // Replace with actual logic to get member_id
          username: selectedUsername,
          operation_type: operationType,
          credited_date_and_time: new Date().toISOString(),
          status: 'default_status', // Replace with actual default status
          points: parseInt(points)
        }
      ]);

    if (error) {
      console.error('Error inserting transaction:', error);
    } else {
      console.log('Transaction inserted successfully:', data);
    }
  };

  return (
    <div className="points-management">
      <h2>Points Management</h2>
      <div className="form-group">
        <label>Select Username:</label>
        <select
          value={selectedUsername}
          onChange={(e) => setSelectedUsername(e.target.value)}
        >
          <option value="">Select Username</option>
          {usernames.map((username) => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Operation Type:</label>
        <select
          value={operationType}
          onChange={(e) => setOperationType(e.target.value)}
        >
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
      </div>
      <div className="form-group">
        <label>Points:</label>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      </div>
      <button onClick={handleInsert}>Submit</button>
    </div>
  );
};

export default PointsManagement;