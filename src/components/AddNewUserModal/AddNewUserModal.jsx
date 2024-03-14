import { useCallback } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllUsers, signupUser } from "../../redux/slices/userSlice";

export default function AddNewUserModal(props) {
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      dispatch(
        signupUser({
          name,
          email,
          password,
        })
      ).then((res) => {
        if (res.type === "user/signup/fulfilled") {
          alert("User Added Successfully");
          dispatch(getAllUsers()).then(() => {
            props.onHide();
          });
        }
      });
    },
    [dispatch, props]
  );
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mt-2">
            <Form.Label>Full Name</Form.Label>
            <Form.Control required type="text" name="name" />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control required type="email" name="email" />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" name="password" />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Add
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
