import styles from './ActionsZone.module.css';
import React from 'react';
import PropTypes from "prop-types";

function ActionsZone({ children, className }) {
  return (
    <section className={className}>
      {children}
    </section>
  )
}

ActionsZone.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default ActionsZone;
