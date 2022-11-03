import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import UserForm from "../../../components/forms/userForm";
export default function NewUser() {
  const [user, setUser] = useState(null);

  const handleChange = e => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/users", user);
      toast.success("User added");
    } catch (err) {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        console.log(err);
        toast.error("Please Chech the fields");
      }
    }
  };

  return <UserForm handleSubmit={handleSubmit} handleChange={handleChange} />;
}
