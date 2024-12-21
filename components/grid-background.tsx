"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-white">
      <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[length:50px_50px]" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0">
        <svg className="h-full w-full">
          <defs>
            <pattern
              id="grid-pattern"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  );
}
