import { PageHead } from "@/components/admin/PageHead";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProject() {
  return (<><PageHead title="New project" sub="Upload a screenshot and add the details." /><ProjectForm /></>);
}
