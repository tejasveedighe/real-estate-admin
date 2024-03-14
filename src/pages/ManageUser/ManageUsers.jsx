import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddNewUserModal from "../../components/AddNewUserModal/AddNewUserModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  deleteUserById,
  getAllUsers,
  setUser,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { UserTable } from "./UserTable";
import classNames from "classnames";
import styles from "./ManageUser.module.css";
import { UserDataFeatures } from "./UserDataFeatures";

function ManageUser() {
  const dispatch = useDispatch();

  const { users, loading, status } = useSelector((store) => store.user);
  const currentUserId = parseInt(Cookies.get("userId"));

  const [userType, setUserType] = useState("");

  const [filteredUser, setFilteredUsers] = useState([]);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setFilteredUsers(() => {
        return users?.filter((user) => user.userId !== currentUserId);
      });
    }
  }, [users, currentUserId, loading]);

  const [count, setCount] = useState({
    buyers: 0,
    sellers: 0,
  });
  useEffect(() => {
    setCount(() => {
      let buyers = 0;
      let sellers = 0;
      for (const user of users) {
        if (user.userType === "Seller") sellers++;
        else if (user.userType === "Buyer") buyers++;
      }
      return {
        buyers,
        sellers,
      };
    });
  }, [users]);

  const [openAddNewUserModal, setOpenAddNewUserModal] = useState(false);
  const handleAddNewUser = useCallback(() => {
    setOpenAddNewUserModal((prev) => !prev);
  }, []);

  const handleDeleteUser = useCallback(
    (userId) => {
      dispatch(deleteUserById(userId))
        .then((res) => {
          toast.success("User was deleted");
          dispatch(getAllUsers());
        })
        .catch((err) => toast.error(err.message));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const searchValue = e.target.value.toLowerCase(); // Convert search value to lowercase for case-insensitive comparison
      const filteredItems = users.filter((user) => {
        // Check if username includes the search value
        return (
          user.name.toLowerCase().includes(searchValue) ||
          user.email.toLowerCase().includes(searchValue) ||
          user.phone.includes(searchValue)
        );
      });
      setFilteredUsers(filteredItems);
    },
    [users]
  );

  useEffect(() => {
    let filtered;
    if (userType === "") {
      filtered = users;
    } else {
      filtered = users.filter((user) => user.userType === userType);
    }
    setFilteredUsers(filtered);
  }, [userType, users]);

  if (loading) {
    return (
      <main className="text-center">
        <h1 className="text-center">Manage User</h1>
        <LoadingSpinner />
      </main>
    );
  }

  if (status === "rejected") {
    return (
      <main className="text-center">
        <h1 className="text-center">Failed To fetch users, try again later</h1>
      </main>
    );
  }

  return (
    <main className={classNames(styles.parent, "container")}>
      <div className="d-flex align-items-center justify-content-center">
        <h1 className="text-center p-5 d-inline-block">Manage Users</h1>
        <Button onClick={handleAddNewUser}>Add New User</Button>
      </div>
      <UserDataFeatures users={users} count={count} />
      <div className={classNames(styles.filterContainer, "rounded")}>
        {/* Search Input Continaer */}
        <div>
          <p>User Type</p>
          <Form.Select onChange={(e) => setUserType(e.target.value)}>
            <option value="" defaultChecked>
              All Types
            </option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </Form.Select>
        </div>

        {/* Search Input Continaer */}
        <div>
          <p>Search</p>
          <Form.Control
            placeholder="Enter query"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <UserTable
        filteredUser={filteredUser}
        handleDeleteUser={handleDeleteUser}
      />
      <AddNewUserModal onHide={handleAddNewUser} show={openAddNewUserModal} />
    </main>
  );
}

export default ManageUser;
