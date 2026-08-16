"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AnimatedArrowIcon from "../ui/button/AnimatedArrowIcon";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

export function NewsletterForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    form.reset();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
      <FieldGroup className="relative">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="newsletter-email"
                className="bg-[#2A2A2A] w-full h-16 rounded-[0.625rem] border-0 text-white"
                type="email"
                placeholder="EMAIL"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          className="p-0! absolute top-1.5 right-1.5 rounded-none!"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          <AnimatedArrowIcon />
        </Button>
      </FieldGroup>
    </form>
  );
}
