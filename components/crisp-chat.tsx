"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a14d183a-9efd-4f38-8ba2-e1ee1e3b322b");
  }, []);

  return null;
};
