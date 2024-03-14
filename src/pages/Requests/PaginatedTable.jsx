import classNames from "classnames";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import styles from "./Requests.module.css";
import { PaginationContainer } from "./PaginationContainer";

export function PaginatedTable({ filteredRequests, handleRequestAction }) {
  const itemsPerPage = 10;
  const itemOffset = 0;
  const [currentPage, setCurrentPage] = useState(0);
  const endOffSet = itemOffset + itemsPerPage;
  const currentItems = filteredRequests.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const pageCount = Math.ceil(filteredRequests.length / endOffSet);

  return (
    <div className={classNames(styles.tableContainer)}>
      {currentItems?.length ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Property</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((request, index) => (
                <tr key={uuid()}>
                  <td>{index + 1}</td>
                  <td>{request.username}</td>
                  <td>{request.propertyTitle}</td>
                  <td>
                    <span
                      className={classNames("badge rounded-pill", {
                        "bg-warning text-white": request.approvalStatus === 1,
                        "bg-success text-white": request.approvalStatus === 2,
                        "bg-danger text-white": request.approvalStatus !== 1 &&
                          request.approvalStatus !== 2,
                      })}
                    >
                      {request.approvalStatus === 1
                        ? "Pending"
                        : request.approvalStatus === 2
                          ? "Approved"
                          : "Rejected"}
                    </span>
                  </td>
                  <td>
                    {new Date(request.createdOn)
                      .toLocaleString("en-GB")
                      .split(",")[0]}
                  </td>
                  <td>
                    {request.updatedOn
                      ? new Date(request.updatedOn)
                        .toLocaleString("en-GB")
                        .split(",")[0]
                      : "-"}
                  </td>
                  <td>
                    {request.approvalStatus === 1 && (
                      <>
                        <Button
                          className="text-white"
                          type="button"
                          onClick={() => handleRequestAction(request, 2)}
                        >
                          Approve
                        </Button>
                        <Button
                          className="text-white"
                          variant="danger"
                          type="button"
                          onClick={() => handleRequestAction(request, 3)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {request.approvalStatus === 2 && (
                      <Button
                        className="text-white"
                        variant="danger"
                        type="button"
                        onClick={() => handleRequestAction(request, 3)}
                      >
                        Dis-Approve
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationContainer
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            currentePage={currentPage} />
        </>
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
}
