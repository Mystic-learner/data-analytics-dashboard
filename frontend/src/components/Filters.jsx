import { useState } from "react";

export default function Filters({ onFilter }) {
  const [filters, setFilters] = useState({});

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="filters-row">
      {/* Date Inputs */}
      <input 
        type="date" 
        name="startDate" 
        className="filter-pill" 
        onChange={handleChange} 
      />
      <input 
        type="date" 
        name="endDate" 
        className="filter-pill" 
        onChange={handleChange} 
      />

      {/* Select Dropdowns */}
      <select name="category" className="filter-pill" onChange={handleChange}>
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      <select name="status" className="filter-pill" onChange={handleChange}>
        <option value="">All Status</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>

      {/* The Button */}
      <button className="apply-btn-pill" onClick={() => onFilter(filters)}>
        Apply Filters
      </button>
    </div>
  );
}