"use client";

import Link from "next/link";
import { ChevronLeft, Save } from "react-feather";
import { useFlowContext } from "./store";
import { API } from "@/api";
import { useRouter } from "next/navigation";
import { toFrameworkNodes } from "@/utils";
import { useTransition } from "react";

export default function TopNav(props: { experimentId: string }) {
  const router = useRouter();
  const { experimentId } = props;
  const { nodes, edges } = useFlowContext((s) => ({
    nodes: s.nodes,
    edges: s.edges,
  }));
  const [isPending, startTransition] = useTransition();

  return (
    <div className="sticky z-10 w-full top-2 flex justify-between items-center h-12 bg-light rounded p-2 gap-2">
      <div className="flex justify-center items-center gap-1">
        <Link href={`/experiments/${experimentId}`}>
          <ChevronLeft size={16} />
        </Link>
        <span className="font-medium">Flow Design</span>
      </div>
      <div className="flex gap-2 text-white">
        <button
          className="flex justify-center items-center gap-2 rounded bg-success px-2 py-1"
          onClick={() => {
            try {
              const firstNode = nodes.find((node) => node.type === "start");
              if (firstNode === undefined) {
                throw new Error("No start node found");
              } else {
                API.experiments.nodes
                  .update(experimentId)({
                    nodes: toFrameworkNodes(firstNode, nodes, edges),
                  })
                  .then((data) => {
                    startTransition(() => {
                      router.push(`/experiments/${data.pk}`);
                    });
                    startTransition(() => {
                      router.refresh();
                    });
                  });
              }
            } catch (e) {
              console.error(e);
            }
          }}
        >
          <span className="font-medium">Save</span>
          <Save size={16} />
        </button>
      </div>
    </div>
  );
}
