"use client";
import { useRef, useState } from "react";
import Button from "@/app/component/Button";
import { useClosure } from "@/hook";


const Home = () => {
  const {isOpen, onOpen, onClose} = useClosure()

  return (
    <section className="h-screen w-screen space-y-5">
     <Button onClick={onOpen} colorSchema="blue" title="open" />
     <Button onClick={onClose} colorSchema="red" title="closed" />


     {isOpen ? <p>Open</p> : <p>Close</p>}

    </section>
  );
};

export default Home;