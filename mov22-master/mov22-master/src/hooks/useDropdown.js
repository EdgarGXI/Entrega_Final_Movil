import { useState } from "react";

const useDropdown = (initialItems) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [value, setValue] = useState(null);
  
  return { open, setOpen, value, setValue, items, setItems };
};

export default useDropdown;