import React from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import DatePicker from "react-date-picker";

export const OfferModal = ({
  show,
  handleClose,
  onSubmit,
  property,
  onChange,
  value,
  retry,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make an Offer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <FloatingLabel label="Your Price Offer">
            <Form.Control
              name="offerPrice"
              required
              type="number"
              pattern="{0-9}"
              defaultValue={property.price}
            />
          </FloatingLabel>
          <div className="mt-3 d-flex align-items-center gap-3">
            <div>Offer Last Date</div>
            <div>
              <DatePicker onChange={onChange} value={value} />
            </div>
          </div>
          <Form.Group className="mt-3">
            <label htmlFor="floatingInputCustom">
              Anything Regarding the offer
            </label>
            <Form.Control
              id="floatingInputCustom"
              name="text"
              as="textarea"
              rows={6}
              type="text"
            />
          </Form.Group>
          <Button className="mt-3 float-end" variant="primary" type="submit">
            {retry ? "Re-send Offer" : "Send Offer"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
