// External modules
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import { createList } from "../../../store/list";

function AddListForm() {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#E44332");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(createList({ title, color, userId: user.id })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {user.username}
      </h2>
      {errors.length > 0 && <ul className="errors">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>}
    </form>
  );
};

export default AddListForm;