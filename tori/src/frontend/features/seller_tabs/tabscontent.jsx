'use client'

import React, { useState } from 'react'
import Tab1 from './tab1/tab1'
import Tab2 from './tab2/tab2'
import Tab3 from './tab3/tab3'
import EditTab1 from './tab1/edit_tab1'
import EditTab2 from './tab2/edit_tab2'
import EditTab3 from './tab3/edit_tab3'
import './TabsContainer.css'

export default function TabContainer() {
  const [activeTab, setActiveTab] = useState(0)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true) // Enable edit mode when Edit button is clicked
  }

  const handleBackClick = () => {
    setIsEditing(false) // Go back to the normal tab view
  }

  const renderTabContent = () => {
    if (isEditing) {
      switch (activeTab) {
        case 0:
          return <EditTab1 />
        case 1:
          return <EditTab2 />
        case 2:
          return <EditTab3 />
        default:
          return null
      }
    } else {
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
  }

  return (
    <div className="tab-container">
      <div className="header">
        <div className="title">
          {isEditing && (
            <button className="back-button" onClick={handleBackClick}>
              &#8592; {/* Unicode for left arrow */}
            </button>
          )}
          <h2>Inventory</h2>
        </div>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search product"
            className="search-input"
          />
        </div>
        {/* Show Edit button only when in Tab1 or EditTab1 */}
        {!isEditing && activeTab === 0 && (
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        )}
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
  )
}
