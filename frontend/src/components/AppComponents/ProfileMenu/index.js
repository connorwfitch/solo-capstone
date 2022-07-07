// External modules
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Internal modules
import * as sessionActions from "../../../store/session";

function ProfileMenu({ showProfileMenu }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  
  return showProfileMenu && (
    <div className="profile-menu">
      <p className="light">{user.username}</p>
      <button className="btn btn-white" onClick={logout}>
        Log out
      </button>
    </div>
  )
}

export default ProfileMenu;