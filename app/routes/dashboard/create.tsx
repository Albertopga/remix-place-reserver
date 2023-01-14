// import { json, redirect } from '@remix-run/node'
// import { db } from '~/services/db'
// import { Form, useActionData, useTransition } from '@remix-run/react'

// const badRequest = (data: any) => {
//   return json(data, { status: 400 })
// }

// // maneja la accion del formulario
// export const action = async ({ request }:any) => {
//   const form = await request.formData()
//   const title = form.get('title')
//   const body = form.get('body')

//   const fieldErrors = {
//     title: title.length < 4 ? 'Title must be at least 4 characters' : null,
//     body: body.length < 10 ? 'Body must be at least 10 characters' : null
//   }

//   const hasErrors = Object.values(fieldErrors).some(Boolean)
//   const fields = { title, body }

//   if (hasErrors) {
//     return badRequest({ fieldErrors, fields })
//   }

//   const payload: any = { data: { title, body } }
//   const post = await db.post.create(payload)

//   return redirect(`/post/${post.id}`)
// }

// export function ErrorBoundary ({ error }:any) {
//   return (
//     <div>
//       <strong>Algo ha salido mal: { error.message }</strong>
//     </div>
//   )
// }

// export default function CreatePost () {
//   const { state } = useTransition()
//   const acctionData = useActionData()

//   const { fieldErrors } = acctionData ?? {}
//   const { title: titleError, body: bodyError } = fieldErrors ?? {}
//   const isSubmitting = state === 'submitting'

//   return (
//     <>
//       <h2>Create new post</h2>
//       <Form method='POST' disabled={ isSubmitting }>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input type="text" id="title" name="title" />
//           <p>{titleError && <small style={{ color: 'red' }}>{ titleError }</small>}</p>
//         </div>

//         <div>
//           <label htmlFor="body"> Body</label>
//           <textarea id="body" name="body"></textarea>
//           <p>{bodyError && <small style={{ color: 'red' }}>{ bodyError }</small>}</p>
//         </div>
//         <button type="submit">
//           { isSubmitting
//             ? 'Wait for it ...'
//             : 'Create post'
//           }
//         </button>
//       </Form>
//     </>
//   )
// }
