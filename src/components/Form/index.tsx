// components/Form.tsx
import React from "react"
import { useForm } from "react-hook-form"
import { z, ZodError } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useStore } from "@/store"

const schema = z.object({
  search: z.string().min(1).max(10),
})

type SearchSchema = z.infer<typeof schema>

type FormProps = {
  onSubmit: (data: SearchSchema) => void
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({ resolver: zodResolver(schema) })

  const inputValue = useStore(state => state.inputValue) // Get input value from the store
  const setInputValue = useStore(state => state.setInputValue) // Function to set input value

  const handleFormSubmit = async (data: SearchSchema) => {
    try {
      schema.parse(data)
      onSubmit(data)
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-5"
    >
      <Input
        {...register("search")}
        value={inputValue} // Set input value
        onChange={e => setInputValue(e.target.value)} // Update input value in the store
      />
      {errors.search && <span>{errors.search.message}</span>}
      <Button
        type="submit"
        variant="secondary"
        size="default"
        className="w-full"
      >
        Submit
      </Button>
    </form>
  )
}

export default Form
