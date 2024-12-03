import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaFilter } from 'react-icons/fa'; // Importing specific icons from React Icons
import supabase from "../../../backend/supabaseClient"; // Import your Supabase client
import './history.css';

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // To store filtered history data
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Today'); // Holds the selected date from dropdown
  const [filterPeriod, setFilterPeriod] = useState(''); // Holds selected filter period (e.g., Today, This Week)
  const [startDate, setStartDate] = useState(''); // Custom start date
  const [endDate, setEndDate] = useState(''); // Custom end date

  // Fetch initial history data
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('audit_logs') // Replace with your table name
          .select('name, email, price, quantity, created_at') // Fetch the name instead of item_id
          .eq('action', 'DEDUCTION'); // Filter by action DEDUCTION

        if (error) {
          console.error('Error fetching history:', error.message);
          return;
        }

        // Format the data to include computed total price
        const formattedData = data.map((item) => ({
          ...item,
          totalPrice: item.price * item.quantity, // Calculate total price
        }));

        setHistoryData(formattedData);
        setFilteredData(formattedData); // Initialize filtered data
      } catch (err) {
        console.error('Unexpected error:', err.message);
      }
    };

    fetchHistory();
  }, []);

  // Handle dropdown selection
  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);
    let filtered = [...historyData];

    const today = new Date();
    if (selected === 'Today') {
      filtered = filtered.filter(
        (item) =>
          new Date(item.created_at).toDateString() === today.toDateString()
      );
    } else if (selected === 'Yesterday') {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      filtered = filtered.filter(
        (item) =>
          new Date(item.created_at).toDateString() === yesterday.toDateString()
      );
    } else if (selected === 'Last Week') {
      const lastWeekStart = new Date(today.setDate(today.getDate() - 7));
      filtered = filtered.filter(
        (item) => new Date(item.created_at) >= lastWeekStart
      );
    } else if (selected === 'Last Month') {
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
      filtered = filtered.filter(
        (item) => new Date(item.created_at) >= lastMonth
      );
    }

    setFilteredData(filtered);
  };

  // Filter the data based on the custom filter modal
  const applyFilters = () => {
    let filtered = [...historyData];

    const today = new Date();
    if (filterPeriod === 'Today') {
      filtered = filtered.filter(
        (item) =>
          new Date(item.created_at).toDateString() === today.toDateString()
      );
    } else if (filterPeriod === 'This Week') {
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay())); // Start of the week
      filtered = filtered.filter((item) => new Date(item.created_at) >= weekStart);
    } else if (filterPeriod === 'This Month') {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
      filtered = filtered.filter((item) => new Date(item.created_at) >= monthStart);
    } else if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter(
        (item) => new Date(item.created_at) >= start && new Date(item.created_at) <= end
      );
    }

    setFilteredData(filtered);
    toggleFilterModal(); // Close the filter modal after applying filters
  };

  const toggleFilterModal = () => {
    setFilterModalOpen(!isFilterModalOpen);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  return (
    <div className="history-container">
      <header className="history-header">
        <h1 className="history-title">History</h1>
        <div className="logo">
          <img src="/images/tori_logo2.png" alt="Logo" width={68} height={68} />
        </div>
      </header>

      <div className="divider"></div>

      <div className="header-actions">
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
        <button className="filter-icon" onClick={toggleFilterModal}>
          <FaFilter size={24} /> {/* React Filter Icon */}
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="filter-modal">
          <div className="filter-modal-content">
            <button className="close-modal-button" onClick={closeFilterModal}>
              ✕
            </button>
            <h1 className="filter-title">Filter</h1>
            <div className="divider"></div>

            {/* Filter Options */}
            <div className="filter-options">
              <div className="filter-section">
                <h2 className="filter-subtitle">Custom Date Range</h2>
                <div className="date-range">
                  <input
                    type="date"
                    className="date-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span> - </span>
                  <input
                    type="date"
                    className="date-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <button className="filter-apply-button" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History List */}
      <div className="history-list">
        {filteredData.map((item) => (
          <div key={item.name} className="history-item">
            <FaCartPlus size={24} className="item-icon" />
            <div className="item-details">
              <div className="title">Name: {item.name}</div>
              <div className="sub-title">Email: {item.email}</div>
            </div>
            <div className="amount-date">
              <div className="amount">
                ₱ {item.totalPrice.toFixed(2)} (Qty: {item.quantity})
              </div>
              <div className="sub-date">
                {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
