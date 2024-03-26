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

const OPTIONS = getArrayPopulated()

const optionSchema = z.object({
  label: z.string().optional(),
  value: z.string().optional(),
  ponNumber: z.string(),
  isTotalAffected: z.coerce.boolean(),
})

const FormSchema = z.object({
  affected: z.array(optionSchema).min(1),
})

const MultipleSelectorWithForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      affected: [
        {
          ponNumber: '3',
          isTotalAffected: false,
          label: 'teste',
          value: 'teste3',
        },
      ],
    },
  })

  const [loading, setLoading] = React.useState(false)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)

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
        <FormField
          control={form.control}
          name="affected"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frameworks</FormLabel>
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
        <LoadingButton loading={loading} type="submit">
          Submit
        </LoadingButton>
      </form>
    </Form>
  )
}
export default MultipleSelectorWithForm
