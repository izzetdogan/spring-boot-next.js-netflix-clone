import { useContext, useEffect, useState } from "react";
import ListForm from "../../../components/forms/listForm";
import axios from "axios";
import { toast } from "react-toastify";

export default function NewList() {
  const [lists, setLists] = useState(null);

  const handleChange = e => {
    const value = e.target.value;
    setLists({ ...lists, [e.target.name]: value });
  };

  const handleSelect = e => {
    let value = Array.from(e.target.selectedOptions, option =>
      parseInt(option.value)
    );
    setLists({ ...lists, [e.target.name]: value });
    console.log("askljdn", lists);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/lists", lists);
      toast.success("Added");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <ListForm
      handleChange={handleChange}
      handleSelect={handleSelect}
      handleSubmit={handleSubmit}
      title="New List"
    />
  );
}
