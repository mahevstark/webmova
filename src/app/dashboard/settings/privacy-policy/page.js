"use client";
import React, { useEffect, useState } from "react";
import InfoLayout from "@/components/InfoLayout";
import GlobalApi from "@/lib/GlobalApi";
import { Spinner } from "@/components/ui/spinner";
export const dynamic = "force-dynamic";

export default function privacypolicy() {
  const [loading, setloading] = useState(false);
  const [content, setcontent] = useState();
  const getPolicy = async () => {
    try {
      setloading(true);
      const response = await GlobalApi.getStaticpage("privacy-policy");

      if (response?.success === true) {
        setloading(false);
        setcontent(response?.data);
      } else {
        setloading(false);
        setcontent({ content: "Oops! Looks like there's nothing here yet." });
      }
    } catch (error) {
      console.log("error while getting privacy policy", error);
      setcontent({ content: "Network Error." });
      setloading(false);
    }
  };

  useEffect(() => {
    getPolicy();
  }, []);
  return (
    <InfoLayout
      heading={"Privacy Policy"}
      content={content}
      loading={loading}
    />
  );
}
