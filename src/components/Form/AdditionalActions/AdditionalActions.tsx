import styles from './AdditionalActions.module.css';
import React from 'react';
import PropTypes from "prop-types";

function AdditionalActions({ children }) {
  return (
    <section className={`mt-20 ${styles.section}`}>
      {children}
    </section>
  )
}

AdditionalActions.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdditionalActions;
