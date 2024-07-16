import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './TransactionManagement.css';

const supabaseUrl = 'https://vfcdcttmvwskzqfpuqxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmY2RjdHRtdndza3pxZnB1cXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NjIwMDUsImV4cCI6MjAzNTQzODAwNX0.Y94iLW2Piy7Cqdcu9S0I9k_rr3CD99RbE--MDtpI4P0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');

  useEffect(() => {
    const fetchUsernames = async () => {
        const { data, error } = await supabase
          .from('Transactions')
          .select('username');
      
        if (error) {
          console.error('Error fetching usernames:', error);
        } else {
          console.log('Fetched usernames:', data); // Log the fetched data
          const uniqueUsernames = [...new Set(data.map(item => item.username))];
          console.log('Unique usernames:', uniqueUsernames); // Log unique usernames
          setUsernames(uniqueUsernames);
        }
      };
      

    fetchUsernames();
  }, []);

  const handleViewTransactions = async () => {
    const { data, error } = await supabase
      .from('Transactions')
      .select('*')
      .eq('username', selectedUsername);

    if (error) {
      console.error('Error fetching transactions:', error);
    } else {
      setTransactions(data);
    }
  };

  return (
    <div className="transaction-management">
      <h1>Transaction Management</h1>
      <div className="search-box">
        <select
          value={selectedUsername}
          onChange={(e) => setSelectedUsername(e.target.value)}
        >
          <option value="" disabled>Select a username</option>
          {usernames.map((username, index) => (
            <option key={index} value={username}>
              {username}
            </option>
          ))}
        </select>
        <button onClick={handleViewTransactions}>View Transactions</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Member ID</th>
            <th>Username</th>
            <th>Operation Type</th>
            <th>Credited Date and Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.member_id}</td>
              <td>{transaction.username}</td>
              <td>{transaction.operation_type}</td>
              <td>{transaction.credited_date_and_time}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionManagement;
