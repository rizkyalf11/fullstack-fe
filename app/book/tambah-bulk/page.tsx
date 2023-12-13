"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import {
  useFormik,
  Form,
  FormikProvider,
  FieldArray,
  ArrayHelpers,
  getIn
} from "formik";
import * as yup from "yup";
import { BookCreateArrayPayload } from "../interface";
import useBookModule from "../lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { option } from "../create/page";
import { AddButton, DeleteButton } from "@/components/ButtonAction";

const createBookSchema = yup.object().shape({
  title: yup.string().nullable().default("").required("Wajib isi"),
  author: yup.string().nullable().default("").required("Wajib isi"),
  year: yup.number().nullable().default(undefined).required("Wajib pilih"),
});

const defaultCatatanArray = {
  data: [
    {
      title: "",
      author: "",
      year: undefined,
    },
  ],
};

const createBookArraySchema = yup.object().shape({
  data: yup.array().of(createBookSchema),
}).default(defaultCatatanArray);

const CreateBook = () => {
  const { useCreateBulkBook } = useBookModule();
  const { mutate, isLoading } = useCreateBulkBook();

  const onSubmit = async (values: BookCreateArrayPayload) => {
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(defaultCatatanArray);
      },
    });
  };

  const formik = useFormik<BookCreateArrayPayload>({
    initialValues: createBookArraySchema.getDefault(),
    validationSchema: createBookArraySchema,
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
    touched
  } = formik;

  return (
    <section className="flex items-center  justify-center w-full h-full overflow-auto py-10">
      <section className="w-1/2">
        <Link href={"/book"}>
          <span className="flex items-center">
            {" "}
            <ArrowLongLeftIcon className="h-5 w-5 mr-2" />
            Kembali
          </span>
        </Link>
        <h2 className="text-xl font-bold text-gray-500">Tambah Buku</h2>
        {JSON.stringify(values)}

        <FormikProvider value={formik}>
          <Form className="space-y-5" onSubmit={handleSubmit}>
            <FieldArray
              name={"data"}
              render={(arrayHelpers: ArrayHelpers) => (
                <>
                  {values &&
                    values?.data?.map((value, index) => (
                      <section
                        key={index}
                        className="space-y-2 shadow-lg p-5 relative"
                      >
                        <section className="flex items-center justify-end">
                          <DeleteButton
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </section>
                        
                        <section>
                          <Label htmlFor="title" title="Title" />
                          <InputText
                            value={value.title}
                            placeholder="Judul Buku"
                            id={`data[${index}]title`}
                            name={`data[${index}]title`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "title") && 
                              getIn(touched?.data?.[index], "title")
                            }
                            messageError={ getIn(errors?.data?.[index], "title")}
                          />
                        </section>
                        <section>
                          <Label htmlFor="author" title="Auhtor" />
                          <InputText
                            value={value.author}
                            placeholder="Penulis Buku"
                            id={`data[${index}]author`}
                            name={`data[${index}]author`}
                            onChange={(e) => {
                              setFieldValue(
                                `data[${index}]author`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                            isError={
                              getIn(errors?.data?.[index], "author") &&
                              getIn(touched?.data?.[index], "author")
                            }
                            messageError={ getIn(errors?.data?.[index], "author")}
                          />
                        </section>
                        <section>
                          <Label htmlFor="year" title="Year" />
                          <Select
                            value={value.year}
                            id={`data[${index}]year`}
                            name={`data[${index}]year`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            options={option}
                            isError={
                              getIn(errors?.data?.[index], "year") &&
                              getIn(touched?.data?.[index], "year")
                            }
                            messageError={ getIn(errors?.data?.[index], "year")}
                          />
                        </section>
                      </section>
                    ))}

                  <section>
                    <AddButton
                      onClick={() =>
                        arrayHelpers.push(createBookSchema.getDefault())
                      }
                    />
                  </section>
                </>
              )}
            />

            <section>
              <Button
                height="md"
                title="Simpan"
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

export default CreateBook;