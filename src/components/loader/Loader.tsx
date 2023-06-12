import React from "react";
import styles from "./Loader.module.scss";
export default () => (
  <div>
    <div className={styles.lds_dual_ring} />
  </div>
);
