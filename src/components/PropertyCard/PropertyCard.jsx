import classNames from "classnames";
import React, { useCallback } from "react";
import { Badge, Card } from "react-bootstrap";
import { BsBuildingsFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProperty } from "../../redux/slices/propertySlice";
import { getUserData } from "../../utils/auth";
import styles from "./PropertyCard.module.css";

function PropertyCard({ property, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProperty = useCallback(() => {
    dispatch(deleteProperty(property.propertyId))
      .then((res) => {
        alert("Property has been deleted");
      })
      .catch(() => alert("Failed to delete Property please try later"));
  }, [dispatch, property]);

  const handleCardClick = useCallback(() => {
    navigate(`/property/${property.propertyId}`);
  }, [navigate, property]);

  return (
    <Card className={styles.card} onClick={handleCardClick}>
      <Card.Img
        variant="top"
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/house${index}.jpg`}
      />
      <Card.Body>
        <div className={styles.propertyInfo}>
          <div>
            <span className={styles.propertyBHK}>
              {property.noBedroom + property.noBathroom}&nbsp;BHK
            </span>
            &nbsp;
            <span className={styles.propertyTitle}>
              {property.propertyTitle}
            </span>
            &nbsp;
            <span>
              {property.status === "Sold" ? (
                <Badge bg="danger">Sold</Badge>
              ) : property.status === "Rented" ? (
                <Badge bg="danger">Rented</Badge>
              ) : null}
            </span>
          </div>
          <div className="fs-5">
            <span className={styles.price}>&#x20B9;&nbsp;{property.price}</span>{" "}
            &nbsp;| &nbsp;
            <span className={styles.propertyArea}>
              <BsBuildingsFill />
              {property.squareFeet} sqft
            </span>
          </div>
          <div>
            <span className={styles.propertyLocation}>
              <FaLocationDot />
              {property.location}
            </span>
          </div>
          <div className={classNames(styles.buttonContainer, styles.hidden)}>
            {getUserData().userRole === "Admin" ? (
              <button
                type="button"
                onClick={handleDeleteProperty}
                className={classNames("float-start", styles.deleteBtn)}
              >
                Delete
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleCardClick}
              className="float-end"
            >
              View Details
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PropertyCard;
