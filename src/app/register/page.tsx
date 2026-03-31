"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.clubadmin.domainrental.in/api";
const REGISTRATION_SLUG = process.env.NEXT_PUBLIC_REGISTRATION_SLUG || "rulers-basketball-academy";
const UPLOAD_API_URL = "https://uploadthing.domainrental.in/api/upload";
const UPLOAD_API_TOKEN = "95c04925d42febc574853d490cd6d35fcb267c39f1eecb0b692f4e3cea8c35f9";

interface Plan {
  key: string;
  name: string;
  duration: number;
  price: number;
}

interface FormData {
  // Required
  parentName: string;
  phone: string;
  childName: string;
  childPhoto: File | null;

  // Optional
  email: string;
  childDOB: string;
  childGender: string;
  childGrade: string;
  childBloodGroup: string;
  address: string;
  fatherName: string;
  motherName: string;
  fatherMobile: string;
  motherMobile: string;
  selectedPlan: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialForm: FormData = {
  parentName: "",
  phone: "",
  childName: "",
  childPhoto: null,
  email: "",
  childDOB: "",
  childGender: "",
  childGrade: "",
  childBloodGroup: "",
  address: "",
  fatherName: "",
  motherName: "",
  fatherMobile: "",
  motherMobile: "",
  selectedPlan: "",
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.parentName.trim())
    errors.parentName = "Parent/Guardian name is required";
  else if (data.parentName.trim().length < 3)
    errors.parentName = "Name must be at least 3 characters";

  if (!data.phone.trim()) errors.phone = "Phone number is required";
  else if (data.phone.replace(/\D/g, "").length !== 10)
    errors.phone = "Enter a valid 10-digit phone number";

  if (!data.childName.trim()) errors.childName = "Child's name is required";
  else if (data.childName.trim().length < 2)
    errors.childName = "Name must be at least 2 characters";

  // Optional field validations
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address";

  if (data.fatherMobile.trim() && data.fatherMobile.replace(/\D/g, "").length !== 10)
    errors.fatherMobile = "Enter a valid 10-digit phone number";

  if (data.motherMobile.trim() && data.motherMobile.replace(/\D/g, "").length !== 10)
    errors.motherMobile = "Enter a valid 10-digit phone number";

  return errors;
}

