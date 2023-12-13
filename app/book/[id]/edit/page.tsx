"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { BookUpdatePayload } from "../../interface";
import useBookModule from "../../lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { option } from "../../create/page";

const createBookSchema = yup.object().shape({
  title: yup.string().nullable().default("").required("Wajib isi"),
  author: yup.string().nullable().default("").required("Wajib isi"),
  year: yup.number().nullable().default(undefined).required("Wajib pilih"),
});

const UpdateBook = ({ params }: { params: { id: string } }) => {
  const { useDetailBook, useUpdateBook } = useBookModule();
  const { mutate, isLoading } = useUpdateBook(params.id);
  const { data, isFetching } = useDetailBook(params.id);

  const onSubmit = async (values: BookUpdatePayload) => {
    mutate(values);
  };

  const formik = useFormik<BookUpdatePayload>({
    initialValues: {
      title: data?.title || "",
      year: data?.year,
      author: data?.author || "",
      id: data?.id || 0,
    },
    validationSchema: createBookSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
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

  if(isFetching) {
    return (
        <p>Loading</p>
    )
  }
  
  return (
    <section className="flex items-center  justify-center w-full h-full">
      <section className="w-1/2">
        <Link href={"/book"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">Perbaharui Buku</h2>

        <FormikProvider value={formik}>
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="title" title="Title" />
              <InputText
                value={values.title}
                placeholder="Judul Buku"
                id="title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.title}
                messageError={errors.title}
              />
            </section>
            <section>
              <Label htmlFor="author" title="Auhtor" />
              <InputText
                value={values.author}
                placeholder="Penulis Buku"
                id="author"
                name="author"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={!!errors.author}
                messageError={errors.author}
              />
            </section>
            <section>
              <Label htmlFor="year" title="Year" />
              <Select
                value={values.year}
                id="year"
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
                options={option}
                isError={!!errors.year}
                messageError={errors.year}
              />
            </section>
            <section>
              <Button
                height="md"
                title="Perbarui"
                colorSchema="blue"
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default UpdateBook;
