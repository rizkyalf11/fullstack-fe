"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { RegisterPayload } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib";
import { useEffect, useState } from "react";

export const registerSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required("Wajib isi"),
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const Register = () => {
  const { useRegister } = useAuthModule();
  const { mutate, isLoading, handleTyping, handleShowErr } = useRegister();

  // {"nama":"Wajib isi","email":"Wajib isi","password":"Wajib isi"}

  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    // validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
    setFieldValue
  } = formik;

  return (
    <section className="w-full px-32 pt-20">
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Register</h1>
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="nama" title="Nama" />
            <InputText
              value={values.nama}
              placeholder="ihsan"
              id="nama"
              name="nama"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={getIn(errors, "nama")}
              messageError={getIn(errors, "nama")}
            />
          </section>
          <section>
            <Label htmlFor="email" title="Email" />
            <InputText
              value={values.email}
              placeholder="exampel@email.com"
              id="email"
              name="email"
              onChange={(e) => {
                handleChange(e)
                handleTyping('email')
              }}
              onBlur={handleBlur}
              isError={getIn(errors, "email") || handleShowErr("email")}
              messageError={errors?.email || handleShowErr("email")}
            />
          </section>
          <section>
            <Label htmlFor="password" title="Password" />

            <InputText
              value={values.password}
              placeholder="**********"
              id="password"
              name="password"
              type="password"
              onChange={(e) => {
                handleChange(e)
                handleTyping("password")
              }}
              onBlur={handleBlur}
              isError={getIn(errors, "password") || handleShowErr("password")}
              messageError={errors?.password || handleShowErr("password")}
            />
          </section>
          <section>
            <Button
              height="lg"
              title="Register"
              colorSchema="blue"
              isLoading={isLoading}
              isDisabled={isLoading}
            />
           <Link href={'login'}>
                <Button title="HalamanLogin" colorSchema="green"/>
             </Link>
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default Register;