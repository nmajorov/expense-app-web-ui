console.log("process.env.REACT_APP_BACKEND_URL:" + process.env.REACT_APP_BACKEND_URL)
export  const backEndUrl = (process.env.REACT_APP_BACKEND_URL) ? process.env.REACT_APP_BACKEND_URL.toString() : "/api";

