import React, { useState } from "react";
import TabsContainer from "../admin_tabs/admin_tabscontent";
import "./inventory.css";  // We will create a CSS file for styling

const Inventory = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="inventory">
      <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Inventory;
