import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { BookListFilter } from "@/app/book/interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";

type FilterProps = {
  params: BookListFilter;
  setParams: Dispatch<SetStateAction<any>>;
};

const option = [
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
  {
    value: 2023,
    label: "2023",
  },
];

const Filter: React.FC<FilterProps> = ({ params, setParams }) => {
  const [newOption, setNewOption] = useState<any>([])
  const [newOption2, setNewOption2] = useState<any>([])
  const [isFy, setIsFy] = useState(false)
  const [isFy2, setIsFy2] = useState(false)

  const handleChange = (e: ChangeEvent<any>) => {
    setParams((params: BookListFilter) => {

      if(e.target.name == 'from_year') {
        if(e.target.value != 'Pilih') {
          setIsFy(true)
        } else {
          setIsFy(false)
        }
        const newOption = option.filter((c) => c.value >= e.target.value)
        setNewOption(newOption)
      }
      
      if(e.target.name == 'to_year') {

        if(e.target.value != 'Pilih') {
          setIsFy2(true)
        } else {
          setIsFy2(false)
        }
        const newOption2 = option.filter((c) => c.value <= e.target.value)
        setNewOption2(newOption2)
        console.log(newOption2)
      }

      return {
        ...params,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <section className="space-y-2">
      {/* {JSON.stringify(isFy)}
      {JSON.stringify(isFy2)} */}
      <section className="mt-2">
        <Label title="Title" htmlFor="title" />
        <InputText
          onChange={handleChange}
          value={params.title}
          name="title"
          id="title"
        />
      </section>
      <section>
        <Label title="Author" htmlFor="author" />
        <InputText
          onChange={handleChange}
          value={params.author}
          name="author"
          id="author"
        />
      </section>
      <section>
        <Label title="from year" htmlFor="from_year" />
        <Select
          onChange={handleChange}
          options={isFy2? newOption2 : option}
          value={params.from_year}
          name="from_year"
          id="from_year"
        />
      </section>
      <section>
        <Label title="to year" htmlFor="to_year" />
        <Select
          onChange={handleChange}
          options={isFy? newOption : option}
          value={params.to_year}
          name="to_year"
          id="to_year"
        />
      </section>
    </section>
  );
};

export default Filter;
