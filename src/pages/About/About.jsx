import React from "react";
import styles from "./About.module.css";
import classNames from "classnames";
import { AgentsCarousel } from "../../components/AgentsGridCarousel/AgentsCarousel";
import { Newsletter } from "../../components/Newsletter/Newsletter";

function About() {
  return (
    <main>
      <div
        className={classNames(
          "d-flex align-items-center",
          styles.aboutUsBanner
        )}
      >
        <div className={classNames("container ", styles.bannerTextContainer)}>
          <h1>About Us</h1>
          <div className={classNames("text-wrap", styles.bannerText)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, cum
            omnis! Asperiores error tenetur mollitia quia suscipit sint
            cupiditate placeat nam, sed eum culpa, consequatur dicta aliquid vel
            dolorem ducimus!
          </div>
        </div>
      </div>

      <section className="d-flex align-items-center justify-content-center flex-md-row flex-column p-5">
        <div className="text-start">
          <span className="fs-1">
            Just Browse away.
            <br />
            It's All Here.
          </span>
          <p className="text-wrap w-50 fs-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde
            officia veniam suscipit corrupti, et porro.
            <br />
            <br />
            Voluptatibus, delectus ut. Porro voluptatem dolorem maxime nisi est
            quis magnam provident dolorum tempora.
          </p>
        </div>
        <div className={styles.rightImg} />
      </section>

      <Newsletter />

      <AgentsCarousel />
    </main>
  );
}

export default About;
