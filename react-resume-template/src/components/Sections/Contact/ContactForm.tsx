import {FC, memo, useCallback, useMemo, useState} from 'react';
import emailJs from '@emailjs/browser';
import {contact} from '../../../data/data';
import LoadingSpinner from './LoadingSpinner';
interface FormData {
  name: string;
  email: string;
  message: string;
}
const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const USER_ID = process.env.NEXT_PUBLIC_USER_ID;

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );
  const {alert, messageSent} = contact;
  const [data, setData] = useState<FormData>(defaultData);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      const fieldData: Partial<FormData> = {[name]: value};

      setData({...data, ...fieldData});
    },
    [data],
  );
  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      event.preventDefault();
      emailJs
        .sendForm(SERVICE_ID!, TEMPLATE_ID!, event.currentTarget, USER_ID)
        .then(
          (result: {text: string}) => {
            return result.text;
          },
          (error: {text: string}) => {
            setError(true);
            return error.text;
          },
        )
        .then();
      event.currentTarget.reset();
      setTimeout(() => {
        setIsFormSubmitted(true);
        setIsLoading(false);
      }, 3000);
    },
    [data],
  );

  const inputClasses =
    'px-4 py-3 rounded-lg bg-surface border border-neutral-700 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-text-secondary placeholder:text-sm text-text-primary text-sm';

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  } else if (isFormSubmitted) {
    return (
      <div className="message-success">
        <i className="fa fa-check" />
        <p className="font-bold text-text-primary">{messageSent}</p>
      </div>
    );
  } else {
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
          placeholder="Tell me about your project"
          required
          rows={6}
        />
        <button
          aria-label="Submit contact form"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg active:translate-y-0"
          type="submit"
          disabled={isLoading}>
          Send Message
        </button>

        {error && (
          <div className="message-warning">
            <i className="fa fa-check" />
            <p className="font-bold text-red-400">{alert}</p>
          </div>
        )}
      </form>
    );
  }
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
