import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Badge, Button, Figure, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  buyProperty,
  getOfferById,
  rentProperty,
  retryOffer,
  sendOffer,
} from "../../redux/slices/offerSlice";
import { getUserData } from "../../utils/auth";
import { isObjectNotEmpty } from "../../utils/helpers";
import { OfferModal } from "./OfferModal";
import styles from "./Property.module.css";

export const Offer = ({ property }) => {
  const dispatch = useDispatch();

  const { offer, loading } = useSelector((store) => store.offer);

  const { userId } = getUserData();

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [value, onChange] = useState(new Date());
  const [retry, setRetry] = useState(false);

  const handleTogglePaymentModal = useCallback(
    () => setShowPaymentModal((prev) => !prev),
    []
  );

  const handleCloseOfferModal = useCallback(() => setShowOfferModal(false), []);
  const handleShowOfferModal = useCallback(() => {
    setShowOfferModal(true);
  }, []);

  const getOffer = useCallback(() => {
    dispatch(getOfferById({ propertyId: property.propertyId, userId }));
  }, [dispatch, property.propertyId, userId]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const offerPrice = formData.get("offerPrice");
      const offerText = formData.get("text");

      if (retry) {
        dispatch(
          retryOffer({
            ...offer,
            offerPrice,
            offerText,
            offerLastDate: value,
          })
        )
          .then((res) => toast.success(res.payload))
          .then(getOffer)
          .then(handleCloseOfferModal)
          .catch((err) => toast.error(err.message));
      } else {
        dispatch(
          sendOffer({
            offerPrice,
            offerText,
            offerLastDate: value,
            propertyId: property.propertyId,
            sellerId: property.userId,
            buyerId: userId,
          })
        )
          .then((res) => {
            toast.success(res.payload);
          })
          .then(getOffer)
          .then(handleCloseOfferModal)
          .catch((err) => toast.error(err.message));
      }
    },
    [
      retry,
      dispatch,
      value,
      offer,
      getOffer,
      handleCloseOfferModal,
      property,
      userId,
    ]
  );

  const handleRetryOffer = useCallback(() => {
    setRetry((prev) => !prev);
    handleShowOfferModal();
  }, [handleShowOfferModal]);

  const handlePayment = useCallback(() => {
    try {
      dispatch(
        property.status === "Sale"
          ? buyProperty(offer)
          : property.status === "Rent"
          ? rentProperty(offer)
          : null
      )
        .then((res) => {
          toast.success(res.payload);
        })
        .catch((err) => toast.error(err.message));
    } catch (error) {
      toast.error(error.message);
    } finally {
      handleTogglePaymentModal();
      getOffer();
    }
  }, [dispatch, handleTogglePaymentModal, offer, property, getOffer]);

  useEffect(() => {
    getOffer();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {property.approvalStatus === 2 ? (
        isObjectNotEmpty(offer) ? (
          <div className={styles.offerStatusContainer}>
            <h5>
              Offer Status:&nbsp;
              {offer.offerStatus === 3 ? (
                <Badge bg="danger">Rejected</Badge>
              ) : offer.offerStatus === 1 ? (
                <Badge bg="success">Completed</Badge>
              ) : (
                <Badge bg="warning">Pending</Badge>
              )}
            </h5>
            <span className="d-flex align-items-center gap-2">
              <Form.Check
                checked={offer.adminStatus === 2}
                type="checkbox"
                label="Admin"
                readOnly
              />
              {offer.adminStatus === 3 ? (
                <Badge bg="danger">Rejected</Badge>
              ) : offer.adminStatus === 2 ? (
                <Badge bg="success">Approved</Badge>
              ) : (
                <Badge bg="warning">Pending</Badge>
              )}
            </span>
            <span className="d-flex align-items-center gap-2">
              <Form.Check
                checked={offer.sellerStatus === 2}
                type="checkbox"
                label="Seller"
                readOnly
              />
              {offer.sellerStatus === 3 ? (
                <Badge bg="danger">Rejected</Badge>
              ) : offer.sellerStatus === 2 ? (
                <Badge bg="success">Approved</Badge>
              ) : (
                <Badge bg="warning">Pending</Badge>
              )}
            </span>

            {offer.sellerStatus === 3 || offer.adminStatus === 3 ? (
              <Button
                className={classNames("mt-4 text-white", styles.retryBtn)}
                onClick={handleRetryOffer}
              >
                Retry Offer
              </Button>
            ) : offer.sellerStatus === 2 &&
              offer.adminStatus === 2 &&
              offer.offerStatus !== 1 ? (
              <Button
                className="mt-4 text-white"
                variant="success"
                onClick={handleTogglePaymentModal}
              >
                Make Payment
              </Button>
            ) : offer.offerStatus === 1 ? (
              <Button className="mt-4" variant="success">
                Payment Complete
              </Button>
            ) : (
              <Button className="mt-4 text-white" variant="info">
                Offer Sent
              </Button>
            )}
          </div>
        ) : (
          <Button onClick={handleShowOfferModal}>Make Offer</Button>
        )
      ) : null}
      <OfferModal
        show={showOfferModal}
        handleClose={handleCloseOfferModal}
        onSubmit={onSubmit}
        property={property}
        onChange={onChange}
        value={value}
        retry={retry}
      />
      <Modal show={showPaymentModal} onHide={handleTogglePaymentModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Payment for {property.propertyTitle} {property.propertyType}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around">
            <table>
              <thead>
                <tr>
                  <th>Payment Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Property ID</td>
                  <td>{property.propertyId}</td>
                </tr>
                <tr>
                  <td>Seller ID</td>
                  <td>{property.userId}</td>
                </tr>
                <tr>
                  <td>Buyer ID</td>
                  <td>{offer.buyerId}</td>
                </tr>
                <tr>
                  <td>Offer ID</td>
                  <td>{offer.offerId}</td>
                </tr>
                <tr>
                  <td>Offer Price</td>
                  <td>&#x20B9;{offer.offerPrice}</td>
                </tr>
                <tr>
                  <td>Property Type</td>
                  <td>{property.status}</td>
                </tr>
              </tbody>
            </table>

            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={`${process.env.PUBLIC_URL}/house0.jpg`}
              />
              <Figure.Caption>{property.description}</Figure.Caption>
            </Figure>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePayment}>
            Pay
          </Button>
          <Button variant="danger" onClick={handleTogglePaymentModal}>
            Cancel Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
