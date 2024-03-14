import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  getAllContactRequests,
  requestAction,
} from "../../redux/slices/propertySlice";
import styles from "./Requests.module.css";
import { RequestDataFeatures } from "./RequestDataFeatures";
import { PaginatedTable } from "./PaginatedTable";

function Requests() {
  const dispatch = useDispatch();

  const { requests, loading } = useSelector((store) => store.properties);

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");

  const [uniquePropertyTitles, setPropertyTitles] = useState([]);
  const [uniqueUsernames, setUsernames] = useState([]);

  const [count, setCount] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  // Function to extract unique property titles with property IDs
  const getUniquePropertyTitles = useCallback(() => {
    if (!requests) return;
    const uniquePropertyTitles = {};
    for (const request of requests) {
      uniquePropertyTitles[request.propertyTitle] = request.propertyId;
    }
    setPropertyTitles(uniquePropertyTitles);
  }, [requests]);

  // Function to extract unique usernames with user IDs
  const getUniqueUsernames = useCallback(() => {
    if (!requests) return;
    const uniqueUsernames = {};
    for (const request of requests) {
      uniqueUsernames[request.username] = request.userId;
    }
    setUsernames(uniqueUsernames);
  }, [requests]);

  const filterRequests = useCallback(() => {
    if (!requests) return;
    let filtered = [...requests];

    // Filter by user
    if (selectedUser) {
      filtered = filtered.filter(
        (request) => request.username === selectedUser
      );
    }

    // Filter by approval status
    if (selectedApprovalStatus) {
      const status = selectedApprovalStatus.toLowerCase();
      filtered = filtered.filter((request) => {
        if (status === "pending") return request.approvalStatus === 1;
        if (status === "approved") return request.approvalStatus === 2;
        if (status === "rejected")
          return request.approvalStatus !== 1 && request.approvalStatus !== 2;
        return true;
      });
    }

    // Filter by property
    if (selectedProperty) {
      filtered = filtered.filter(
        (request) => request.propertyTitle === selectedProperty
      );
    }

    setFilteredRequests(filtered);
  }, [requests, selectedUser, selectedApprovalStatus, selectedProperty]);

  const getContacts = useCallback(() => {
    dispatch(getAllContactRequests()).then((res) => {
      const newState = { approved: 0, rejected: 0, pending: 0 };
      for (const request of res.payload) {
        if (request.approvalStatus === 1) newState.pending++;
        else if (request.approvalStatus === 2) newState.approved++;
        else if (request.approvalStatus === 3) newState.rejected++;
      }
      setCount(newState);
    });
    filterRequests();
  }, [dispatch, filterRequests]);

  const handleRequestAction = useCallback(
    (request, status) => {
      const payload = {
        userId: request.userId,
        propertyId: request.propertyId,
        approvalStatus: status,
      };
      dispatch(requestAction(payload))
        .then(() => {
          toast.success("Action Completed Successfully");
        })
        .then(() => getContacts());
    },
    [dispatch, getContacts]
  );

  const handleUserChange = useCallback(
    (event) => {
      setSelectedUser(event.target.value);
      filterRequests();
    },
    [filterRequests]
  );

  const handleApprovalStatusChange = useCallback(
    (event) => {
      setSelectedApprovalStatus(event.target.value);
      filterRequests();
    },
    [filterRequests]
  );

  const handlePropertyChange = useCallback(
    (event) => {
      setSelectedProperty(event.target.value);
      filterRequests();
    },
    [filterRequests]
  );

  useEffect(() => {
    filterRequests();
  }, [
    filterRequests,
    requests,
    selectedApprovalStatus,
    selectedProperty,
    selectedUser,
  ]);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    getUniqueUsernames();
    getUniquePropertyTitles();
  }, [requests]);

  const handleSearchChange = useCallback(
    (e) => {
      const searchValue = e.target.value.toLowerCase(); // Convert search value to lowercase for case-insensitive comparison
      const filteredItems = requests.filter((item) => {
        // Check if username includes the search value
        return (
          item.username.toLowerCase().includes(searchValue) ||
          item.propertyTitle.toLowerCase().includes(searchValue)
        );
      });
      setFilteredRequests(filteredItems);
    },
    [requests]
  );

  return loading ? (
    <main className="text-center container mt-5 fs-1">
      <h1 className="my-5">Requests</h1>
      <LoadingSpinner />
    </main>
  ) : (
    <main className={classNames("text-center container", styles.parent)}>
      <h1 className="my-5">Requests</h1>
      <RequestDataFeatures requests={requests} count={count} />

      <div className={classNames(styles.filterContainer, "rounded")}>
        {/* User Select Dropdown */}
        <div>
          <p>User</p>
          <Form.Select value={selectedUser} onChange={handleUserChange}>
            <option value="">All Users</option>
            {Object.keys(uniqueUsernames).map((username, index) => (
              <option key={`${username}`} value={username}>
                {username}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Property Select Dropdown */}
        <div>
          <p>Property</p>
          <Form.Select value={selectedProperty} onChange={handlePropertyChange}>
            <option value="">All Properties</option>
            {Object.keys(uniquePropertyTitles).map((title, index) => (
              <option key={`${title}`} value={title}>
                {title}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Approval Status Select Dropdown */}
        <div>
          <p>Status</p>
          <Form.Select
            value={selectedApprovalStatus}
            onChange={handleApprovalStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
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

      <PaginatedTable
        filteredRequests={filteredRequests}
        handleRequestAction={handleRequestAction}
      />
    </main>
  );
}

export default Requests;
