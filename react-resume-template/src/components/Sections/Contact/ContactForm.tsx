import {zodResolver} from '@hookform/resolvers/zod';
import emailJs from '@emailjs/browser';
import {Loader2} from 'lucide-react';
import {FC, memo, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const USER_ID = process.env.NEXT_PUBLIC_USER_ID;

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(1000, 'Message is too long.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm: FC = memo(() => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {name: '', email: '', message: ''},
  });

  const onSubmit = useCallback(
    async (values: ContactFormValues): Promise<void> => {
      if (!SERVICE_ID || !TEMPLATE_ID) {
        toast.error("Contact isn't configured right now — try again later.");
        return;
      }
      try {
        await emailJs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {name: values.name, email: values.email, message: values.message},
          USER_ID,
        );
        toast.success("Thanks — I'll reply within 24h.");
        reset();
      } catch (err) {
        toast.error('Something went wrong sending your message. Please retry.', {
          description: err instanceof Error ? err.message : undefined,
        });
      }
    },
    [reset],
  );

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          aria-invalid={errors.name ? true : undefined}
          autoComplete="name"
          id="contact-name"
          placeholder="Your name"
          type="text"
          {...register('name')}
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-destructive" id="contact-name-error">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          aria-invalid={errors.email ? true : undefined}
          autoComplete="email"
          id="contact-email"
          placeholder="you@example.com"
          type="email"
          {...register('email')}
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-destructive" id="contact-email-error">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          aria-invalid={errors.message ? true : undefined}
          id="contact-message"
          maxLength={1000}
          placeholder="How can I help?"
          rows={6}
          {...register('message')}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-destructive" id="contact-message-error">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <Button
        className="w-full sm:w-auto sm:self-start focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        disabled={isSubmitting}
        size="lg"
        type="submit">
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" />
            Sending…
          </>
        ) : (
          'Send message'
        )}
      </Button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;
