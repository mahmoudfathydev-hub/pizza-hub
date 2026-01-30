"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,// Custom breakpoint for better control
      startEvent: "DOMContentLoaded",
    });
  }, []);

  return null;
};
