import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const Spinner: React.FC = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress ?(
      <div id="spinner">
        <Loader type="ThreeDots" color="#4e73df" height="100" width="100" />
      </div>
    ):null
  );
};

export default Spinner;
