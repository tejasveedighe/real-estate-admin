import classNames from "classnames";
import React, { useCallback, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  getPropertyById,
  getPropertyDataByUser,
  requestForContact,
} from "../../redux/slices/propertySlice";
import { getUserData, isLoggedIn } from "../../utils/auth";
import { ContactContainer } from "./ContactContainer";
import styles from "./Property.module.css";

function Property() {
  const dispatch = useDispatch();
  const { propertyId } = useParams();

  const { loading, status, property } = useSelector(
    (store) => store.properties
  );

  const getPropertyData = useCallback(() => {
    if (isLoggedIn()) {
      dispatch(
        getPropertyDataByUser({ userId: getUserData().userId, propertyId })
      ).catch((err) => alert(err.message));
    } else
      dispatch(getPropertyById(propertyId)).catch((err) => alert(err.message));
  }, [dispatch, propertyId]);

  const handleRequestClick = useCallback(() => {
    dispatch(
      requestForContact({
        userId: getUserData().userId,
        propertyId,
      })
    )
      .then((res) => {
        if (res.type === "properties/requestForContact/fulfilled") {
          toast.info(
            "Your Request has been sent to the admin, you will see the contact when Admin Approves"
          );
        }
      })
      .catch((err) => {
        toast.error(`Unable to request: ${err.message}`);
      });
  }, [dispatch, propertyId]);

  useEffect(() => {
    getPropertyData();
  }, [getPropertyData]);

  if (loading) {
    return (
      <main className="d-flex align-items-center justify-content-center text-center mt-5">
        <LoadingSpinner />
      </main>
    );
  }

  if (status === "rejected") {
    <main className="d-flex align-items-center justify-content-center text-center mt-5">
      <h1>Some error occured please try later</h1>
    </main>;
  }

  return (
    <main className="mt-2">
      <div className="d-flex align-items-start justify-content-center mt-5 gap-4">
        <section
          className={classNames(
            styles.parent,
            "d-flex align-items-center justify-content-center flex-column p-4"
          )}
        >
          <img
            src={`${process.env.PUBLIC_URL}/house0.jpg`}
            className={styles.propertyImg}
            alt="Property"
          />
          <hr className={styles.solid} />
          <div className=" w-100 mt-4">
            <div className="d-flex align-items-center gap-3 justify-content-start">
              <h3>
                {property.propertyTitle} {property.propertyType}
              </h3>
              {property.status === "Sold" ? (
                <Badge variant="danger">Sold</Badge>
              ) : property.status === "Rented" ? (
                <Badge variant="danger">Rented</Badge>
              ) : (
                <Badge variant="info">Available</Badge>
              )}
            </div>
            <p className={styles.propertyDescription}>{property.description}</p>
          </div>
          <hr className={styles.solid} />
          <div className="w-100">
            <h5 className={styles.subHeading}>Condition:</h5>
            <div className={styles.propertyConditionGrid}>
              <div className="text-capitalize">
                <b>Area: </b>
                {property.squareFeet} m<sup>2</sup>
              </div>
              <div className="text-capitalize">
                <b>Bedroom: </b>
                {property.noBedroom}
              </div>
              <div className="text-capitalize">
                <b>Bathroom: </b>
                {property.noBathroom}
              </div>
              <div className="text-capitalize">
                <b>Location: </b>
                {property.location}
              </div>
              <div className="text-capitalize">
                <b>Price: </b>${property.price}
              </div>
            </div>
          </div>
          <hr className={styles.solid} />
          <div className="w-100">
            <h5 className={styles.subHeading}>Amenities:</h5>
            <div className={styles.propertyConditionGrid}>
              {property.amenities &&
                Object.entries(property.amenities).map(([key, value]) => {
                  if (key === "id") {
                    return null;
                  }
                  return (
                    <div className="text-capitalize" key={key}>
                      <b>{key}: </b>
                      <span>{value ? "Yes" : "No"}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
        <ContactContainer
          property={property}
          handleRequestClick={handleRequestClick}
        />
      </div>
    </main>
  );
}

export default Property;
