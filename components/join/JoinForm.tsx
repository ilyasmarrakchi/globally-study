"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FORMSPREE_ENDPOINT : collez ici l'URL de votre formulaire.
 *
 *  • Formspree : créez un formulaire sur https://formspree.io puis copiez son
 *    endpoint, par exemple "https://formspree.io/f/abcdwxyz".
 *  • Tally : utilisez l'URL d'un webhook ou de tout service acceptant un POST
 *    JSON. (Pour un formulaire Tally classique, vous pouvez aussi remplacer ce
 *    composant par l'intégration iframe fournie par Tally.)
 *
 *  Tant que la valeur ci-dessous n'est pas remplacée, le formulaire affiche un
 *  message indiquant qu'il n'est pas encore configuré.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

import { useState, type FormEvent } from "react";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { BUTTON_BASE, BUTTON_VARIANTS, ButtonLink } from "@/components/ui/ButtonLink";
import { CheckIcon, GraduationIcon, UsersIcon } from "@/components/ui/Icons";

type Profile = "seeker" | "mentor";
type Need = "admin" | "housing" | "orientation" | "other";
type Status = "idle" | "submitting" | "success" | "error" | "notConfigured";
type FieldErrors = Partial<Record<"profile" | "need" | "email" | "message", string>>;

const PROFILES: Profile[] = ["seeker", "mentor"];
const NEEDS: Need[] = ["admin", "housing", "orientation", "other"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 20;

const isConfigured = !FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID");

export function JoinForm() {
  const { t, locale } = useTranslation();
  const form = t.join.form;

  const [profile, setProfile] = useState<Profile | "">("");
  const [need, setNeed] = useState<Need | "">("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submittedProfile, setSubmittedProfile] = useState<Profile>("seeker");

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!profile) next.profile = form.errors.profile;
    if (!need) next.need = form.errors.need;
    if (!EMAIL_PATTERN.test(email.trim())) next.email = form.errors.email;
    if (message.trim().length < MIN_MESSAGE_LENGTH) next.message = form.errors.message;
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    if (!isConfigured) {
      setStatus("notConfigured");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          profile,
          need,
          email: email.trim(),
          message: message.trim(),
          language: locale,
          _subject: `GlobAlly Study — ${profile === "mentor" ? "Mentor" : "Help request"} (${need})`,
        }),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setSubmittedProfile(profile || "seeker");
      setStatus("success");
      setProfile("");
      setNeed("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    const success = t.join.success;
    return (
      <div className="rounded-block bg-white p-8 text-center shadow-lift ring-1 ring-ink/5 sm:p-14" role="status">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-royal-soft ring-8 ring-royal-soft/50">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royal text-white">
            <CheckIcon className="h-7 w-7" strokeWidth={3} />
          </span>
        </span>
        <h2 className="mt-7 font-display text-3xl font-black tracking-tight text-ink">{success.title}</h2>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-600">
          {submittedProfile === "mentor" ? success.textMentor : success.textSeeker}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className={`${BUTTON_BASE} ${BUTTON_VARIANTS.secondary}`}
          >
            {success.again}
          </button>
          <ButtonLink href="/guides">{success.guides}</ButtonLink>
        </div>
      </div>
    );
  }

  const inputBase =
    "mt-2.5 block w-full rounded-2xl border-2 bg-paper px-4 py-3.5 text-[0.95rem] text-ink placeholder:text-slate-400 transition focus:bg-white focus:outline-none focus:ring-4 focus:ring-royal/10";
  const inputState = (field: keyof FieldErrors) =>
    errors[field] ? "border-raspberry/60 focus:border-raspberry" : "border-transparent focus:border-royal";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 rounded-block bg-white p-6 shadow-lift ring-1 ring-ink/5 sm:p-10">
      <fieldset>
        <legend className="font-display text-base font-extrabold text-ink">{form.profileLegend}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {PROFILES.map((value) => {
            const Icon = value === "seeker" ? GraduationIcon : UsersIcon;
            const selected = profile === value;
            return (
              <label
                key={value}
                className={`relative flex cursor-pointer items-start gap-3.5 rounded-card border-2 p-5 transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal/20 ${
                  selected ? "border-royal bg-royal-soft/50" : "border-ink/5 bg-paper hover:border-ink/15"
                }`}
              >
                <input
                  type="radio"
                  name="profile"
                  value={value}
                  checked={selected}
                  onChange={() => setProfile(value)}
                  className="sr-only"
                  aria-describedby={errors.profile ? "profile-error" : undefined}
                />
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    selected ? "bg-royal text-white" : "bg-white text-ink shadow-soft"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-extrabold text-ink">{form.profiles[value].title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-500">
                    {form.profiles[value].description}
                  </span>
                </span>
                {selected && (
                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-royal text-white"><CheckIcon className="h-3.5 w-3.5" strokeWidth={3} /></span>
                )}
              </label>
            );
          })}
        </div>
        {errors.profile && (
          <p id="profile-error" className="mt-2 text-sm font-semibold text-raspberry">{errors.profile}</p>
        )}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="need" className="font-display text-base font-extrabold text-ink">{form.needLabel}</label>
          <select
            id="need"
            name="need"
            value={need}
            onChange={(event) => setNeed(event.target.value as Need | "")}
            aria-invalid={Boolean(errors.need)}
            aria-describedby={errors.need ? "need-error" : undefined}
            className={`${inputBase} ${inputState("need")} ${need ? "" : "text-slate-400"}`}
          >
            <option value="" disabled>{form.needPlaceholder}</option>
            {NEEDS.map((value) => (
              <option key={value} value={value} className="text-ink">{form.needs[value]}</option>
            ))}
          </select>
          {errors.need && <p id="need-error" className="mt-2 text-sm font-semibold text-raspberry">{errors.need}</p>}
        </div>

        <div>
          <label htmlFor="email" className="font-display text-base font-extrabold text-ink">{form.emailLabel}</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={form.emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputBase} ${inputState("email")}`}
          />
          {errors.email && <p id="email-error" className="mt-2 text-sm font-semibold text-raspberry">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="font-display text-base font-extrabold text-ink">{form.messageLabel}</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={profile === "mentor" ? form.messagePlaceholderMentor : form.messagePlaceholderSeeker}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputBase} ${inputState("message")} resize-y leading-relaxed`}
        />
        {errors.message && <p id="message-error" className="mt-2 text-sm font-semibold text-raspberry">{errors.message}</p>}
      </div>

      {(status === "error" || status === "notConfigured") && (
        <p role="alert" className="rounded-2xl bg-raspberry-soft px-5 py-4 text-sm font-semibold text-raspberry-dark">
          {status === "error" ? form.errors.submit : form.errors.notConfigured}
        </p>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate-500 sm:max-w-xs">{form.privacy}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`${BUTTON_BASE} ${BUTTON_VARIANTS.cta} px-8 text-base disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70`}
        >
          {status === "submitting" && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
          )}
          {status === "submitting" ? form.submitting : form.submit}
        </button>
      </div>
    </form>
  );
}
