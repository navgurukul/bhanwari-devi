import { useEffect } from "react";

function useOutsideAlerter(ref, handleClick = false) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && handleClick) {
        handleClick();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, handleClick]);
}

export default useOutsideAlerter;
