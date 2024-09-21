import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../components/context/AppContext';
import { request } from '../../helpers/request';

function Loading() {
  const { isLoading, setIsLoading, setAccount } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500); 
  }, [setIsLoading]);

  async function refreshCycle() {
    if (localStorage.getItem('authorized')) {
      try {
        const response = await request('/backend/refresh', 'POST', null, {}, true);
        console.log('Refresh response:', response);

        if (response.user) {
          setAccount(response.user);
          localStorage.setItem('authorized', 'true');
          setTimeout(refreshCycle, 30 * 60 * 1000); // 30 minutes
          console.log("Refresh token refreshed");
          return true;
        } else {
          localStorage.removeItem('authorized');
          console.log("Refresh token expired");
        }
      } catch (error) {
        localStorage.removeItem('authorized');
        console.log("Refresh token expired due to error", error);
      }
    }
    return false;
  }

  const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem('authorized') === true);

  useEffect(() => {
    if (!isAuthorized) {
      refreshCycle();
    }
  }, [isAuthorized]);

  return (
    <div className={isLoading ? "loading" : "loading hidden"}> 
      <div className="loader"></div>
    </div>
  );
}

export default React.memo(Loading);