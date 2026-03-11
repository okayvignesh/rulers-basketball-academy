"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

interface FormData {
  fullName: string;
  age: string;
  parentName: string;
  phone: string;
  email: string;
  experience: string;
  batch: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialForm: FormData = {
  fullName: "",
  age: "",
  parentName: "",
  phone: "",
  email: "",
  experience: "",
  batch: "",
  message: "",
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  else if (data.fullName.trim().length < 3)
    errors.fullName = "Name must be at least 3 characters";

  if (!data.age) errors.age = "Age is required";
  else {
    const age = parseInt(data.age);
    if (isNaN(age) || age < 5 || age > 50)
      errors.age = "Enter a valid age (5-50)";
  }

  if (!data.parentName.trim())
    errors.parentName = "Parent/Guardian name is required";
  else if (data.parentName.trim().length < 3)
    errors.parentName = "Name must be at least 3 characters";

  if (!data.phone.trim()) errors.phone = "Phone number is required";
  else if (data.phone.replace(/\D/g, "").length !== 10)
    errors.phone = "Enter a valid 10-digit phone number";

  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";

  if (!data.experience)
    errors.experience = "Please select an experience level";
  if (!data.batch) errors.batch = "Please select a preferred batch";

  return errors;
}

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error on input if field was touched
    if (touched.has(name)) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name } = e.target;
    setTouched((prev) => new Set(prev).add(name));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] || "" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    setTouched(
      new Set(Object.keys(form))
    );

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section id="register-form" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center py-20">
            <div className="text-[4rem] text-green-500 mb-6 animate-scale-in">
              <i className="fas fa-check-circle" />
            </div>
            <h3 className="font-[family-name:var(--font-oswald)] text-[1.8rem] text-secondary mb-3">
              Registration Successful!
            </h3>
            <p className="text-gray-500 mb-8 max-w-[500px] mx-auto">
              Thank you for registering with Rulers Basketball Academy. Our team
              will contact you within 24 hours to confirm your enrollment.
            </p>
            <Link
              href="#home"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1rem] font-medium tracking-[1px] uppercase rounded-lg transition-all duration-300 hover:bg-primary-dark"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 font-sans text-[0.95rem] text-gray-800 bg-gray-100 border-2 rounded-lg outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)] ${
      errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  return (
    <section id="register-form" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium tracking-[1px] uppercase rounded-full mb-4">
            <i className="fas fa-edit" /> Enroll
          </span>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-secondary tracking-[2px] leading-tight mb-3">
            Registration <span className="text-primary">Form</span>
          </h2>
          <p className="text-[1.05rem] text-gray-500 max-w-[600px] mx-auto">
            Fill out the form below to begin your basketball journey
          </p>
        </div>

        {/* Form Wrapper */}
        <div className="grid lg:grid-cols-[1fr_2fr] bg-white rounded-3xl overflow-hidden shadow-xl">
          {/* Sidebar */}
          <div className="bg-gradient-to-br from-secondary to-dark p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div>
              <h3 className="font-[family-name:var(--font-oswald)] text-[1.6rem] mb-4 flex items-center gap-3">
                <i className="fas fa-basketball-ball text-primary" />
                Ready to Start?
              </h3>
              <p className="text-[0.95rem] text-white/65 leading-relaxed mb-8">
                Join Rulers Basketball Academy and take the first step toward
                becoming a champion. Fill out the form and our team will get
                back to you within 24 hours.
              </p>
              <div className="flex flex-col gap-4 mb-10">
                <div className="flex items-center gap-3 text-[0.9rem] text-white/70">
                  <i className="fas fa-phone-alt text-primary w-5 text-center" />
                  <span>+91 98854 75372</span>
                </div>
                <div className="flex items-center gap-3 text-[0.9rem] text-white/70">
                  <i className="fas fa-envelope text-primary w-5 text-center" />
                  <span>sitabavanikoti@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-[0.9rem] text-white/70">
                  <i className="fas fa-map-marker-alt text-primary w-5 text-center" />
                  <span>Miyapur, Hyderabad</span>
                </div>
              </div>
            </div>
            <div className="text-[8rem] text-primary/[0.06] text-center hidden lg:block">
              <i className="fas fa-basketball-ball" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-5 mb-1">
              {/* Full Name */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-user text-primary text-[0.85rem]" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={inputClass("fullName")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.fullName}
                </span>
              </div>

              {/* Age */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-birthday-cake text-primary text-[0.85rem]" />
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your age"
                  min="5"
                  max="50"
                  className={inputClass("age")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.age}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-1">
              {/* Parent Name */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-user-shield text-primary text-[0.85rem]" />
                  Parent/Guardian Name{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={form.parentName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter parent/guardian name"
                  className={inputClass("parentName")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.parentName}
                </span>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-phone text-primary text-[0.85rem]" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter 10-digit phone number"
                  className={inputClass("phone")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.phone}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-1">
              {/* Email */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-envelope text-primary text-[0.85rem]" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={inputClass("email")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.email}
                </span>
              </div>

              {/* Experience Level */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-chart-line text-primary text-[0.85rem]" />
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("experience")}
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.experience}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-1">
              {/* Preferred Batch */}
              <div className="mb-3">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-clock text-primary text-[0.85rem]" />
                  Preferred Batch <span className="text-red-500">*</span>
                </label>
                <select
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("batch")}
                >
                  <option value="">Select preferred batch</option>
                  <option value="early-morning">
                    Early Morning (5:30 AM - 7:00 AM)
                  </option>
                  <option value="morning">Morning (6:00 AM - 8:00 AM)</option>
                  <option value="evening">Evening (5:00 PM - 7:00 PM)</option>
                  <option value="weekend">
                    Weekend Special (7:00 AM - 10:00 AM)
                  </option>
                </select>
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.batch}
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="mb-5">
              <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                <i className="fas fa-comment-alt text-primary text-[0.85rem]" />
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Any additional information or questions..."
                className="w-full px-4 py-3 font-sans text-[0.95rem] text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)] resize-y min-h-[100px]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 px-9 py-4 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1.05rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-primary cursor-pointer transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)]"
            >
              <i className="fas fa-paper-plane" /> Submit Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
