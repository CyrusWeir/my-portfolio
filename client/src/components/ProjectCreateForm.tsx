import { useState } from "react";
import { toast } from "react-toastify";
import type { projectTypes } from "../types/portfolioTypes";

function ProjectCreateForm() {
  const [projectData, setProjectData] = useState<projectTypes>({
    name: "",
    url: "",
    image: "",
    tech: "",
    context: "",
    video: "",
  });

  console.warn("ProjectData:", projectData);

  const handleInputModification = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const creationResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(projectData),
        },
      );
      if (creationResponse.ok) {
        toast.success("Project successfully created");
      }
    } catch {
      toast.error("unable to edit.");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" onChange={handleInputModification} />
      <label htmlFor="url">URL for the project</label>
      <input type="text" name="url" onChange={handleInputModification} />
      <label htmlFor="image">image URL</label>
      <input type="text" name="image" onChange={handleInputModification} />
      <label htmlFor="tech">tech</label>
      <input type="text" name="tech" onChange={handleInputModification} />
      <label htmlFor="context">context</label>
      <textarea name="context" onChange={handleInputModification} />
      <button type="submit">submit</button>
    </form>
  );
}
export default ProjectCreateForm;
