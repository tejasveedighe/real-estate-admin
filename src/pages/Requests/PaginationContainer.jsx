import classNames from "classnames";
import React from "react";
import { v4 as uuid } from "uuid";
import styles from "./Requests.module.css";


export function PaginationContainer({ setCurrentPage, pageCount, currentPage }) {
  return (
    <div className={styles.paginationContainer}>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li
            class="page-item"
            onClick={() => setCurrentPage((prev) => {
              if (prev > 0) {
                return prev - 1;
              }
              return prev;
            })}
          >
            <a class="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {[...Array(pageCount)].map((_, index) => (
            <li
              key={uuid()}
              className={classNames(
                "page-link",
                currentPage === index ? "active" : ""
              )}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </li>
          ))}
          <li
            class="page-item"
            onClick={() => setCurrentPage((prev) => {
              if (prev === pageCount - 1) {
                return 0;
              }
              return prev + 1;
            })}
          >
            <a class="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
