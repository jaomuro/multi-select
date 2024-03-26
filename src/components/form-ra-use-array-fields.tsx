import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
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

const FormRAArrayfield = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isRaDisaster: [{ lamNumber: 0, affectedPon: [] }],
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form
  const { fields, append } = useFieldArray({
    control,
    name: 'isRaDisaster',
  })

  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
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

  const handleAddFields = () => {
    append({ lamNumber: 0, affectedPon: [] })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {fields.map((item, index) => (
          <div key={item.id}>
            <FormField
              control={control}
              name={`isRaDisaster.${index}.lamNumber`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lam</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe a lâmina afetada..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
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
                  <FormMessage>
                    {errors.isRaDisaster?.[index]?.affectedPon?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button variant="secondary" type="button" onClick={handleAddFields}>
          Add Fields
        </Button>
        <LoadingButton className="ml-3" loading={loading} type="submit">
          Submit
        </LoadingButton>
      </form>
    </Form>
  )
}

export { FormRAArrayfield }
