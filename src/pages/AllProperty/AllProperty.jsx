import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { getAllProperty } from "../../redux/slices/propertySlice";
import { propertyStatus, propertyTypes } from "../../utils/constants";
import styles from "./AllProperty.module.css";

function AllProperty() {
  const dispatch = useDispatch();
  const location = useLocation();

  const propertiesStore = useSelector((store) => store.properties);

  const [propertyData, setPropertyData] = useState({
    locations: [],
    maxPrice: 0,
  });

  const [filters, setFilters] = useState({
    priceFilter: 0,
    locationFilter: null,
    statusFilter: null,
    typeFilter: null,
  });

  const setData = useCallback(() => {
    if (propertiesStore.status === "fulfilled") {
      setPropertyData((prev) => ({
        ...prev,
        locations: propertiesStore.properties.map((property) => ({
          label: property.location,
          value: property.location,
        })),
        maxPrice: propertiesStore.properties.reduce(
          (max, property) => (property.price > max ? property.price : max),
          0
        ),
      }));
    }
  }, [propertiesStore.properties, propertiesStore.status]);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  useEffect(() => {
    if (
      propertiesStore.lastAction === "getAllProperty" &&
      propertiesStore.status === "fulfilled"
    ) {
      setData();
    }
  }, [propertiesStore.lastAction, propertiesStore.status, setData]);

  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    !propertiesStore.loading &&
      setFilteredProperties(
        propertiesStore.properties.filter((property) => {
          const matchesPrice =
            !filters.priceFilter || property.price <= filters.priceFilter;
          const matchesLocation =
            !filters.locationFilter ||
            property.location === filters.locationFilter;
          const matchesStatus =
            !filters.statusFilter || property.status === filters.statusFilter;
          const matchesType =
            !filters.typeFilter || property.propertyType === filters.typeFilter;

          return (
            matchesPrice && matchesLocation && matchesStatus && matchesType
          );
        })
      );
  }, [filters, propertiesStore]);

  // Check if the location object is not null and update filteredProperties accordingly
  useEffect(() => {
    if (location.state) {
      setFilters((prev) => ({
        ...prev,
        locationFilter: location.state?.propertyLocation,
        statusFilter: location.state?.propertyStatus,
        typeFilter: location.state?.propertyType,
      }));
    }
  }, [location.state]);

  if (propertiesStore.status === "rejected") {
    return (
      <main className="d-flex align-items-center justify-content-center text-center">
        <h4> Some Error Occurred please try later</h4>
      </main>
    );
  }

  return (
    <main className="">
      <div
        className={classNames(
          "d-flex align-items-center",
          styles.availablePropertyBanner
        )}
      >
        <div className={classNames("container ", styles.bannerTextContainer)}>
          <h1>Available Property</h1>
          <div className={classNames("text-wrap", styles.bannerText)}>
            Get Started by choosing from one of our pre-built page templates to
            showcase your properties.
          </div>
        </div>
      </div>
      {propertiesStore.loading ? (
        <section className="container text-center my-5">
          <LoadingSpinner />
        </section>
      ) : (
        <section className="container text-center my-5">
          <h1>Properties for Sale</h1>
          <div className="d-flex align-items-center justify-content-between mt-5">
            <div className="d-flex align-items-center justify-content-end gap-3 w-100">
              <span>Filters :</span>
              <Select
                isClearable
                onChange={(selectedOption) =>
                  setFilters((prev) => ({
                    ...prev,
                    typeFilter: selectedOption ? selectedOption.value : null,
                  }))
                }
                value={
                  filters.typeFilter
                    ? { label: filters.typeFilter, value: filters.typeFilter }
                    : null
                }
                name="typeFilter"
                options={propertyTypes}
              />

              <Select
                isClearable
                onChange={(selectedOption) =>
                  setFilters((prev) => ({
                    ...prev,
                    statusFilter: selectedOption ? selectedOption.value : null,
                  }))
                }
                value={
                  filters.statusFilter
                    ? {
                        label: filters.statusFilter,
                        value: filters.statusFilter,
                      }
                    : null
                }
                name="statusFilter"
                options={propertyStatus}
              />

              <Select
                isClearable
                onChange={(selectedOption) =>
                  setFilters((prev) => ({
                    ...prev,
                    locationFilter: selectedOption
                      ? selectedOption.value
                      : null,
                  }))
                }
                value={
                  filters.locationFilter
                    ? {
                        label: filters.locationFilter,
                        value: filters.locationFilter,
                      }
                    : null
                }
                name="locationFilter"
                options={propertyData.locations}
              />

              <div className="d-flex flex-column">
                <label>Price : {filters.priceFilter}</label>
                <input
                  type="range"
                  name="priceFilter"
                  step={50000}
                  min={0}
                  max={propertyData.maxPrice}
                  value={filters.priceFilter}
                  list="markers"
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceFilter: Number.parseInt(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className={classNames("mt-5", styles.propertyGrid)}>
            {!propertiesStore?.loading &&
            propertiesStore?.status === "fulfilled" &&
            filteredProperties?.length ? (
              filteredProperties?.map((property, index) => (
                <PropertyCard
                  key={property?.propertyId}
                  property={property}
                  index={index > 8 ? index - 8 : index}
                />
              ))
            ) : (
              <h5>No Data found</h5>
            )}
          </div>
        </section>
      )}
      <Newsletter />
    </main>
  );
}

export default AllProperty;
