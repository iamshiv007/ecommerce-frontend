import React, { Fragment } from "react";
import { Loader } from "../layout/loader/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import "./Profile.css";
import profile from "../../images/Profile.png";

export const Profile = () => {
  const { loading, user } = useSelector((state) => state.auth);

  function isValidImageUrl(url) {
    // Regular expression to match image file extensions
    const imageExtensionPattern = /\.(jpg|jpeg|png|gif|ico)$/i;

    // Test if the URL ends with an image file extension
    return imageExtensionPattern.test(url);
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={
                  isValidImageUrl(user?.avatar.url) ? user?.avatar.url : profile
                }
                alt={user?.name}
              />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
