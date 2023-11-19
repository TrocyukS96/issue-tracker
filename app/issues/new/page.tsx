'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';

import "easymde/dist/easymde.min.css";
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
   const router = useRouter()
  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error,setError] = useState('')
  const submitData =async (params:IssueForm) => {
    try {
      await axios.post('/api/issues',params)
      router.push('/issues')
    } catch (error) {
      setError('An unexpected error occured')
    }
  }
  return (
    <div className='max-w-xl'>
      {
        error && 
        <Callout.Root className='mb-5'>
          <Callout.Text color='red'>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
<form className=' space-y-3'
      onSubmit={handleSubmit(submitData)}
    >
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button type='submit'>
        Submit New Issue
      </Button>
    </form>
    </div>

  )
}

export default NewIssuePage