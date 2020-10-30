import { useState, useCallback } from "react";

export default function useToggle(initFlag: boolean) {
  const [flag, setFlag] = useState(initFlag);
  const onToggle = useCallback(() => {
    setFlag(!flag);
  }, [flag]);
  return {flag,setFlag,onToggle}
}
