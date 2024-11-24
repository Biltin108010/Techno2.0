import React from 'react';
import './home.css';

function Home() {
  const data = [
    {
      id: 1,
      title: 'Total Vendors',
      value: 5,
      percentage: '+14',
      trend: 'up',
    },
    {
      id: 2,
      title: 'Total Sales',
      value: '₱2,100',
      percentage: '+12',
      trend: 'up',
    },
    {
      id: 3,
      title: 'Total Orders',
      value: 21,
      percentage: '+43',
      trend: 'up',
    },
  ];

  return (
    <div className="home-container">
      <div className="header">
        <h1>Home</h1>
        <div className="header-controls">
          <select className="dropdown">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <button className="control-button">Export</button>
          <button className="control-button">Filter</button>
        </div>
      </div>

      <div className="card-container">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-header">
              <span className="card-icon">+</span>
              <span className="card-title">{item.title}</span>
              <button className="card-menu">⋮</button>
            </div>
            <div className="card-body">
              <div className="card-value">{item.value}</div>
              <div className="card-percentage">
                <span className={`percentage ${item.trend}`}>{item.percentage} ↑</span>
              </div>
              <div className="trend-graph">~~~</div>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="footer-button active">Home</div>
        <div className="footer-button">Inventory</div>
        <div className="footer-button">History</div>
        <div className="footer-button">Profile</div>
      </div>
    </div>
  );
}

export default Home;
