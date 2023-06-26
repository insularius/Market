import React from "react";
import styles from "../footer/Footer.module.scss";
import MasterCardLogo from "../mclogo/MasterCard";
const Footer = () => {
  //Footer example without map
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer_columns}>
          <div className={styles.footer_column}>
            <div className={styles.footer_column_inner}>
              <div className={styles.footer_column_inner_title}>Company</div>
              <div className={styles.footer_column_inner_item}>
                Our products
              </div>
              <div className={styles.footer_column_inner_item}>Example</div>
              <div className={styles.footer_column_inner_item}>Example</div>
            </div>
          </div>
          <div className={styles.footer_column}>
            <div className={styles.footer_column_inner}>
              <div className={styles.footer_column_inner_title}>About</div>
              <div className={styles.footer_column_inner_item}>Info</div>
              <div className={styles.footer_column_inner_item}>Example</div>
              <div className={styles.footer_column_inner_item}>Example</div>
            </div>
          </div>
          <div className={styles.footer_column}>
            <div className={styles.footer_column_inner}>
              <div className={styles.footer_column_inner_title}>Contacts</div>
              <div className={styles.footer_column_inner_item}>Adress</div>
              <div className={styles.footer_column_inner_item}>Example</div>
              <div className={styles.footer_column_inner_item}>Example</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <div className={styles.container}>
          <div className={styles.footer_bottom_columns}>
            <div className={styles.footer_bottom_column}>
              <div className={styles.footer_bottom_column_inner}>
                <div className={styles.footer_bottom_info}>
                  <MasterCardLogo />
                </div>
                {/* <div className={styles.footer_bottom_info}>dsadas</div> */}
                {/* <div className={styles.footer_bottom_info}>dsadas</div> */}
              </div>
            </div>
            <div className={styles.footer_bottom_column}>
              <div className={styles.footer_bottom_column_inner}>
                <div className={styles.footer_bottom_info}>
                  <MasterCardLogo />
                </div>
                {/* <div className={styles.footer_bottom_info}>asdas</div> */}
              </div>
            </div>
            <div className={styles.footer_bottom_column}>
              <div className={styles.footer_bottom_column_inner}>
                <div className={styles.footer_bottom_info}>
                  <MasterCardLogo />
                </div>
                {/* <div className={styles.footer_bottom_info}>asdsadas</div> */}
              </div>
            </div>
            <div className={styles.footer_bottom_column}>
              <div className={styles.footer_bottom_column_inner}>
                <div className={styles.footer_bottom_info}>
                  <MasterCardLogo />
                </div>
                {/* <div className={styles.footer_bottom_info}>asdasd</div> */}
              </div>
            </div>
            <div className={styles.footer_bottom_column}>
              <div className={styles.footer_bottom_column_inner}>
                <div className={styles.footer_bottom_info}></div>
                <div className={styles.footer_bottom_info_items}>
                  Visa
                  <a href="#">
                    <MasterCardLogo />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
