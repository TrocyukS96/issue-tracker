'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import "easymde/dist/easymde.min.css";
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { createIssueSchema } from '../../validationSchema';
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('')
  const submitData = async (params: IssueForm) => {
    try {
      await axios.post('/api/issues', params)
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
        {
          errors.title && <Text color='red' as={'p'}>{errors.title.message}</Text>
        }
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {
          errors.description && <Text color='red' as={'p'}>{errors.description.message}</Text>
        }
        <Button type='submit'>
          Submit New Issue
        </Button>
      </form>
    </div>

  )
}

export default NewIssuePage