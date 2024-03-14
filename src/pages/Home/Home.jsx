import classNames from "classnames";
import React, { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { v4 as uuid } from "uuid";
import { AgentsCarousel } from "../../components/AgentsGridCarousel/AgentsCarousel";
import { Newsletter } from "../../components/Newsletter/Newsletter";
import { Properties } from "../../components/Properties/Properties";
import { propertyStatus, propertyTypes } from "../../utils/constants";
import styles from "./Home.module.css";
function Home() {
  const navigate = useNavigate();

  const [radioValue, setRadioValue] = useState("Buy");
  const [searchData, setSearchData] = useState({});
  const handlePropertyStatusChange = (e) => {
    setRadioValue(e.target.value);
    setSearchData((prevData) => ({
      ...prevData,
      propertyStatus: e.target.value,
    }));
  };
  const handlePropertyTypeChange = (selectedOptions) => {
    setSearchData((prevData) => ({
      ...prevData,
      propertyType: selectedOptions.value,
    }));
  };

  const handlePropertyLocationChange = (newValue) => {
    setSearchData((prevData) => ({
      ...prevData,
      propertyLocation: newValue ? newValue.value : "",
    }));
  };

  const handleSearchButtonClick = () => {
    console.log(searchData);
    navigate("/property", { state: searchData });
  };
  return (
    <main className="">
      <section
        className={classNames(
          "d-flex gap-4 align-items-center flex-column justify-content-center",
          styles.imageSection
        )}
      >
        <div className={classNames(styles.searchProperty)}>
          <span className="text-white">
            Discover a place
            <br /> you'll love to Live.
          </span>
          <ButtonGroup>
            {propertyStatus.map((radio, idx) => (
              <ToggleButton
                key={uuid()}
                className={styles.toggleBtn}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "info" : "success"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={handlePropertyStatusChange}
              >
                {radio.label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        <div className={styles.searchContainer}>
          <Select
            className={classNames(styles.searchInput, styles.propertyType)}
            placeholder="Property Type.."
            options={propertyTypes}
            onChange={handlePropertyTypeChange}
          />
          <Creatable
            isClearable
            className={classNames(styles.searchInput, styles.propertyLocation)}
            placeholder="Property Location"
            onChange={handlePropertyLocationChange}
          />
          <Button onClick={handleSearchButtonClick}>Search</Button>
        </div>
      </section>

      <Properties title={"Display Latest & Featured Properties"} />

      <section
        className={classNames(
          "d-flex align-items-center justify-content-center flex-column gap-5",
          styles.helpPeopleSection
        )}
      >
        <h1>How Do we help People?</h1>
        <div className={styles.gridContainer}>
          <div className="text-center d-flex justify-content-center align-items-center flex-column gap-3">
            <img
              alt="log"
              src="	https://preview.colorlib.com/theme/konato/assets/img/icon/services1.svg
              
"
            />
            <h3>Sell home or office</h3>
            <p>
              Get Started by choosing from one of our pre-built templates to
              showcase your properties.
            </p>
          </div>

          <div className="text-center d-flex justify-content-center align-items-center flex-column gap-3">
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/services2.svg"
              alt="log"
            />
            <h3>Sell home or office</h3>
            <p>
              Get Started by choosing from one of our pre-built templates to
              showcase your properties.
            </p>
          </div>
          <div className="text-center d-flex justify-content-center align-items-center flex-column gap-3">
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/services3.svg"
              alt=""
            />
            <h3>Sell home or office</h3>
            <p>
              Get Started by choosing from one of our pre-built templates to
              showcase your properties.
            </p>
          </div>
        </div>
      </section>

      <section
        className={classNames(
          "d-flex align-items-center justify-content-center",
          styles.exploreSection
        )}
      >
        <div
          className={classNames(
            "d-flex align-items-start gap-3 flex-column",
            styles.propertySide
          )}
        >
          <h2>
            Explore <br /> by Property Type
          </h2>
          <span>
            Get Started by choosing from one of our pre-built page templates to
            showcase your properties.
          </span>
          <Button className={styles.viewAllPropertyButton}>
            View All Property
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property1.svg"
              alt=""
            />
            <Link to={"/"}>Home & Apartment</Link>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property2.svg"
              alt=""
            />
            <Link to={"/"}>Vila</Link>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="	https://preview.colorlib.com/theme/konato/assets/img/icon/property3.svg
"
              alt=""
            />
            <Link to={"/"}>Studio</Link>
          </div>
          <div className={styles.propertyTypeContainer}>
            <img
              src="https://preview.colorlib.com/theme/konato/assets/img/icon/property4.svg"
              alt=""
            />
            <Link to={"/"}>Office</Link>
          </div>
        </div>
      </section>

      <AgentsCarousel />

      <Newsletter />
    </main>
  );
}

export default Home;
