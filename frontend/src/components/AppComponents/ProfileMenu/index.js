// External modules
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Internal modules
import * as sessionActions from "../../../store/session";
import './ProfileMenu.css';

function ProfileMenu({ showProfileMenu }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  console.log('color!', user.color, user.username);

  // const profileStyle = {
  //   color: user.color,
  //   border: `2px solid ${user.color}`
  // }

  return showProfileMenu && (
    <div className="profile-menu">
      <div className="profile-menu-user">
        <div className="profile-icon">
          <p>
            {user.username[0]}
          </p>
        </div>
        <div className="profile-menu-stack light">
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <button className="btn btn-white light" onClick={logout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
      </button>
      <button className="btn btn-white light" onClick={() => history.push('/')}>
        <i className="fa-solid fa-house"></i>
        Home
      </button>
    </div>
  )
}

export default ProfileMenu;