"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleNotch, CheckCircle, WhatsappLogo, EnvelopeSimple, Clock } from "@phosphor-icons/react";
import { FloatingInput, FloatingSelect } from "@/components/ui/Input";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_CONFIG } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import { useLang } from "@/lib/LanguageContext";

type State = "idle" | "loading" | "success" | "error";

interface Fields {
  nombre: string;
  email: string;
  whatsapp: string;
  negocio: string;
}
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { t } = useLang();
  const c = t.contact;

  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [fields, setFields] = useState<Fields>({ nombre: "", email: "", whatsapp: "", negocio: "" });

  function validate(f: Fields): Errors {
    const e: Errors = {};
    if (!f.nombre.trim()) e.nombre = c.errors.nombre;
    if (!EMAIL_RE.test(f.email.trim())) e.email = c.errors.email;
    if (f.whatsapp.replace(/\D/g, "").length < 7) e.whatsapp = c.errors.whatsapp;
    if (!f.negocio) e.negocio = c.errors.negocio;
    return e;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    setErrors((p) => (p[name as keyof Fields] ? { ...p, [name]: undefined } : p));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setState("loading");
    const label = c.businessTypes.find((b) => b.value === fields.negocio)?.label ?? fields.negocio;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: fields.nombre.trim(),
          email: fields.email.trim(),
          whatsapp: fields.whatsapp.trim(),
          negocio: label,
        }),
      });
      const data: { success?: boolean } = await res.json();
      setState(data.success ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section id="contacto" className="mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — form */}
        <div>
          <SectionHeading
            eyebrow={c.eyebrow}
            title={c.title}
            subtitle={c.subtitle}
          />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center rounded-[2rem] border border-accent/20 bg-accent-muted p-12 text-center"
                >
                  <CheckCircle size={48} weight="fill" className="text-accent" />
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">{c.successTitle}</h3>
                  <p className="mt-2 max-w-sm text-muted">{c.successMsg}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col gap-4"
                >
                  {state === "error" && (
                    <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                      {c.errorMsg}
                    </p>
                  )}
                  <FloatingInput id="nombre" name="nombre" label={c.fields.nombre} value={fields.nombre} onChange={onChange} error={errors.nombre} disabled={state === "loading"} />
                  <FloatingInput id="email" name="email" type="email" label={c.fields.email} value={fields.email} onChange={onChange} error={errors.email} disabled={state === "loading"} />
                  <FloatingInput id="whatsapp" name="whatsapp" type="tel" label={c.fields.whatsapp} value={fields.whatsapp} onChange={onChange} error={errors.whatsapp} disabled={state === "loading"} />
                  <FloatingSelect id="negocio" name="negocio" label={c.fields.negocio} value={fields.negocio} onChange={onChange} error={errors.negocio} disabled={state === "loading"}>
                    <option value="" disabled />
                    {c.businessTypes.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </FloatingSelect>

                  <motion.button
                    type="submit"
                    disabled={state === "loading"}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
                  >
                    {state === "loading" ? (
                      <>
                        <CircleNotch size={18} className="animate-spin" weight="bold" /> {c.submitLoading}
                      </>
                    ) : (
                      <>
                        <WhatsappLogo size={18} weight="fill" /> {c.submitIdle}
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right — contact info */}
        <div className="flex flex-col justify-center gap-5 rounded-[2rem] border border-border bg-card p-8 md:p-10">
          <h3 className="text-xl font-semibold tracking-tight">{c.directContact}</h3>
          {[
            { Icon: WhatsappLogo, label: "WhatsApp", value: SITE_CONFIG.phone, href: whatsappUrl("Hola Pierre, quiero más información") },
            { Icon: EnvelopeSimple, label: "Email", value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
            { Icon: Clock, label: c.hoursLabel, value: SITE_CONFIG.hours },
          ].map(({ Icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-muted text-accent">
                <Icon size={22} weight="duotone" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-medium text-foreground hover:text-accent-dark">
                    {value}
                  </a>
                ) : (
                  <p className="font-medium text-foreground">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
