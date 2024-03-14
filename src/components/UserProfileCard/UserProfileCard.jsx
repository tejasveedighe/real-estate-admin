import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function UserProfileCard({ user, deleteUser }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <div className="d-flex align-items-center justify-content-end">
          {/* <Link to={`/user/${user.userId}`}>View Profile</Link> */}
          <Button onClick={deleteUser.bind(this, user.userId)} variant="danger">
            Delete User
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UserProfileCard;
