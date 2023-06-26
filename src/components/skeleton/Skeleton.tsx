import React from "react";
import styles from "../skeleton/Skeleton.module.scss";

const SkeletonProduct = () => {
  return (
    <div className={styles.skeletonItem}>
      <div className={styles.itemName}></div>
      <div className={styles.buttons}>
        <div className={styles.btnSkeleton}></div>
        <div className={styles.btnSkeleton}></div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
