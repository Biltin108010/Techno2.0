'use client';

import React, { useState } from 'react';
import Tab1 from './tab1/tab1';
import Tab2 from './tab2/tab2';
import Tab3 from './tab3/tab3';
import './TabsContainer.css';

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev); // Toggle edit mode
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Tab1 isEditing={isEditing} handleEditMode={toggleEditMode} />;
      case 1:
        return <Tab2 isEditing={isEditing} />;
      case 2:
        return <Tab3 isEditing={isEditing} />;
      default:
        return null;
    }
  };

  return (
    <div className="tab-container">
      <div className="header">
        <div className="header-wrapper">
          <div className="title">
            {isEditing && (
              <button className="back-button" onClick={toggleEditMode}>
                &#8592; {/* Unicode for left arrow */}
              </button>
            )}
            <h2>Inventory</h2>
          </div>

          <div className="search-box-wrapper">
            <input
              type="search"
              placeholder="Search product"
              className="search-input"
            />
            {/* Ensure Edit button appears next to search */}
            {!isEditing && activeTab === 0 && (
              <button className="edit-button" onClick={toggleEditMode}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {['Person 1', 'Person 2', 'Person 3'].map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`tab ${activeTab === index ? 'active-tab' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}
