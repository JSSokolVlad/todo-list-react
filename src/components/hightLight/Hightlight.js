import React from "react";
import styles from "./Hightlight.module.css";

const Hightlight = (props) => {
  const { filter, str } = props;
  if (!filter) return str;
  const regexp = new RegExp(filter, "ig");
  const matchValue = str.match(regexp);
  console.log(matchValue);
  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return (
          <>
            {s}
            <span className={styles.hightlight}>{c}</span>
          </>
        );
      }
      return s;
    });
  }
  return str;
};

export default React.memo(Hightlight);
