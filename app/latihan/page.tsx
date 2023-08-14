'use client'
import React from 'react'
import Button from '../component/Button'
import Label from '../component/Label'
import InputText from '../component/InputText'

const page = () => {
	return (
		<main className="flex flex-col gap-5 p-5">

      <section>
        <Label title="username" htmlFor="username" isRequired />
        <InputText
          id="username"
          name="username"
          value={"ihsanabuhanifah"}
          placeholder="username"
          type="text"
          messageError="Username not empty"
        />
      </section>

      <section>
        <Label title="password" htmlFor="password" isRequired />
        <InputText
          id="password"
          name="password"
          value={"12345678"}
          placeholder="******"
          type="passoword"
        />
      </section>

      <section>
        <Label title="name" htmlFor="name" />
        <InputText
          id="name"
          name="name"
          value={"ihsan"}
          onChange={() => {
            console.log("ok");
          }}
        />
      </section>

      <section className="space-x-5 mt-5">
        <Button
          title="simpan"
          isDisabled={false}
          variant="solid"
          colorSchema="blue"
        />
         <Button
          title="simpan"
          isDisabled={true}
          variant="solid"
          colorSchema="blue"
        />
        <Button
          title="Update"
          isDisabled={false}
          variant="outline"
          colorSchema="blue"
        />
         <Button
          title="Update"
          isDisabled={true}
          variant="outline"
          colorSchema="blue"
        />
        <Button
          title="Draft"
          isDisabled={false}
          variant="outline"
          colorSchema="green"
        />
        <Button 
          title="batal" 
          isDisabled 
          variant="solid" 
          colorSchema="red" 
        />
        <Button 
          title="batal" 
          isDisabled={false} 
          variant="solid" 
          colorSchema="red" 
        />
      </section>


		</main>
	)
}

export default page
