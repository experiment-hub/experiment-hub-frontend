"use client";
import { API } from "@/api";
import { useRouter } from "next/navigation";
import { Trash2 } from "react-feather";
import { toast } from "sonner";

export default function RemoveTeamButton(props: { teamId: number }) {
  const router = useRouter();
  return (
    <div className=" self-start justify-self-end ml-auto">
      <button
        className="text-xs p-2 rounded flex gap-2 justify-center items-center border border-red-400 hover:bg-red-400/40 transition-colors hover:text-red-600"
        onClick={() => {
          toast.promise(
            API.teams.delete(props.teamId.toString()).then((team) => {
              router.push("/profile");
            }),
            {
              loading: "Deleting team...",
              success: "Team deleted",
              error: "Could not delete team. Please try again",
            }
          );
        }}
      >
        <Trash2 size={12} /> Delete team
      </button>
    </div>
  );
}
