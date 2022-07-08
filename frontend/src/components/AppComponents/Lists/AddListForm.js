// External modules
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Internal modules
import { createList } from "../../../store/list";
import ColorSelector from "../../Misc/ColorSelector";

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
        Add list
      </h2>
      {errors.length > 0 && <ul className="errors">
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>}
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Color
        <ColorSelector 
          defaultVal={color}
          setColor={setColor}
        />
      </label>
      {color}
    </form>
  );
};

export default AddListForm;