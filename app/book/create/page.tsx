"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { BookCreatePayload } from "../interface";
import useBookModule from "../lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";

export const createBookSchema = yup.object().shape({
  title: yup.string().nullable().default("").required("Wajib isi"),
  author: yup.string().nullable().default("").required("Wajib isi"),
  year: yup.number().nullable().default(undefined).required("Wajib pilih"),
});

export const option = [
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

const CreateBook = () => {
  const { useCreateBook } = useBookModule();
  const { mutate, isLoading } = useCreateBook();
  
  const onSubmit = async (values: BookCreatePayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(createBookSchema.getDefault());
      },
    });
  };
  
  const formik = useFormik<BookCreatePayload>({
    initialValues: createBookSchema.getDefault(),
    validationSchema: createBookSchema,
    enableReinitialize: true,
    onSubmit: onSubmit
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;

  return (
    <section className="flex items-center  justify-center w-full h-full">
      <section className="w-1/2">
      {JSON.stringify(values)}
      {JSON.stringify(errors)}
        <Link href={"/book"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">Tambah Buku</h2>

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="title" title="Title" />
              <InputText
                onBlur={handleBlur}
                value={values.title}
                onChange={(e) => {
                  setFieldValue("title", e.target.value)
                }}
                placeholder="Judul Buku"
                id="title"
                name="title"
                isError={!!errors.title}
                messageError={errors.title}
              />
            </section>
            <section>
              <Label htmlFor="author" title="Auhtor" />
              <InputText
                onBlur={handleBlur}
                value={values.author}
                onChange={handleChange}
                placeholder="Penulis Buku"
                id="author"
                name="author"
                isError={!!errors.author}
                messageError={errors.author}
              />
            </section>
            <section>
              <Label htmlFor="year" title="Year" />
              <Select onBlur={handleBlur} isError={!!errors.year} messageError={errors.year}  onChange={handleChange} value={values.year} id="year" name="year" options={option} />
            </section>
            <section>
              <Button type="submit" height="md" title="Simpan" colorSchema="blue" />
              <Button type="button" onClick={() => resetForm()} height="md" title="Cancel" colorSchema="red" />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateBook;
