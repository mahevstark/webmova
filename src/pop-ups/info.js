"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import paid from "../assets/paid/paid.png";
import Image from "next/image";

export default function InfoModal({ title, open }) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="mx-auto">
          <Image src={paid} alt="" />
        </DialogTitle>

        <div
          className="flex flex-col items-center justify-center "
          style={{ margin: "0px" }}
        >
          <h2 className=" text-xl font-semibold text-center">{title}</h2>
          <p className="mt-2 text-sm text-center text-muted-foreground">
            Password Updated Successfully
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
