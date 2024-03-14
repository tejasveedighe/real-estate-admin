import React from "react";
import styles from "./AgentProfileCard.module.css";
import classNames from "classnames";

export function AgentProfileCard({ agent }) {
  return (
    <div
      className={classNames(
        "d-flex align-items-center justify-content-center flex-column",
        styles.agentCard
      )}
    >
      <img
        className={styles.agentImg}
        src={`https://preview.colorlib.com/theme/konato/assets/img/gallery/team${agent.id}.jpg`}
        alt="agent"
      />
      <div>
        <h3 className={styles.agentName}>{agent.name}</h3>
        <span>Real Estate Agent</span>
      </div>
    </div>
  );
}
