import styles from './EditZone.module.css';
import React from 'react';
import PropTypes from "prop-types";

function EditZone({ children }) {
  return (
    <section className={styles.section}>
      {children}
    </section>
  )
}

EditZone.propTypes = {
  children: PropTypes.node.isRequired,
}

export default EditZone;
