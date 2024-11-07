import React from "react";
import { Col, FormGroup, Input, Label } from "reactstrap";
import "./ColumnToggle.scss"; // Import your custom styles

const ColumnToggle = ({ columns, selectedColumns, handleColumnToggle, handleSelectAll }) => {
  const allSelected = columns.every(col => selectedColumns.includes(col.name));

  return (
    <div className="column-toggle-container">
      <h5 className="toggle-header">Select Columns</h5>
      <div className="column-toggle">
        <FormGroup check className="column-toggle-item">
          <Label for="toggle-all">
            <Input
              id="toggle-all"
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
              inline
              className="column-toggle-checkbox"
            />
            Select All
          </Label>
        </FormGroup>
        {columns.map((col) => (
          <FormGroup key={col.name} check className="column-toggle-item">
            <Label for={`toggle-${col.name}`}>{col?.name}</Label>
            <Input
              id={`toggle-${col.name}`}
              type="checkbox"
              checked={selectedColumns.includes(col.name)}
              onChange={() => handleColumnToggle(col.name)}
              inline
              className="column-toggle-checkbox"
            />
          </FormGroup>
        ))}
      </div>
    </div>
  );
};

export default ColumnToggle;
