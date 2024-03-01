import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('date');
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const recordsPerPage = 20;

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const fetchData = async () => {
    try {
      let url = `http://localhost:8080/api/records?page=${page}&search=${search}&sortBy=${sortBy}`;
      if (search) {
        url += `&customer_name=${search}&location=${search}`;
      }
      const response = await axios.get(url);
      const slicedData = response.data.slice((page - 1) * recordsPerPage, page * recordsPerPage);
      setCustomers(slicedData);
      setSortedData(slicedData);
      setTotalPages(Math.ceil(response.data.length / recordsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortData = (data, sortBy, order) => {
    const sorted = [...data].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'time') {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return order === 'asc' ? timeA - timeB : timeB - timeA;
      }
      return 0;
    });

    return sorted;
  };

  const handleSortByDate = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortBy('date');
    setSortedData(sortData(customers, 'date', newOrder));
  };

  const handleSortByTime = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortBy('time');
    setSortedData(sortData(customers, 'time', newOrder));
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateTimeString) => {
    const time = new Date(dateTimeString);
    return time.toLocaleTimeString();
  };

  return (
    <div className="container">
      {/* Zithara company logo */}
      <img src="https://zithara.com/wp-content/uploads/2023/11/Zithara-Main.png" alt="Zithara Logo" className="zithara-logo" />
      {/* New image at top right */}
      <img src="data:image/png;base64,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" alt="Zithara Logo" className="new-image" />
      
      <h1 className="heading">Company-Task-Driven Assessment</h1>
      <h1 className="heading">Customer Records</h1>
      
      <div className="search-container">
  <input
    type="text"
    placeholder="Search by Customer Name or Location"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-input"
  />
  <button onClick={fetchData} className="search-btn">
    Search
  </button></div>

      
      <div className="sorting-options">
  <div className="sort-buttons">
    <button onClick={handleSortByDate} className={`sort-btn date ${sortBy === 'date' ? 'active' : ''}`}>
      Sort by Date
    </button>
    <button onClick={handleSortByTime} className={`sort-btn time ${sortBy === 'time' ? 'active' : ''}`}>
      Sort by Time
    </button>
  </div>
</div>
<br></br>

      <table className="customer-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              <td>{(page - 1) * recordsPerPage + index + 1}</td>
              <td>{row.customer_name}</td>
              <td>{row.age}</td>
              <td>{row.phone}</td>
              <td>{row.location}</td>
              <td>{formatDate(row.created_at)}</td>
              <td>{formatTime(row.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="pagination-btn">
          Previous
        </button>
        <div className="page-numbers">
          Page {page} of {totalPages}
        </div>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="pagination-btn">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
