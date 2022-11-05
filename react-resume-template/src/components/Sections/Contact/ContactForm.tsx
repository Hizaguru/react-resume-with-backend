import { FC, memo, useCallback, useMemo, useState } from 'react'
import emailJs from 'emailjs-com'
import { contact } from '../../../data/data'
import LoadingSpinner from './LoadingSpinner'
interface FormData {
  name: string;
  email: string;
  message: string;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID
const USER_ID = process.env.NEXT_PUBLIC_USER_ID

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  )
  const { alert, messageSent } = contact
  const [data, setData] = useState<FormData>(defaultData)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const { name, value } = event.target

      const fieldData: Partial<FormData> = { [name]: value }

      setData({ ...data, ...fieldData })
    },
    [data],
  )
  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true)
      event.preventDefault()
      emailJs.sendForm(SERVICE_ID!, TEMPLATE_ID!, event.currentTarget, USER_ID).then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          setError(true)
          console.log(error.text)
        }
      ).then()
      event.currentTarget.reset()
      setTimeout(() => {
        setIsFormSubmitted(true)
        setIsLoading(false)
      }, 3000)


    },
    [data],
  )

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-orange-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm'


  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }
  else if (isFormSubmitted) {
    return (
      <div id="message-success">
        <i className="fa fa-check" />
        {messageSent}
      </div>
    )
  }
  else {
    return (
      <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={handleSendMessage}>
        <input className={inputClasses} name="name" onChange={onChange} placeholder="Name" required type="text" />
        <input
          autoComplete="email"
          className={inputClasses}
          name="email"
          onChange={onChange}
          placeholder="Email"
          required
          type="email"
        />
        <textarea
          className={inputClasses}
          maxLength={250}
          name="message"
          onChange={onChange}
          placeholder="Message"
          required
          rows={6}
        />
        <button
          aria-label="Submit contact form"
          className="w-max rounded-full border-2 border-orange-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-stone-800"
          type="submit"
          disabled={isLoading}>
          Send Message
        </button>

        {error ?? (
          <div id="message-success">
            <i className="fa fa-check" />
            {alert}
          </div>
        )}
      </form>
    )
  }
})

ContactForm.displayName = 'ContactForm'
export default ContactForm
