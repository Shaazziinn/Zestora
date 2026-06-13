"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Logo from "./Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem("zestora-loaded")) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("zestora-loaded", "1");
    }, 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="grain pointer-events-none absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Logo />
          </motion.div>
          <div className="relative mt-8 h-px w-44 overflow-hidden bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brass"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.3, ease: EASE }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
