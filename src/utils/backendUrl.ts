
export  const backEndUrl = (process.env.REACT_APP_BACKEND_URL) ? process.env.REACT_APP_BACKEND_URL.toString() : "/api";

console.debug("process.env.REACT_APP_BACKEND_URL:" + process.env.REACT_APP_BACKEND_URL)