function PaymentSection() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="mb-10">
      <h2 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-secondary mb-1 flex items-center gap-2">
        <i className="fas fa-qrcode text-primary" />
        Payment
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Click the button below to view payment details
      </p>

      {!showQR ? (
        <button
          type="button"
          onClick={() => setShowQR(true)}
          className="w-full flex items-center justify-center gap-3 px-7 py-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
            <i className="fas fa-eye" />
          </div>
          <span className="font-[family-name:var(--font-oswald)] text-[1rem] text-gray-600 tracking-[0.5px] group-hover:text-primary transition-colors">
            Show Payment Details
          </span>
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4 p-8 bg-gray-50 rounded-xl border border-gray-200 animate-fade-in">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <Image
              src="/images/qr-code.jpeg"
              alt="Payment QR Code"
              width={250}
              height={400}
              className="w-auto h-auto max-w-[250px]"
            />
          </div>
          <div className="text-center">
            <p className="font-[family-name:var(--font-oswald)] text-secondary text-[1rem] tracking-[0.5px]">
              Scan to Pay
            </p>
            <p className="text-gray-400 text-sm mt-1">
              UPI / Google Pay / PhonePe / Paytm
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowQR(false)}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
          >
            <i className="fas fa-eye-slash mr-1" /> Hide payment details
          </button>
        </div>
      )}
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);

  // Fetch subscription plans on mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${API_URL}/public/register/${REGISTRATION_SLUG}`);
        if (res.ok) {
          const data = await res.json();
          setPlans(data.plans || []);
        }
      } catch {
        // Plans fetch failed silently — selection will just not appear
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched.has(name)) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          childPhoto: "Please upload an image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          childPhoto: "Photo must be less than 5MB",
        }));
        return;
      }
      setForm((prev) => ({ ...prev, childPhoto: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, childPhoto: "" }));
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    setTouched(new Set(Object.keys(form)));

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setApiError("");

    try {
      // Upload child photo if present
      let childPhotoUrl: string | undefined;
      if (form.childPhoto) {
        const uploadForm = new window.FormData();
        uploadForm.append("file", form.childPhoto);
        const uploadRes = await fetch(UPLOAD_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${UPLOAD_API_TOKEN}`,
            "X-Project-Name": "rulers-basketball-academy",
          },
          body: uploadForm,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          childPhotoUrl = uploadData.file?.publicUrl;
        } else {
          console.error("Photo upload failed:", uploadRes.status);
        }
      }

      const payload = {
        name: form.parentName.trim(),
        phone: form.phone.replace(/\D/g, ""),
        email: form.email.trim() || undefined,
        address: form.address.trim() || undefined,
        isChildMember: true,
        childName: form.childName.trim(),
        childDOB: form.childDOB || undefined,
        childGender: form.childGender || undefined,
        childGrade: form.childGrade.trim() || undefined,
        childBloodGroup: form.childBloodGroup || undefined,
        childPhoto: childPhotoUrl,
        fatherName: form.fatherName.trim() || undefined,
        motherName: form.motherName.trim() || undefined,
        fatherMobile: form.fatherMobile.replace(/\D/g, "") || undefined,
        motherMobile: form.motherMobile.replace(/\D/g, "") || undefined,
        preferredBatch: form.selectedPlan || undefined,
      };

      const response = await fetch(
        `${API_URL}/public/register/${REGISTRATION_SLUG}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Failed to submit registration" }));
        throw new Error(error.message);
      }

      setSubmitted(true);
    } catch (err) {
      setApiError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 font-sans text-[0.95rem] text-gray-800 bg-gray-100 border-2 rounded-lg outline-none transition-all duration-300 focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(249,115,22,0.1)] ${
      errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
        <div className="text-center py-20">
          <div className="text-[4rem] text-green-500 mb-6">
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
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1rem] font-medium tracking-[1px] uppercase rounded-lg transition-all duration-300 hover:bg-primary-dark"
          >
            <i className="fas fa-home" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary to-dark py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <i className="fas fa-arrow-left" /> Back to Home
          </Link>
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-[clamp(2.2rem,5vw,3.2rem)] text-white tracking-[2px] leading-tight mb-3">
            Player <span className="text-primary">Registration</span>
          </h1>
          <p className="text-white/60 text-[1.05rem] max-w-[500px] mx-auto">
            Register your child to begin their basketball journey with Rulers
            Basketball Academy
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-5 -mt-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-16"
        >
          {/* Section: Child Details */}
          <div className="mb-10">
            <h2 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-secondary mb-1 flex items-center gap-2">
              <i className="fas fa-child text-primary" />
              Child Details
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Information about the player being registered
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Child Name */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-user text-primary text-[0.85rem]" />
                  Child&apos;s Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="childName"
                  value={form.childName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter child's full name"
                  className={inputClass("childName")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.childName}
                </span>
              </div>

              {/* Child DOB */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-birthday-cake text-primary text-[0.85rem]" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="childDOB"
                  value={form.childDOB}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("childDOB")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.childDOB}
                </span>
              </div>

              {/* Child Gender */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-venus-mars text-primary text-[0.85rem]" />
                  Gender
                </label>
                <select
                  name="childGender"
                  value={form.childGender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("childGender")}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.childGender}
                </span>
              </div>

              {/* Child Grade */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-graduation-cap text-primary text-[0.85rem]" />
                  Grade / Class
                </label>
                <input
                  type="text"
                  name="childGrade"
                  value={form.childGrade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 5th Grade"
                  className={inputClass("childGrade")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.childGrade}
                </span>
              </div>

              {/* Blood Group */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-tint text-primary text-[0.85rem]" />
                  Blood Group
                </label>
                <select
                  name="childBloodGroup"
                  value={form.childBloodGroup}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("childBloodGroup")}
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.childBloodGroup}
                </span>
              </div>

              {/* Child Photo */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-camera text-primary text-[0.85rem]" />
                  Child&apos;s Photo
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full px-4 py-3 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 flex items-center gap-4 ${
                    errors.childPhoto ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Child preview"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400">
                      <i className="fas fa-image text-xl" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {form.childPhoto
                        ? form.childPhoto.name
                        : "Click to upload photo"}
                    </p>
                    <p className="text-xs text-gray-400">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.childPhoto}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-10" />

          {/* Section: Parent / Guardian Details */}
          <div className="mb-10">
            <h2 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-secondary mb-1 flex items-center gap-2">
              <i className="fas fa-user-shield text-primary" />
              Parent / Guardian Details
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Primary contact information
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Parent Name */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-user text-primary text-[0.85rem]" />
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
              <div className="mb-1">
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
                <p className="text-gray-400 text-xs mt-0.5">
                  <i className="fab fa-whatsapp text-green-500 mr-1" />
                  This number will be used for WhatsApp communications
                </p>
              </div>

              {/* Email */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-envelope text-primary text-[0.85rem]" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter email address"
                  className={inputClass("email")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.email}
                </span>
              </div>

              {/* Address */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-map-marker-alt text-primary text-[0.85rem]" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your address"
                  className={inputClass("address")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.address}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-10" />

          {/* Section: Additional Parent Details */}
          <div className="mb-10">
            <h2 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-secondary mb-1 flex items-center gap-2">
              <i className="fas fa-users text-primary" />
              Additional Parent Details
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Optional — provide if different from primary contact
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Father Name */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-male text-primary text-[0.85rem]" />
                  Father&apos;s Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter father's name"
                  className={inputClass("fatherName")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.fatherName}
                </span>
              </div>

              {/* Father Mobile */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-phone-alt text-primary text-[0.85rem]" />
                  Father&apos;s Mobile
                </label>
                <input
                  type="tel"
                  name="fatherMobile"
                  value={form.fatherMobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter 10-digit phone number"
                  className={inputClass("fatherMobile")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.fatherMobile}
                </span>
              </div>

              {/* Mother Name */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-female text-primary text-[0.85rem]" />
                  Mother&apos;s Name
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={form.motherName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter mother's name"
                  className={inputClass("motherName")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.motherName}
                </span>
              </div>

              {/* Mother Mobile */}
              <div className="mb-1">
                <label className="flex items-center gap-1.5 font-[family-name:var(--font-oswald)] text-[0.9rem] font-medium text-gray-600 mb-2 tracking-[0.5px]">
                  <i className="fas fa-phone-alt text-primary text-[0.85rem]" />
                  Mother&apos;s Mobile
                </label>
                <input
                  type="tel"
                  name="motherMobile"
                  value={form.motherMobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter 10-digit phone number"
                  className={inputClass("motherMobile")}
                />
                <span className="block text-[0.8rem] text-red-500 mt-1 min-h-[20px]">
                  {errors.motherMobile}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200 mb-10" />

          {/* Section: Select Plan */}
          {!plansLoading && plans.length > 0 && (
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-oswald)] text-[1.3rem] text-secondary mb-1 flex items-center gap-2">
                <i className="fas fa-basketball-ball text-primary" />
                Select Plan
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Choose your preferred subscription plan
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.key}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        selectedPlan: prev.selectedPlan === plan.key ? "" : plan.key,
                      }))
                    }
                    className={`relative p-5 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer group ${
                      form.selectedPlan === plan.key
                        ? "border-primary bg-primary/5 shadow-[0_0_0_4px_rgba(249,115,22,0.1)]"
                        : "border-gray-200 bg-gray-50 hover:border-primary/40 hover:bg-primary/[0.02]"
                    }`}
                  >
                    {form.selectedPlan === plan.key && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <i className="fas fa-check text-white text-xs" />
                      </div>
                    )}
                    <p
                      className={`font-[family-name:var(--font-oswald)] text-[1.1rem] tracking-[0.5px] mb-1 ${
                        form.selectedPlan === plan.key ? "text-primary" : "text-secondary"
                      }`}
                    >
                      {plan.name}
                    </p>
                    <p className="text-gray-400 text-sm mb-3">
                      {plan.duration} {plan.duration === 1 ? "month" : "months"}
                    </p>
                    <p
                      className={`font-[family-name:var(--font-bebas-neue)] text-[1.6rem] tracking-[1px] ${
                        form.selectedPlan === plan.key ? "text-primary" : "text-secondary"
                      }`}
                    >
                      &#8377;{plan.price.toLocaleString("en-IN")}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {!plansLoading && plans.length > 0 && (
            <hr className="border-gray-200 mb-10" />
          )}

          {/* Section: Payment QR Code */}
          <PaymentSection />

          {/* API Error */}
          {apiError && (
            <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[0.9rem]">
              <i className="fas fa-exclamation-circle text-[1.1rem]" />
              {apiError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 px-9 py-4 bg-primary text-white font-[family-name:var(--font-oswald)] text-[1.05rem] font-medium tracking-[1px] uppercase rounded-lg border-2 border-primary cursor-pointer transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(249,115,22,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Submitting... This may take a few seconds
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane" /> Submit Registration
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
