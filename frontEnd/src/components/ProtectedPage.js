import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function ProtectedPage({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        {/* header of every protected page */}
        <div className="flex items-center justify-between bg-primary p-6"> 
          <h1 className="text-2xl text-whiteLike pl-3">
            EFG
          </h1>
          <div className="bg-whiteLike py-2 px-5 rounded flex gap-2 items-center">
          <i className="ri-user-4-fill"></i>
            <span className="underline cursor-pointer uppercase">
              {user.name}
            </span>
            <i className="ri-logout-box-r-fill ml-10 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
                // navigate("/");
              }}
            ></i>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {user.name}
          {children}
        </div>
        
        {/* Footer : will do after writting the different pages*/}
        {/* <div className="flex items-center justify-center bg-primary p-3"> 

        </div> */}
      </div>
    )
  );
}

export default ProtectedPage;
