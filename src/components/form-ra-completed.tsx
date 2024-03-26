import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import * as React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { LoadingButton } from '@/components/ui/loading-button'
import MultipleSelector from '@/components/ui/multiple-selector'
import { getArrayPopulated } from '@/lib/options-array'
import { Input } from './ui/input'
import { Button } from './ui/button'

const OPTIONS = getArrayPopulated()

const ponSchema = z.object({
  label: z.string().optional(),
  value: z.string().optional(),
  ponNumber: z.coerce.number(),
  isTotalAffected: z.coerce.boolean(),
})

const lamSchema = z.object({
  lamNumber: z.coerce.number().min(1).max(16),
  affectedPon: z
    .array(ponSchema)
    .min(1, { message: 'Deve haver ao menos uma pon afetada' }),
})

const FormSchema = z.object({
  isRaDisaster: z.array(lamSchema),
})

type FormSchemaType = z.infer<typeof FormSchema>

const FormRACompleted = () => {
  const [formData, setFormData] = React.useState({
    isRaDisaster: [
      {
        lamNumber: 0,
        affectedPon: [
          {
            ponNumber: 3,
            isTotalAffected: false,
            label: 'teste',
            value: 'teste3',
          },
        ],
      },
      {
        lamNumber: 1,
        affectedPon: [
          {
            ponNumber: 3,
            isTotalAffected: false,
            label: 'teste',
            value: 'teste3',
          },
        ],
      },
    ],
  })

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData,
  })

  const [loading, setLoading] = React.useState(false)

  const handleAddFields = () => {
    setFormData((prevState) => ({
      isRaDisaster: [
        ...prevState.isRaDisaster,
        {
          lamNumber: 0,
          affectedPon: [],
        },
      ],
    }))
  }

  function onSubmit(data: FormSchemaType) {
    setLoading(true)
    console.log(data)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: 'Your submitted data',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }, 500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {formData.isRaDisaster.map((lam, index) => (
          <React.Fragment key={index}>
            <FormField
              control={form.control}
              name={`isRaDisaster.${index}.lamNumber`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Lam</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe a lâmina afetada..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name={`isRaDisaster.${index}.affectedPon`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pons</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      groupBy="group"
                      onChange={field.onChange}
                      defaultOptions={OPTIONS}
                      placeholder="Select frameworks you like..."
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </React.Fragment>
        ))}
        <Button variant="secondary" type="button" onClick={handleAddFields}>
          Add Lam and Pon
        </Button>
        <LoadingButton loading={loading} type="submit">
          Submit
        </LoadingButton>
      </form>
    </Form>
  )
}

export { FormRACompleted }
