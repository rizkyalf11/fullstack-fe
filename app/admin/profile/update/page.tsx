'use client'

import { useFormik, Form, FormikProvider, getIn } from 'formik'

import * as yup from 'yup'
// import { UpdateProfile } from '@/app/(auth)/interface'
import InputText from '@/components/InputText'
import Label from '@/components/Label'
import Button from '@/components/Button'
import useAuthModule from '@/app/(auth)/lib'
import Image from 'next/image'
import useUploadFile from '@/hook/useUploadFile'

export const registerSchema = yup.object().shape({
	nama: yup
		.string()
		.nullable()
		.default('')

		.required('Wajib isi'),
	avatar: yup.string().nullable().default('').required('Wajib isi'),
})

const UpdateProfile = () => {
  const { useProfile, useUpdateProfile } = useAuthModule();
  const { mutate } = useUpdateProfile();
  const { data, isFetching } = useProfile();
  
  console.log(data?.data)
  
	const formik = useFormik<any>({
		initialValues: {
			nama: data?.data.nama,
			avatar: data?.data.avatar,
			file: undefined,
			id: data?.data.id,
		},
		validationSchema: registerSchema,
		enableReinitialize: true,
		onSubmit: (values) => {
      mutate(values)
    },
	})

  const { handleChange, handleSubmit, handleBlur, values, errors, setFieldValue } = formik

  if(isFetching) {
    return <h1>Loading...</h1>
  }

	return (
    <section>
      {JSON.stringify(data?.data)}
      {JSON.stringify(values)}
			<div className="flex items-center justify-center w-full">
				<h1 className="text-3xl text-blue-400">Update Profile</h1>
			</div>
      <Image 
        alt='profile'
        src={values.avatar || '/bprofile.jpeg'}
        height={100}
        width={100}
      />
			<FormikProvider value={formik}>
				<Form className="space-y-5" onSubmit={handleSubmit}>
					<section>
						<Label htmlFor="nama" title="Nama" />
						<InputText value={values.nama} placeholder="ihsan " id="nama" name="nama" onChange={handleChange} onBlur={handleBlur} isError={getIn(errors, 'nama')} messageError={getIn(errors, 'nama')} />
					</section>
					<section className="w-full">
						<input type="file" id="file" onChange={(event: any) => {
              const file = event.target.files[0];

              // if (file.type !== "image/jpeg") {
              //   return alert("type tidak sesauai");
              // }
              
              let reader = new FileReader();
              reader.onloadend = () => {
                setFieldValue(`avatar`, reader.result);
              };
              reader.readAsDataURL(file);
              setFieldValue("file", file);
            }} />
					</section>
						<Button height="lg" title="Update" colorSchema="blue"  type='submit' />
				</Form>
			</FormikProvider>
		</section>
	)
}

export default UpdateProfile
