import type { projectProps } from "../types/portfolioTypes";

function ProjectCard({ project }: projectProps) {
  if (!project) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <h2>{project.name}</h2>
      <figure>
        <figcaption>{project.tech}</figcaption>
      </figure>
      <h3>{project.context}</h3>
    </main>
  );
}
export default ProjectCard;
