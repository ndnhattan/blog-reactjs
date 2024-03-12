import React, { useEffect, useState } from "react";
import LiveSearch from "./LiveSearch";

const DataTable = ({
  name,
  data,
  columns,
  numOfPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  onKeySearch,
  onSelectedRows,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const renderHeaders = () => {
    return columns.map((column, index) => {
      return <th key={index}>{column.name}</th>;
    });
  };

  useEffect(() => {
    onSelectedRows(selectedRows);
  }, [selectedRows]);

  const renderData = () => {
    return data?.map((row, index) => {
      return (
        <tr key={index}>
          <td>
            <input
              checked={selectedRows.includes(String(row.id))}
              type="checkbox"
              value={row.id}
              className="form-check-input"
              onChange={handleClickCheckbox}
            />
          </td>
          {columns.map((column, ind) => {
            return <td key={ind}>{column.element(row)}</td>;
          })}
        </tr>
      );
    });
  };

  const handleClickCheckbox = (event) => {
    let checked = event.target.checked;
    let value = event.target.value;
    if (checked) {
      if (!selectedRows.includes(value)) {
        setSelectedRows([...selectedRows, value]);
      }
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== value));
    }
  };

  const renderPagination = () => {
    const pagination = [];
    const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

    pagination.push(
      <li
        key="prev"
        className={prevPage === null ? "page-item disabled" : "page-item"}
      >
        <button className="page-link" onClick={() => onPageChange(prevPage)}>
          &laquo;
        </button>
      </li>
    );

    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <li
          key={i}
          className={currentPage === i ? "page-item active" : "page-item"}
        >
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    pagination.push(
      <li
        key="next"
        className={nextPage === null ? "page-item disabled" : "page-item"}
      >
        <button className="page-link" onClick={() => onPageChange(nextPage)}>
          &raquo;
        </button>
      </li>
    );

    return pagination;
  };

  const onChangeOption = (e) => {
    const target = e.target;
    onItemsPerPageChange(target.value);
  };

  const onSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(data.map((item) => String(item.id)));
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-table me-1"></i>
        {name}
      </div>
      <div className="card-body">
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <label className="d-inline-flex">
              Show
              <select
                name="example_length"
                className="form-select form-select-sm ms-1 me-1"
                onChange={onChangeOption}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>{" "}
              entries
            </label>
          </div>
          <div className="col-sm-12 col-md-6">
            <label className="d-inline-flex float-end">
              Search:
              <LiveSearch onKeySearch={onKeySearch} />
            </label>
          </div>
        </div>
        <table
          className="table table-striped table-bordered"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <td>
                <input
                  checked={
                    selectedRows.length === (data?.length ?? 0) ? true : false
                  }
                  type="checkbox"
                  className="form-check-input"
                  onChange={onSelectAll}
                />
              </td>
              {renderHeaders()}
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
          <tfoot>
            <tr>
              <td></td>
              {renderHeaders()}
            </tr>
          </tfoot>
        </table>
        {numOfPage > 1 && (
          <div className="row">
            <div className="col-sm-12 col-md-7">
              <ul className="pagination justify-content-end">
                {renderPagination()}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
