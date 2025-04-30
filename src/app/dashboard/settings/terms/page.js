"use client";
import React, { useEffect, useState } from "react";
import InfoLayout from "@/components/InfoLayout";
import GlobalApi from "@/lib/GlobalApi";

export default function terms() {
  const [loading, setloading] = useState(false);
  const [content, setcontent] = useState();
  const getPolicy = async () => {
    try {
      setloading(true);
      const response = await GlobalApi.getStaticpage("terms-and-conditions");

      if (response?.success === true) {
        setloading(false);
        setcontent(response?.data);
      } else {
        setloading(false);
        setcontent({ content: "Oops! Looks like there's nothing here yet." });
      }
    } catch (error) {
      console.log("error while getting terms", error);
      setloading(false);
      setcontent({ content: "Network error." });
    }
  };

  useEffect(() => {
    getPolicy();
  }, []);
  return (
    <InfoLayout
      heading={"Terms & Conditions"}
      content={content}
      loading={loading}
    />
  );
}
