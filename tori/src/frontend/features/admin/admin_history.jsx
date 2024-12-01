import React, { useState } from 'react';
import './admin_history.css';

function History() {
  const [selectedDate, setSelectedDate] = useState('Today');

  // Sample data for history items
  const historyData = [
    { id: 1, title: 'Items Sold', seller: 'Seller 1', amount: 60, date: '17 Sep 2023', time: '11:21 AM', highlight: true },
    { id: 2, title: 'Items Sold', seller: 'Seller 1', amount: 60, date: '17 Sep 2023', time: '11:21 AM' },
    { id: 3, title: 'Items Sold', seller: 'Seller 1', amount: 60, date: '17 Sep 2023', time: '11:21 AM' },
    { id: 4, title: 'Items Sold', seller: 'Seller 1', amount: 60, date: '17 Sep 2023', time: '11:21 AM' },
    { id: 5, title: 'Items Sold', seller: 'Seller 1', amount: 60, date: '17 Sep 2023', time: '11:21 AM' },
  ];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="history-container">
      <div className="header">
        <span>History</span>
        <select
          className="filter-dropdown"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
        </select>
      </div>

      <div className="history-list">
        {historyData.map((item) => (
          <div
            key={item.id}
            className={`history-item ${item.highlight ? 'highlight' : ''}`}
          >
            <div className="item-details">
              <div className="title">{item.title}</div>
              <div className="sub-title">{`Seller Name: ${item.seller}`}</div>
              <div className="sub-title">{`${item.date} ${item.time}`}</div>
            </div>
            <div className="amount">₱ {item.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="footer-button">Home</div>
        <div className="footer-button">Inventory</div>
        <div className="footer-button active">History</div>
        <div className="footer-button">Profile</div>
      </div>
    </div>
  );
}

export default History;
