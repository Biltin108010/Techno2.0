'use client'

import React, { useState } from 'react'
import Tab1 from './tab1'
import Tab2 from './tab2'
import Tab3 from './tab3'
import './TabsContainer.css'

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState(0)

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <Tab1 />
      case 1:
        return <Tab2 />
      case 2:
        return <Tab3 />
      default:
        return null
    }
  }

  return (
    <div className="tab-container">
      {/* Header */}
      <div className="header">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search product"
            className="search-input"
          />
        </div>
        <button className="edit-button">Edit</button>
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

      {/* Footer */}
      <div className="footer">
        <button className="review-order-button">Review Order</button>
      </div>
    </div>
  )
}
