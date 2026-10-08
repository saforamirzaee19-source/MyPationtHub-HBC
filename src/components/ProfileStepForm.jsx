import { useState } from "react";
import { Check, HeartPulse, UserRoundPlus } from "lucide-react";

const DEFAULT_STEPS = [
  {
    label: "Dependents Registration",
    title: "Let's start with the basic information",
    subtitle: "Enter the dependent's name and basic details.",
    rows: [],
  },
];

const inputCls =
  "w-full min-h-[50px] rounded-[10px] border border-[#d6dae3] bg-white px-4 py-3 " +
  "text-[#2d3e5f] placeholder:text-[#a3acbf] outline-none transition " +
  "focus:border-[#a51567] focus:ring-2 focus:ring-[#a51567]/15";

function Field({ field, value, error, onChange }) {
  const id = `dependent-${field.name}`;
  const controlClass =
    field.type === "textarea"
      ? `${inputCls} min-h-32 resize-y`
      : inputCls;

  return (
    <div className="min-w-0 flex-1 basis-[220px]">
      <label
        htmlFor={id}
        className="mb-3 ml-1 block text-sm font-bold text-[#2d3e5f]"
      >
        {field.label}
        {field.required && <span className="ml-1 text-[#a51567]">*</span>}
      </label>
      {field.type === "select" ? (
        <div className="relative">
          <select
            id={id}
            value={value ?? ""}
            onChange={(event) => onChange(field.name, event.target.value)}
            className={`${controlClass} appearance-none pr-10 ${
              value ? "" : "text-[#a3acbf]"
            }`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            <option value="" disabled>
              {field.placeholder ?? "Select"}
            </option>
            {(field.options ?? []).map((option) => {
              const optionValue =
                typeof option === "string" ? option : option.value;
              const optionLabel =
                typeof option === "string" ? option : option.label;
              return (
                <option key={optionValue} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            stroke="#2d3e5f"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M1 1l5 5 5-5" />
          </svg>
        </div>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          className={controlClass}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={field.type ?? "text"}
          className={controlClass}
          placeholder={field.placeholder}
          value={value ?? ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="ml-1 mt-1.5 text-xs text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function ProfileStepForm({
  title = "Build Your Profile",
  subtitle = "Keep the people you care for connected to their health information and care plan.",
  steps = DEFAULT_STEPS,
  currentStep = 0,
  initialValues = {},
  nextLabel = "NEXT",
  backLabel = "BACK",
  finishLabel = "FINISH",
  onChange,
  onNext,
  onBack,
  onStepChange,
  onFinish,
  className = "",
}) {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const step = steps[activeStep] ?? DEFAULT_STEPS[0];
  const stepLabel = typeof step === "string" ? step : step.label;
  const stepTitle = typeof step === "string" ? step : step.title ?? step.label;
  const stepSubtitle =
    typeof step === "string"
      ? "Enter the information for this step."
      : step.subtitle;
  const values = formData[activeStep] ?? {};
  const lastStep = activeStep === steps.length - 1;

  const updateField = (name, value) => {
    const nextStepValues = { ...values, [name]: value };
    const nextFormData = { ...formData, [activeStep]: nextStepValues };
    setFormData(nextFormData);
    onChange?.(nextFormData);
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }));
  };

  const changeStep = (nextStep) => {
    setActiveStep(nextStep);
    setErrors({});
    onStepChange?.(nextStep);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fields = (step.rows ?? []).flat();
    const nextErrors = {};
    fields.forEach((field) => {
      if (field.required && !String(values[field.name] ?? "").trim()) {
        nextErrors[field.name] = "This field is required";
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const nextFormData = {
      ...formData,
      [activeStep]: values,
    };

    if (lastStep) {
      setFormData(nextFormData);
      setIsComplete(true);
      onFinish?.(nextFormData);
      onNext?.(nextFormData);
      return;
    }

    onNext?.(nextFormData);
    changeStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onBack?.(formData);
      return;
    }
    onBack?.(formData);
    changeStep(activeStep - 1);
  };

  return (
    <div
      className={`dependent-profile relative overflow-hidden bg-white px-4 pb-12 pt-8 font-['Roboto',system-ui,sans-serif] text-[#2d3e5f] ${className}`}
    >
      <header className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#a51567,#8a153a,#a2306b,#a90f57)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm">
          <UserRoundPlus size={16} aria-hidden="true" />
          Family care
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#243453] max-sm:text-2xl">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#71809a] sm:text-lg">
          {subtitle}
        </p>
      </header>

      <ol
        aria-label="Dependent registration progress"
        className="mx-auto mb-8 mt-8 flex max-w-[900px] list-none px-0 sm:mb-10 sm:mt-10"
      >
        {steps.map((item, index) => {
          const reached = index <= activeStep;
          const label = typeof item === "string" ? item : item.label;
          return (
            <li
              key={label}
              aria-current={index === activeStep ? "step" : undefined}
              className="relative min-w-0 flex-1 text-center"
            >
              {index > 0 && (
                <span
                  className={`absolute right-1/2 top-[9px] h-0.5 w-full ${
                    reached
                      ? "bg-[linear-gradient(120deg,#a51567,#8a153a,#a2306b,#a90f57)]"
                      : "bg-[#d9dde6]"
                  }`}
                />
              )}
              <span
                className={`relative z-10 mx-auto mb-3.5 grid h-5 w-5 place-items-center rounded-full border text-white ${
                  reached
                    ? "border-white bg-[linear-gradient(120deg,#a51567,#8a153a,#a2306b,#a90f57)] ring-4 ring-[#a51567]/15"
                    : "border-[#d9dde6] bg-white"
                }`}
              >
                {index < activeStep && <Check size={11} aria-hidden="true" />}
              </span>
              <span
                className={`block px-1 text-xs leading-5 sm:text-sm ${
                  reached ? "font-semibold text-[#2d3e5f]" : "text-[#8793a8]"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {isComplete ? (
        <section
          aria-live="polite"
          className="mx-auto max-w-[960px] rounded-3xl border border-[#e9edf2] bg-white px-5 py-12 text-center shadow-[0_18px_55px_rgba(45,62,95,0.09)] sm:px-8"
        >
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(120deg,#a51567,#8a153a,#a2306b,#a90f57)] text-white">
            <Check size={28} aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-[#243453]">
            Registration complete
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#7b88a8]">
            All dependent details have been collected.
          </p>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto max-w-[960px] rounded-3xl border border-[#e9edf2] bg-white px-5 pb-6 pt-7 shadow-[0_18px_55px_rgba(45,62,95,0.09)] sm:px-8 sm:pb-8 sm:pt-9"
        >
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(120deg,#a51567,#8a153a,#a2306b,#a90f57)] text-white">
            <HeartPulse size={24} aria-hidden="true" />
          </div>
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-[#a51567]">
            Step {activeStep + 1} of {steps.length}
          </p>
          <h2 className="text-center text-xl font-bold tracking-tight text-[#243453] sm:text-2xl">
            {stepTitle}
          </h2>
          {stepSubtitle && (
            <p className="mx-auto mb-8 mt-2 max-w-2xl text-center text-sm leading-6 text-[#7b88a8] sm:mb-10 sm:text-base">
              {stepSubtitle}
            </p>
          )}

          <div className="space-y-7">
            {(step.rows ?? []).map((row, rowIndex) => (
              <div key={`${stepLabel}-${rowIndex}`} className="flex flex-wrap gap-5">
                {row.map((field) => (
                  <Field
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    error={errors[field.name]}
                    onChange={updateField}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-9 flex justify-between gap-3 border-t border-[#edf0f4] pt-6">
            {activeStep > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="h-[50px] min-w-[100px] rounded-[10px] border border-[#d6dae3] bg-white px-6 font-bold text-[#2d3e5f] transition hover:border-[#a51567] hover:text-[#a51567] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#4fd1f5]"
              >
                {backLabel}
              </button>
            ) : (
              <span />
            )}
            <button
              type="submit"
              className="h-[50px] min-w-[120px] rounded-[10px] bg-gradient-to-br from-[#34406a] to-[#1f2340] px-6 font-bold text-white shadow-[0_6px_14px_rgba(31,35,64,0.3)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#4fd1f5]"
            >
              {lastStep ? finishLabel : nextLabel}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
