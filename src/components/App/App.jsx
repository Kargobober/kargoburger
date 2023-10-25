import React from 'react';
import { useEffect } from "react";

import styles from './App.module.css';

import { getIngridients } from "../../utils/api";
import { handleError } from "../../utils/utils";

import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';



function App() {
  const [state, setState] = React.useState({
    isLoading: true,
    hasError: false,
    ingridientsData: [],
  });

  useEffect(() => {
    getIngridients()
      .then((response) => {
        setState({
          ...state,
          ingridientsData: response.data,
          isLoading: false,
        })
      })
      .catch((err) => {
        setState({ ...state, isLoading: false, hasError: true })
        handleError(err)
      })
  }, []) // только при монтировании

  return (
    <div className={styles.app}>
      <AppHeader />
      { !state.isLoading && <Main ingridientsData={state.ingridientsData} /> }
    </div>
  );
}

export default App;
