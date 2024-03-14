import classNames from "classnames";
import React, { useCallback, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { getOfferByUserId } from "../../redux/slices/offerSlice";
import { offerAction } from "../../redux/slices/propertySlice";
import { getUserData } from "../../utils/auth";
import styles from "./Offers.module.css";

function Offers() {
  const dispatch = useDispatch();
  const { userId, userRole: userType } = getUserData();

  const { offers, loading } = useSelector((store) => store.offer);

  const getOffer = useCallback(() => {
    if (userId && userType) dispatch(getOfferByUserId({ userType, userId }));
  }, [dispatch, userId, userType]);

  const handleOfferAction = useCallback(
    (offer, status) => {
      let payload = {
        ...offer,
      };

      // Check user type and update the payload accordingly
      if (userType === "Seller") {
        payload = {
          ...payload,
          sellerStatus: status,
        };
      } else if (userType === "Admin") {
        payload = {
          ...payload,
          adminStatus: status,
        };
      }
      dispatch(offerAction({ offer: payload, userType: userType }))
        .then(() => {
          toast.success("Action Completed Successfully");
        })
        .then(getOffer)
        .catch((err) => toast.error(err.message));
    },
    [dispatch, getOffer, userType]
  );

  useEffect(() => {
    getOffer();
  }, []);

  if (loading)
    return (
      <main className="mt-4 text-center">
        <LoadingSpinner />
      </main>
    );
  return (
    <main className={classNames("mt-4", styles.parent)}>
      <h1 className="w-100 text-center">Offers Received</h1>

      <div className={classNames(styles.tableContainer, "container")}>
        <Table>
          <thead>
            <tr>
              <th>Offer ID</th>
              <th>Offer Price</th>
              <th>Offer Text</th>
              <th>Last Date</th>
              <th>Seller Status</th>
              <th>Admin Status</th>
              <th>Payment Status</th>
              <th>Offer Action</th>
            </tr>
          </thead>
          <tbody>
            {offers?.map((offer) => (
              <tr key={uuid()}>
                <td>{offer.offerId}</td>
                <td>{offer.offerPrice}</td>
                <td>{offer.offerText}</td>
                <td>
                  {
                    new Date(offer.offerLastDate)
                      .toLocaleString("en-GB")
                      .split(",")[0]
                  }
                </td>
                <td>
                  <span
                    className={classNames("badge rounded-pill", {
                      "bg-warning text-white": offer.sellerStatus === 1,
                      "bg-success text-white": offer.sellerStatus === 2,
                      "bg-danger text-white":
                        offer.sellerStatus !== 1 && offer.sellerStatus !== 2,
                    })}
                  >
                    {offer.sellerStatus === 1
                      ? "Pending"
                      : offer.sellerStatus === 2
                      ? "Approved"
                      : "Rejected"}
                  </span>
                </td>
                <td>
                  <span
                    className={classNames("badge rounded-pill", {
                      "bg-warning text-white": offer.adminStatus === 1,
                      "bg-success text-white": offer.adminStatus === 2,
                      "bg-danger text-white":
                        offer.adminStatus !== 1 && offer.adminStatus !== 2,
                    })}
                  >
                    {offer.adminStatus === 1
                      ? "Pending"
                      : offer.adminStatus === 2
                      ? "Approved"
                      : "Rejected"}
                  </span>
                </td>
                <td>
                  <span
                    className={classNames("badge rounded-pill", {
                      "bg-warning text-white": offer.offerStatus === 0,
                      "bg-success text-white": offer.offerStatus === 1,
                      "bg-danger text-white":
                        offer.offerStatus !== 0 && offer.offerStatus !== 1,
                    })}
                  >
                    {offer.offerStatus === 1
                      ? "Completed"
                      : offer.offerStatus === 2
                      ? "Rejected"
                      : "Pending"}
                  </span>
                </td>
                <td>
                  {userType === "Seller" && offer.sellerStatus === 1 && (
                    <>
                      <Button
                        className="text-white"
                        type="button"
                        onClick={() => handleOfferAction(offer, 2)}
                      >
                        Approve
                      </Button>
                      <Button
                        className="text-white"
                        variant="danger"
                        type="button"
                        onClick={() => handleOfferAction(offer, 3)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {userType === "Admin" && offer.adminStatus === 1 && (
                    <>
                      <Button
                        className="text-white"
                        type="button"
                        onClick={() => handleOfferAction(offer, 2)}
                      >
                        Approve
                      </Button>
                      <Button
                        className="text-white"
                        variant="danger"
                        type="button"
                        onClick={() => handleOfferAction(offer, 3)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {offer.offerStatus === 1 ? null : (
                    <>
                      {userType === "Seller" && offer.sellerStatus === 2 && (
                        <Button
                          className="text-white"
                          variant="danger"
                          type="button"
                          onClick={() => handleOfferAction(offer, 3)}
                        >
                          Dis-Approve
                        </Button>
                      )}
                      {userType === "Admin" && offer.adminStatus === 2 && (
                        <Button
                          className="text-white"
                          variant="danger"
                          type="button"
                          onClick={() => handleOfferAction(offer, 3)}
                        >
                          Dis-Approve
                        </Button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}

export default Offers;
