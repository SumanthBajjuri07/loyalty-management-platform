
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './MemberManagement.css';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; 

const supabaseUrl = 'https://vfcdcttmvwskzqfpuqxq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmY2RjdHRtdndza3pxZnB1cXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NjIwMDUsImV4cCI6MjAzNTQzODAwNX0.Y94iLW2Piy7Cqdcu9S0I9k_rr3CD99RbE--MDtpI4P0';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMember, setNewMember] = useState({ member_id: '', name: '', email: '', points: 0 });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('Members').select('*');
    if (error) {
      console.error(error);
    } else {
      setMembers(data);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('Members').insert([newMember]);
      if (error) {
        throw error;
      }
      if (data && data.length > 0) {
        setMembers([...members, data[0]]);
        setNewMember({ member_id: '', name: '', email: '', points: 0 });
      } else {
        console.error('Insert operation did not return expected data:', data);
      }
    } catch (error) {
      console.error('Error inserting member:', error.message);
    }
  };

  const handleEdit = async (id, field, value) => {
    const { data, error } = await supabase
      .from('Members')
      .update({ [field]: value })
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      fetchMembers();
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('Members').delete().eq('id', id);
      if (error) {
        throw error;
      }
      setMembers(members.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error.message);
    }
  };
  

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transaction-form">
      <h1>Member Management</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <table className="members-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Member ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.member_id}</td>
              <td>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleEdit(member.id, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={member.email}
                  onChange={(e) => handleEdit(member.id, 'email', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={member.points}
                  onChange={(e) => handleEdit(member.id, 'points', e.target.value)}
                />
              </td>
              <td>
                <AiFillEdit
                  className="edit-icon"
                  onClick={() => handleEdit(member.id, 'name', member.name)}
                />
                <AiFillDelete
                  className="delete-icon"
                  onClick={() => handleDelete(member.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} className="add-member-form">
        <h2>Add New Member</h2>
        <input
          type="text"
          name="member_id"
          placeholder="Member ID"
          value={newMember.member_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newMember.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newMember.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="points"
          placeholder="Points"
          value={newMember.points}
          onChange={handleChange}
        />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default  MemberManagement;



