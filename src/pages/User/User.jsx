import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { getUserPropertiesById } from "../../redux/slices/userSlice";

function User() {
  const dispatch = useDispatch();

  const { userId } = useParams();
  const { userProperties, loading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUserPropertiesById(userId));
  }, [dispatch, userId]);
  return (
    <main>
      <h1 className="text-center p-5">User Properties</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="d-flex flex-wrap gap-5 container">
          {userProperties.map((property, index) => (
            <PropertyCard property={property} index={index} />
          ))}
        </section>
      )}
    </main>
  );
}

export default User;
