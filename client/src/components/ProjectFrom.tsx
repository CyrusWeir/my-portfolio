import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { projectProps, projectTypes } from "../types/portfolioTypes";

function ProjectForm({ project }: projectProps) {
  const [collectedModifications, setCollectedModifications] =
    useState<projectTypes | null>(null);
  useEffect(() => {
    if (project) {
      // Only set state if project exists
      setCollectedModifications({ ...project }); // Create a copy
    } else {
      setCollectedModifications(null);
    }
  }, [project]);
  console.warn("Collected Info:", collectedModifications);
  const handleInputModification = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (collectedModifications) {
      //only do this if there's actually data saved in the state
      setCollectedModifications({
        ...collectedModifications,
        [name]: value,
      });
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!project) {
      <div>Loading...</div>;
    }
    try {
      const modificationResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project/edit/${project?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(collectedModifications),
        },
      );
      if (modificationResponse.ok) {
        toast.success("Project successfully modified");
      }
    } catch {
      toast.error("unable to edit.");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        defaultValue={project?.name}
        name="name"
        onChange={handleInputModification}
      />
      <label htmlFor="url">URL for the project</label>
      <input
        type="text"
        defaultValue={project?.url}
        name="url"
        onChange={handleInputModification}
      />
      <label htmlFor="image">image URL</label>
      <input
        type="text"
        defaultValue={project?.image}
        name="image"
        onChange={handleInputModification}
      />
      <label htmlFor="tech">tech</label>
      <input
        type="text"
        defaultValue={project?.tech}
        name="tech"
        onChange={handleInputModification}
      />
      <label htmlFor="context">context</label>
      <textarea
        defaultValue={project?.context}
        name="context"
        onChange={handleInputModification}
      />
      <label htmlFor="video">video</label>
      <input
        type="text"
        defaultValue={project?.video}
        name="video"
        onChange={handleInputModification}
      />
      <button type="submit">submit</button>
    </form>
  );
}
export default ProjectForm;
