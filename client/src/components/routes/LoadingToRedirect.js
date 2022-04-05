import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count,navigate]);

  return (
    <div className="container p-5 text-center">
      <p>You Don't have Access to this Page Please Login <br /> Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
