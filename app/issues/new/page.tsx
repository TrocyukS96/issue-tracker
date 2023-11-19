'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";

import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createIssueSchema } from '../../validationSchema';
import ErrorsMessage from '../../components/ErrorsMessage';
import Spinner from '../../components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)
  const submitData = async (params: IssueForm) => {
    try {
      setIsSubmiting(true)
      await axios.post('/api/issues', params)
      router.push('/issues')
      setIsSubmiting(false)
    } catch (error) {
      setError('An unexpected error occured')
      setIsSubmiting(false)
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
          errors.title && <ErrorsMessage>{errors.title?.message}</ErrorsMessage>
        }
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {
          errors.description && <ErrorsMessage>{errors.description?.message}</ErrorsMessage>
        }
        <Button type='submit' disabled={isSubmiting}>
          Submit New Issue
          {isSubmiting &&
            <Spinner/>
          }
        </Button>
      </form>
    </div>

  )
}

export default NewIssuePage