import Link from "next/link";
import { Activity, Edit3, GitBranch, Settings, Users } from "react-feather";

export default function Page({ params }: { params: { experimentId: string } }) {
  return (
    <div>
      <h1>Experiment: {params.experimentId}</h1>
      <ul>
        <li>
          <Link
            href={`/experiment/${params.experimentId}/analytics`}
            className="flex gap-2 items-center"
          >
            <Activity size={18} /> <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiment/${params.experimentId}/edit`}
            className="flex gap-2 items-center"
          >
            <Edit3 size={18} /> <span>Edit</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiment/${params.experimentId}/flow`}
            className="flex gap-2 items-center"
          >
            <GitBranch size={18} /> <span>Flow</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiment/${params.experimentId}/participants`}
            className="flex gap-2 items-center"
          >
            <Users size={18} /> <span>Participants</span>
          </Link>
        </li>
        <li>
          <Link
            href={`/experiment/${params.experimentId}/settings`}
            className="flex gap-2 items-center"
          >
            <Settings size={18} /> <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
