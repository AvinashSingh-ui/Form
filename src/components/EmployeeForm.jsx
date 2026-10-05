import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import "../App.css";

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(20, { message: "First name must be at most 20 characters" }),

  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" })
    .max(20, { message: "Last name must be at most 20 characters" }),

  email: z
    .string()
    .email({ message: "Enter a valid email address" }),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, {
      message: "Phone number must contain exactly 10 digits",
    }),

  skills: z.array(
    z.object({
      name: z
        .string()
        .min(2, { message: "Skill name must be at least 2 characters" }),
      experience: z
        .string()
        .min(1, { message: "Experience is required" }),
    })
  ),
});

function EmployeeForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [{ name: "", experience: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = async (data) => {
    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">

        {/* ── Header ── */}
        <div className="form-header">
          <div className="form-header-icon">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <h1 className="form-title">Employee Registration</h1>
          <p className="form-subtitle">Fill in the details below to register a new employee</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* ── Personal Info Section ── */}
          <div className="section-divider">
            <span className="section-divider-line"></span>
            <span className="section-label">
              <i className="fa-solid fa-circle-info" style={{ marginRight: 6 }}></i>
              Personal Info
            </span>
            <span className="section-divider-line"></span>
          </div>

          <div className="form-grid-2">
            {/* First Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                <i className="fa-solid fa-user"></i>
                First Name
              </label>
              <div className="input-wrapper">
                <i className="fa-solid fa-id-card input-prefix-icon"></i>
                <input
                  id="firstName"
                  className={`form-input${errors.firstName ? " input-error" : ""}`}
                  placeholder="e.g. Avinash"
                  {...register("firstName")}
                />
              </div>
              {errors.firstName && (
                <span className="error-msg" role="alert">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                <i className="fa-solid fa-user"></i>
                Last Name
              </label>
              <div className="input-wrapper">
                <i className="fa-solid fa-id-card input-prefix-icon"></i>
                <input
                  id="lastName"
                  className={`form-input${errors.lastName ? " input-error" : ""}`}
                  placeholder="e.g. Singh"
                  {...register("lastName")}
                />
              </div>
              {errors.lastName && (
                <span className="error-msg" role="alert">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          {/* ── Contact Info Section ── */}
          <div className="section-divider">
            <span className="section-divider-line"></span>
            <span className="section-label">
              <i className="fa-solid fa-address-book" style={{ marginRight: 6 }}></i>
              Contact Info
            </span>
            <span className="section-divider-line"></span>
          </div>

          <div className="form-grid-2">
            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
                Email Address
              </label>
              <div className="input-wrapper">
                <i className="fa-solid fa-at input-prefix-icon"></i>
                <input
                  id="email"
                  type="email"
                  className={`form-input${errors.email ? " input-error" : ""}`}
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className="error-msg" role="alert">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                <i className="fa-solid fa-phone"></i>
                Phone Number
              </label>
              <div className="input-wrapper">
                <i className="fa-solid fa-mobile-screen input-prefix-icon"></i>
                <input
                  id="phone"
                  type="tel"
                  className={`form-input${errors.phone ? " input-error" : ""}`}
                  placeholder="10-digit number"
                  maxLength={10}
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <span className="error-msg" role="alert">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* ── Skills Section ── */}
          <div className="section-divider">
            <span className="section-divider-line"></span>
            <span className="section-label">
              <i className="fa-solid fa-code" style={{ marginRight: 6 }}></i>
              Skills
            </span>
            <span className="section-divider-line"></span>
          </div>

          <div className="skills-header">
            <h2 className="skills-heading">
              <i className="fa-solid fa-layer-group"></i>
              Technical Skills
              <span className="skill-count-badge">{fields.length}</span>
            </h2>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="skill-row">
              {/* Skill Name */}
              <div className="form-group">
                <label className="form-label" htmlFor={`skill-name-${index}`}>
                  <i className="fa-solid fa-tag"></i>
                  Skill Name
                </label>
                <div className="input-wrapper">
                  <i className="fa-brands fa-react input-prefix-icon"></i>
                  <input
                    id={`skill-name-${index}`}
                    className={`form-input${errors.skills?.[index]?.name ? " input-error" : ""}`}
                    placeholder="e.g. React"
                    {...register(`skills.${index}.name`)}
                  />
                </div>
                {errors.skills?.[index]?.name && (
                  <span className="error-msg" role="alert">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors.skills[index].name.message}
                  </span>
                )}
              </div>

              {/* Experience */}
              <div className="form-group">
                <label className="form-label" htmlFor={`skill-exp-${index}`}>
                  <i className="fa-solid fa-clock"></i>
                  Experience
                </label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-calendar-days input-prefix-icon"></i>
                  <input
                    id={`skill-exp-${index}`}
                    className={`form-input${errors.skills?.[index]?.experience ? " input-error" : ""}`}
                    placeholder="e.g. 2 years"
                    {...register(`skills.${index}.experience`)}
                  />
                </div>
                {errors.skills?.[index]?.experience && (
                  <span className="error-msg" role="alert">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors.skills[index].experience.message}
                  </span>
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                className="btn-remove"
                onClick={() => remove(index)}
                aria-label={`Remove skill ${index + 1}`}
                title="Remove skill"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}

          {/* Add Skill Button */}
          <button
            type="button"
            id="add-skill-btn"
            className="btn-add-skill"
            onClick={() => append({ name: "", experience: "" })}
          >
            <i className="fa-solid fa-plus"></i>
            Add Another Skill
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            id="submit-btn"
            className="btn-submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Submitting…
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i>
                Submit Registration
              </>
            )}
          </button>

          {/* Success Toast */}
          {submitted && (
            <div className="success-toast" role="status" aria-live="polite">
              <i className="fa-solid fa-circle-check"></i>
              Employee registered successfully! Data logged to console.
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;