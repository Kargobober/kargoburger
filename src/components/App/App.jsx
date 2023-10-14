import React from 'react';
import { useEffect } from "react";

import styles from './App.module.css';

import { getIngridients } from "../../utils/api";
import { handleError } from "../../utils/utils";

import AppHeader from '../AppHeader/AppHeader';



function App() {
  const [state, setState] = React.useState({});

  useEffect(() => {
    getIngridients()
      .then((response) => {
        setState({
          ...state,
          ingridientsData: response.data,
        })
      })
      .catch(handleError)
    }, []) // только при монтировании

  return (
    <div className={styles.app}>
      <AppHeader />
    </div>
  );
}

export default App;
