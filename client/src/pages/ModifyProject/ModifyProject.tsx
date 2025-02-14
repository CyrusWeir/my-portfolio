import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "../../components/ProjectFrom";
import type { projectTypes } from "../../types/portfolioTypes";
function ModifyProject() {
  const { id } = useParams();

  const [fetchedProject, setFetchedProject] = useState<projectTypes>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/project/${id}`)
      .then((response) => response.json())
      .then((data) => setFetchedProject(data));
  }, [id]);

  console.warn("fetched Project:", fetchedProject);

  return (
    <main className="modify-project-form">
      <h1 className="persistent-heading">Modify Project</h1>
      <ProjectForm project={fetchedProject} />
    </main>
  );
}

export default ModifyProject;
