import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty } from "../../redux/slices/propertySlice";
import { responsiveProperties } from "../../utils/constants";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PropertyCard from "../PropertyCard/PropertyCard";

export function Properties({ title }) {
  const dispatch = useDispatch();
  const propertiesStore = useSelector((store) => store.properties);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  return (
    <section className=" d-flex align-items-center justify-content-center flex-column mt-5">
      <h1>{title}</h1>
      {propertiesStore.loading ? (
        <LoadingSpinner />
      ) : (
        <Carousel
          containerClass={"container my-5 p-5"}
          itemClass="d-flex align-items-center justify-content-center"
          infinite
          rewind
          rewindWithAnimation
          partialVisbile="false"
          responsive={responsiveProperties}
        >
          {!propertiesStore.loading &&
          propertiesStore.status === "fulfilled" ? (
            propertiesStore.properties.map((property, index) => (
              <PropertyCard
                key={property?.propertyId}
                property={property}
                index={index}
              />
            ))
          ) : (
            <>No Data to show</>
          )}
        </Carousel>
      )}
    </section>
  );
}
