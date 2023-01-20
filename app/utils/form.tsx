export const getFormDataValues = async (request: { formData: () => FormData }, inputs: string[]) => {
  const form = await request.formData()
  const result: Record<string, string> = {}

  inputs.forEach((input: string) => {
    const value = form.get(input) as string
    result[input] = value
  })

  return result
}
