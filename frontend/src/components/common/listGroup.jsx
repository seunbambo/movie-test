import React from "react";

const ListGroup = ({ items, selectedItem, onItemSelect }) => {
  let year = [];
  for (let element of items) {
    year.push(element.year);
  }
  const it = [...new Set(year)];
  return (
    <div className="form-group position-sticky">
      <label>
        <button>
          <i className="fa fa-filter"></i> Year
        </button>
      </label>
      <select className="form-control" size="10">
        {it.map((item) => (
          <option
            onClick={() => onItemSelect(item)}
            key={item}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListGroup;
