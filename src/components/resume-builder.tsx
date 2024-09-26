"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";

export default function ResumeBuilder() {
  type ResumeData = {
    name: string;
    email: string;
    phone: string;
    education: {
      highestEducation: string;
      school: string;
      field: string;
      passingYear: string;
    };
    skills: string[];
    experience: {
      company: string;
      position: string;
      year: string;
    };
  };
  // Define state for form fields
  const [formData, setFormData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    education: {
      highestEducation: "",
      school: "",
      field: "",
      passingYear: "",
    },
    skills: [],
    experience: {
      company: "",
      position: "",
      year: "",
    },
  });

  // Define state to store submitted data
  const [submittedData, setSubmittedData] = useState<ResumeData | null>(null);
  const [newSkill, setNewSkill] = useState("");
  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name in formData.education) {
      setFormData((prev) => ({
        ...prev,
        education: { ...prev.education, [name]: value },
      }));
    } else if (name in formData.experience) {
      setFormData((prev) => ({
        ...prev,
        experience: { ...prev.experience, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle skill input change
  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
  };

  // Add skill to the list
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill(""); // Clear the input field after adding
    }
  };

  // Remove skill from the list
  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills.splice(index, 1);
      return {
        ...prev,
        skills: updatedSkills,
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      education: {
        highestEducation: "",
        school: "",
        field: "",
        passingYear: "",
      },
      skills: [],
      experience: {
        company: "",
        position: "",
        year: "",
      },
    });
  };

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="sm:text-6xl text-3xl font-heading text-center text-yellow-600 sm:mb-10 mb-6">
        Dynamic Resume Builder
      </h1>
      <div style={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }} className="bg-gradient-to-br from-yellow-500 to-orange-400 dark:from-yellow-900 dark:to-orange-900 border-2 border-gray-400 sm:p-8 p-4 sm:p-10 rounded-lg max-w-5xl w-full mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-black mb-8 sm:p-6 p-4 space-y-4">
            <div>
              <h1 className="sm:text-3xl text-xl text-yellow-500 mb-6 font-subheadings">
                Personal Information
              </h1>
              <label className="block sm:text-lg text-sm text-white">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="bg-black mb-8 sm:p-6 p-4 space-y-4">
            <h1 className="sm:text-3xl text-xl text-yellow-500 mb-6 font-subheadings">
              Education
            </h1>
            <div>
              <label className="block sm:text-lg text-sm text-white">
                Highest Education:
              </label>
              <select
                name="highestEducation"
                value={formData.education.highestEducation}
                onChange={handleChange}
                className="sm:p-2 p-1 w-full rounded cursor-pointer bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select your highest education
                </option>
                <option value="Matric">Matriculation</option>
                <option value="Inter">Intermediate</option>
                <option value="Graduation">Bachelors</option>
                <option value="Graduation">Masters</option>
                <option value="MPhil">MPhil</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">School:</label>
              <input
                type="text"
                name="school"
                value={formData.education.school}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">Field:</label>
              <input
                type="text"
                name="field"
                value={formData.education.field}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">Passing Year:</label>
              <input
                type="text"
                name="passingYear"
                value={formData.education.passingYear}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="bg-black mb-8 sm:p-6 p-4">
            <h1 className="sm:text-3xl text-xl text-yellow-500 mb-6 font-subheadings">
              Skills
            </h1>
            <label className="block sm:text-lg text-sm text-gray-400">
              List Your Skills Here
            </label>
            <div className="flex gap-4 flex-col sm:flex-row">
              <input
                type="text"
                value={newSkill}
                onChange={handleSkillChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                className="sm:text-md text-sm hover:bg-gray-500 hover:text-black sm:w-1/3 h-[2rem]"
              >
                Add Skill
              </Button>{" "}
            </div>
            {/* Display added skills */}
            <div className="mt-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex bg-gray-200 text-black px-2 py-1 rounded m-1 relative"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-2 text-red-500 hover:text-red-700 px-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-black mb-8 sm:p-6 p-4 space-y-4">
            <h1 className="sm:text-3xl text-xl text-yellow-500 mb-6 font-subheadings">
              Experience
            </h1>
            <div>
              <label className="block sm:text-lg text-sm text-white">Company:</label>
              <input
                type="text"
                name="company"
                value={formData.experience.company}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">Position:</label>
              <input
                type="text"
                name="position"
                value={formData.experience.position}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block sm:text-lg text-sm text-white">Year:</label>
              <input
                type="text"
                name="year"
                value={formData.experience.year}
                onChange={handleChange}
                className="sm:p-1 w-full rounded bg-gray-800 text-white border-2 border-transparent focus:border-yellow-600 focus:outline-none"
                required
              />
            </div>
          </div>
          <Button className="sm:text-lg text-md font-bold flex justify-center items-center hover:bg-gray-500 hover:text-black sm:w-1/3 md:w-1/2 w-full sm:h-[4rem] h-[3rem]">
            Generate Your Resume
          </Button>
        </form>

        
      </div>

      <div>
      {submittedData && (
          <div className="bg-white text-black mt-10 border-[4px] border-yellow-400 sm:p-6 p-4 rounded-lg max-w-5xl w-full mx-auto">
            <h2 className="text-5xl text-center font-bold font-heading mb-10 rounded-3xl shadow-xl p-4">
              Resume
            </h2>
            <div className="sm:grid sm:grid-cols-2 sm:gap-10">
              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <h1 className="sm:text-3xl text-xl text-gray-500 font-subheadings">
                    ◇ Personal Information
                  </h1>
                  <hr className="border-[2px] border-yellow-400 sm:w-[22rem] mt-2 mb-3" />
                </div>

                <h1 className="text-sm text-gray-500">
                  Name:
                  <span className="sm:text-xl text-lg text-black font-bold">
                    {" "}
                    {submittedData.name}
                  </span>
                </h1>
                <h1 className="text-sm text-gray-500">
                  Email:
                  <span className="sm:text-xl text-sm text-black font-bold">
                    {" "}
                    {submittedData.email}
                  </span>
                </h1>
                <h1 className="text-sm text-gray-500">
                  Phone:
                  <span className="sm:text-xl text-lg text-black font-bold">
                    {" "}
                    {submittedData.phone}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <h1 className="sm:text-3xl text-xl text-gray-500 font-subheadings">
                    ◇ Education
                  </h1>
                  <hr className="border-[2px] border-yellow-400 sm:w-[12rem] mt-2 mb-3" />
                </div>

                <h1 className="text-sm text-gray-500">
                  Highest Education:
                  <span className="sm:text-xl text-md text-black font-bold">
                    {" "}
                    {submittedData.education.highestEducation}
                  </span>
                </h1>
                <h1 className="text-sm text-gray-500">
                  School:
                  <span className="sm:text-xl text-md text-black font-bold">
                    {" "}
                    {submittedData.education.school}
                  </span>
                </h1>
                <h1 className="text-sm text-gray-500">
                  Field:
                  <span className="sm:text-xl text-md text-black font-bold">
                    {" "}
                    {submittedData.education.field}
                  </span>
                </h1>
                <h1 className="text-sm text-gray-500">
                  Passing Year:
                  <span className="sm:text-xl text-md text-black font-bold">
                    {" "}
                    {submittedData.education.passingYear}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <h1 className="sm:text-3xl text-xl text-gray-500 font-subheadings">
                    ◇ Skills
                  </h1>
                  <hr className="border-[2px] border-yellow-400 sm:w-[8rem] mt-2 mb-3" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {submittedData.skills.map((skill, index) => (
                    <div
                      className="bg-gray-300 sm:p-2 p-1 text-center text-sm rounded-full shadow-xl inline-flex justify-center items-center"
                      key={index}
                    >
                      💡 {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                <div>
                  <h1 className="sm:text-3xl text-xl text-gray-500 font-subheadings">
                    ◇ Experience
                  </h1>
                  <hr className="border-[2px] border-yellow-400 sm:w-[13rem] mt-2 mb-3" />
                </div>

                <h1 className="text-sm text-gray-500">
                  Company:
                  <span className="sm:text-xl text-md text-black font-bold">
                    {" "}
                    {submittedData.experience.company}
                  </span>
                </h1>
                <h1 className="text-sm text-gray-500">
                  Position:
                  <span className="sm:text-xl text-md text-black font-bold">
                    {" "}
                    {submittedData.experience.position}
                  </span>
                </h1>
                <h1 className="text-sm text-gray-500">
                  Year:
                  <span className="sm:text-xl text-md text-black font-bold">
                    {" "}
                    {submittedData.experience.year}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
