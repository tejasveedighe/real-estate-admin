import React from "react";
import styles from "./ManageUser.module.css";
import classNames from "classnames";
import { Button } from "react-bootstrap";

export function UserTable({ filteredUser, handleDeleteUser }) {
  return (
    <div className={classNames(styles.tableContainer)}>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUser.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.userType === "Seller" ? (
                  <span class="badge text-bg-primary">Seller</span>
                ) : (
                  <span class="badge text-bg-warning">Buyer</span>
                )}
              </td>
              <td>{user.phone}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.userId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
