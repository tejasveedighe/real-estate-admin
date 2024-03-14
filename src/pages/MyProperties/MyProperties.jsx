import React, { useEffect } from "react";
import styles from "./MyProperties.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../utils/auth";
import { getUserPropertiesById } from "../../redux/slices/userSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

function MyListedProperties() {
  const dispatch = useDispatch();

  const { userProperties, loading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getUserPropertiesById(getUserData().userId));
  }, [dispatch]);

  return (
    <main className="mt-5">
      <h1 className="text-center w-100">My Listed Properties</h1>
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

export default MyListedProperties;
