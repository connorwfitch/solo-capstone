// External modules
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Internal modules
import * as sessionActions from "../../../store/session";
import './ProfileMenu.css';

function ProfileMenu({ showProfileMenu, setShowProfileMenu }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const profileStyle = {
    color: user.color,
    border: `2px solid ${user.color}`
  }

  return showProfileMenu && (
    <div className="profile-menu">
      <div className="profile-menu-container">
        <div className="profile-menu-user">
          <div className="profile-icon" style={profileStyle}>
            <p>
              {user.username[0]}
            </p>
          </div>
          <div className="profile-menu-stack light">
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="btn btn-white" onClick={() => setShowProfileMenu(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <button className="btn btn-white light" onClick={logout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        Log out
      </button>
      <button className="btn btn-white light" onClick={() => history.push('/')}>
        <i className="fa-solid fa-house"></i>
        Home
      </button>
    </div>
  )
}

export default ProfileMenu;