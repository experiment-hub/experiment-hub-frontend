import { API } from "@/api";
import { useUser } from "@/hooks";
import CreateExperimentForm from "@/ui/experiments/create-experiment-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create experiment | Experiment Hub",
};

export default async function Page() {
  const user = useUser();

  const userTeams = await API.users.teams(user?.pk?.toString() || "1");

  return (
    <div className="max-w-sm w-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Create experiment</h1>
      <CreateExperimentForm teams={userTeams} />
    </div>
  );
}
