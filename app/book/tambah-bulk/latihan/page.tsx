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
import { BookCreateArrayPayload } from "../../interface";
import useBookModule from "../../lib";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { AddButton, DeleteButton } from "@/components/ButtonAction";

const option = [
  {
    value: 50,
    label: "50",
  },
  {
    value: 60,
    label: "60",
  },
  {
    value: 70,
    label: "70",
  },
  {
    value: 80,
    label: "80",
  },
  {
    value: 90,
    label: "90",
  },
  {
    value: 100,
    label: "100",
  },
];

interface Ujian {
  nilai: number | null;
  mapel: string;
}

interface CreateUser {
  nama: string;
  alamat: string;
  ujian: Ujian[];
  tes: {
    tes1: string;
    tes2: string;
  };
}

const defaultUjian: Ujian = {
  nilai: null,
  mapel: '',
};

const defaultUser = {
  nama: "",
  alamat: "",
  ujian: [
    defaultUjian,
  ],
  tes: {
    tes1: "",
    tes2: "",
  },
};

const ujianS = yup.object().shape({
  nilai: yup.number().nullable().default(null).required('Wajib Pilih'),
  mapel: yup.string().nullable().default("").required("wajib isi")
})

const createUser = yup.object().shape({
  nama: yup.string().nullable().default("").required("Wajib isi"),
  alamat: yup.string().nullable().default("").required("Wajib isi"),
  ujian: yup.array().of(ujianS),
  tes: yup.object().shape({
    tes1: yup.string().nullable().default("").required(""),
    tes2: yup.string().nullable().default("").required(""),
  })
}).default(defaultUser)

const CreateBook = () => {
  const { useCreateBulkBook } = useBookModule();
  // const { mutate, isLoading } = useCreateBulkBook();

  const onSubmit = (values: CreateUser) => {
    console.log(values)
  };

  const formik = useFormik<CreateUser>({
    initialValues: createUser.getDefault(),
    validationSchema: createUser,
    enableReinitialize: true,
    onSubmit: (v) => {
      console.log(v)
    },
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
        {JSON.stringify(values.tes)}

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama" title="nama" />
              <InputText
                onBlur={handleBlur}
                value={values.nama}
                onChange={(e) => {
                  setFieldValue("nama", e.target.value)
                }}
                placeholder="Nama"
                id="nama"
                name="nama"
                isError={!!errors.nama && !!touched.nama}
                messageError={errors.nama}
              />
            </section>

            <section>
              <Label htmlFor="alamat" title="alamat" />
              <InputText
                onBlur={handleBlur}
                value={values.alamat}
                onChange={(e) => {
                  setFieldValue("alamat", e.target.value)
                }}
                placeholder="Alamat"
                id="alamat"
                name="alamat"
                isError={!!errors.alamat && !!touched.alamat}
                messageError={errors.alamat}
              />
            </section>

            <section className="border border-black rounded-md p-3">
              <h1 className="mb-2 font-semibold">Hasil Ujian</h1>
              <FieldArray 
                name="ujian"
                render={(arrayHelpers: ArrayHelpers) => (
                  <>
                  {values && values.ujian.map((value, index) => (
                    <section key={index} className="flex w-full justify-around border border-black rounded-md p-3 mb-2">
                      <section className="flex items-center justify-end">
                        <DeleteButton
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </section>
                      <section>
                        <Label htmlFor="nilai" title="nilai" />
                        <Select
                          options={option}
                          onBlur={handleBlur}
                          value={value.nilai || undefined}
                          onChange={handleChange}
                          placeholder="Nilai"
                          id={`ujian[${index}]nilai`}
                          name={`ujian[${index}]nilai`}
                          isError={
                            getIn(errors?.ujian?.[index], "nilai") &&
                            getIn(touched?.ujian?.[index], "nilai")
                          }
                          messageError={getIn(errors?.ujian?.[index], "nilai")}
                        />
                      </section>
                      <section>
                        <Label htmlFor="mapel" title="mapel" />
                        <InputText
                          onBlur={handleBlur}
                          value={value.mapel}
                          onChange={handleChange}
                          placeholder="Mapel"
                          id={`ujian[${index}]mapel`}
                          name={`ujian[${index}]mapel`}
                          isError={
                            getIn(errors?.ujian?.[index], "mapel") &&
                            getIn(touched?.ujian?.[index], "mapel")
                          }
                          messageError={getIn(errors?.ujian?.[index], "mapel")}
                        />
                      </section>
                    </section>
                  ))}

                    <section className="mt-2">
                      <AddButton
                        onClick={() =>
                          arrayHelpers.push(ujianS.getDefault())
                        }
                      />
                    </section>
                  </>
                )}
              />
            </section>
          
            <section className="border border-black rounded-md p-2">
              <h1 className="mb-2 font-semibold">Tes</h1>
              <section className="flex w-full justify-around border border-black rounded-md p-3">
                <section>
                  <Label htmlFor="tes1" title="tes1" />
                  <InputText
                    onBlur={handleBlur}
                    value={values.tes.tes1}
                    onChange={(e) => {
                      setFieldValue("tes.tes1", e.target.value)
                    }}
                    placeholder="Tes 1"
                    id="tes1"
                    name="tes1"
                    isError={!!errors.tes?.tes1 && !!touched.tes?.tes1}
                    messageError={errors.tes?.tes1}
                  />
                </section>
                <section>
                  <Label htmlFor="tes2" title="tes2" />
                  <InputText
                    onBlur={handleBlur}
                    value={values.tes.tes2}
                    onChange={(e) => {
                      setFieldValue("tes.tes2", e.target.value)
                    }}
                    placeholder="Tes 2"
                    id="tes2"
                    name="tes2"
                    isError={!!errors.tes?.tes2 && !!touched.tes?.tes2}
                    messageError={errors.tes?.tes2}
                  />
                </section>
              </section>
            </section>

            <section>
              <Button type="submit" height="md" title="Simpan" colorSchema="blue" onClick={() => {
                console.log(values)
              }} />
              <Button type="button" onClick={() => resetForm()} height="md" title="Cancel" colorSchema="red" />
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateBook;