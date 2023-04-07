import React from "react";
import { Button } from "antd";

const pagination = ({ data, postPerPage, paginate }) => {
  // console.log(data);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="d-flex justify-content-end ">
      {pageNumbers.map((number) => {
        return (
          <Button
            className="mx-1 "
            onClick={() => paginate(number)}
            type="primary"
            ghost
            shape="circle"
          >
            {number}
          </Button>
        );
      })}
    </div>
  );
};

export default pagination;
