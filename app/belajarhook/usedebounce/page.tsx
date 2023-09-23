"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/app/component/Button";
import { useClosure } from "@/hook";
import InputText from "@/app/component/InputText";
import useDebounce from "@/hook/useDebounce";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const { isOpen, onOpen, onClose } = useClosure();
  const { debouncedValue } = useDebounce(keyword, 500)

  return (
    <section className="h-screen w-screen space-y-5">
      <Button onClick={onOpen} colorSchema="blue" title="open" />
      <Button onClick={onClose} colorSchema="red" title="closed" />
      <InputText
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        id="id"
        name="id"
      />

      {debouncedValue}

      {isOpen ? <p>Open</p> : <p>Close</p>}
    </section>
  );
};

export default Home;
