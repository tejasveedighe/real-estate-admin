import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { getOwnedProperties } from "../../redux/slices/userSlice";
import { getUserData } from "../../utils/auth";

function Owned() {
  const dispatch = useDispatch();

  const { userProperties, loading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getOwnedProperties(getUserData().userId));
  }, [dispatch]);

  return (
    <main className="mt-5">
      <h1 className="text-center w-100">My Owned Properties</h1>
      <section className="container d-flex flex-wrap gap-5 mt-5">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {userProperties.map((property, index) => (
              <PropertyCard property={property} index={index} />
            ))}
          </>
        )}
      </section>
    </main>
  );
}

export default Owned;
