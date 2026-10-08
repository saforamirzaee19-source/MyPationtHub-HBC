import React from "react";
import AppShell, { SiteFooter } from "../components/AppShell.jsx";
import useLegacyScript from "../hooks/useLegacyScript.js";
import ProfileStepForm from "../components/ProfileStepForm.jsx";

const basicRows = [
  [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Eg. Michael",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Eg. Tomson",
      required: true,
    },
  ],
  [{ name: "birthDate", type: "date", label: "Birth Date" }],
  [
    {
      name: "relation",
      type: "select",
      label: "Relation",
      placeholder: "Select relationship",
      options: ["Parent", "Child", "Spouse", "Sibling", "Other"],
      required: true,
    },
    {
      name: "gender",
      type: "select",
      label: "I'm",
      placeholder: "Select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
  ],
];

const steps = [
  {
    label: "Dependents Registration",
    title: "Let's start with the basic information",
    subtitle: "Add the dependent's personal details.",
    rows: basicRows,
  },
  {
    label: "Dependents Health Records",
    title: "Health information",
    subtitle:
      "Add any health details that may help provide the right care. These fields are optional.",
    rows: [
      [
        {
          name: "bloodType",
          type: "select",
          label: "Blood Type",
          placeholder: "Select blood type",
          options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"],
        },
      ],
      [
        {
          name: "allergies",
          type: "textarea",
          label: "Allergies",
          placeholder: "List any known allergies",
        },
      ],
      [
        {
          name: "medicalConditions",
          type: "textarea",
          label: "Medical Conditions",
          placeholder: "List any ongoing conditions",
        },
        {
          name: "medications",
          type: "textarea",
          label: "Current Medications",
          placeholder: "List current medications",
        },
      ],
    ],
  },
  {
    label: "Family Care Plan",
    title: "Plan for their care",
    subtitle:
      "Add care contacts and any notes you'd like to keep with this dependent.",
    rows: [
      [
        {
          name: "primaryDoctor",
          type: "text",
          label: "Primary Doctor",
          placeholder: "Doctor's name (optional)",
        },
      ],
      [
        {
          name: "emergencyContact",
          type: "text",
          label: "Emergency Contact",
          placeholder: "Name and phone number (optional)",
        },
      ],
      [
        {
          name: "careNotes",
          type: "textarea",
          label: "Care Notes",
          placeholder: "Anything else you'd like to remember",
        },
      ],
    ],
  },
];

export default function Mydependets() {
  useLegacyScript();

  return (
    <AppShell
      activeKey="dependents"
      crumb="My Dependents"
      title="My Dependents"
    >
      <ProfileStepForm
        title="Build Your Profile"
        subtitle="Keep the people you care for connected to their health information and care plan."
        steps={steps}
        initialValues={{
          0: {
            birthDate: "2021-02-01",
            gender: "Male",
          },
        }}
        onStepChange={(step) => console.log("step:", step)}
        onFinish={(data) => console.log("all data:", data)}
      />
      <SiteFooter />
    </AppShell>
  );
}
