import classNames from "classnames";
import React from "react";
import { AgentProfileCard } from "../AgentProfileCard/AgentProfileCard";
import styles from "./AgentsCarousel.module.css";

const agents = [
  {
    name: "Jimmy Changa",
    id: 1,
  },
  {
    name: "Nick R. Bocker",
    id: 2,
  },
  {
    name: "Buster Hyaman",
    id: 3,
  },
  {
    name: "Buster ock",
    id: 4,
  },
];

export function AgentsCarousel() {
  return (
    <section className={classNames("text-center mt-5", styles.agentSection)}>
      <h1>Our Agents</h1>
      <span>
        Get started by choosing from one of our pre-built page tempates to
        showcase your properties.
      </span>

      <div
        className={classNames(
          styles.agentCarousel,
          "container-fluid d-flex align-items-center gap-5 justify-content-center"
        )}
      >
        {agents.map((agent) => (
          <AgentProfileCard agent={agent} />
        ))}
      </div>
    </section>
  );
}
