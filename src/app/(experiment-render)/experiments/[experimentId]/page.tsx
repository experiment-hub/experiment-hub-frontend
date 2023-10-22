"use client";
import RenderState from "@/components/framework/render/RenderState";
import { useExperimentStore } from "@/lib/flow/state";
import { FrameworkNode } from "@/lib/nodes";
import { useEffect } from "react";

type Experiment = {
  nodes: FrameworkNode[];
};

const experiment: Experiment = {
  nodes: [
    { nodeType: "start", nodeFamily: "core", id: "", props: {} },
    {
      nodeType: "experiment-step",
      nodeFamily: "study",
      id: "home",
      props: {
        widgets: [
          {
            template: "rich_text",
            widgetFamily: "content",
            props: { content: "# Algo algo nombre" },
          },
          {
            template: "rich_text",
            widgetFamily: "content",
            props: { content: "algo algo bajada" },
          },
          {
            template: "button",
            widgetFamily: "layout",
            props: { text: "Siguiente", behaivor: "next_node" },
          },
          {
            template: "rating",
            widgetFamily: "response",
            props: {
              label: "Culpable",
              max: 7,
              optionsLabel: [
                { value: "1", label: "Nada" },
                { value: "4", label: "Moderado" },
                { value: "7", label: "Mucho" },
              ],
              dataKey: "culpable",
            },
          },
        ],
      },
    },
    {
      nodeType: "experiment-step",
      nodeFamily: "study",
      id: "intro",
      props: {
        widgets: [
          {
            template: "rich_text",
            widgetFamily: "content",
            props: {
              content:
                "# Pensá en la ultimas 24 horas y contesta en base a lo que comiste.",
            },
          },
          {
            template: "rich_text",
            widgetFamily: "content",
            props: {
              content:
                "<span>* Esto es una experiencia con fines ludicos y vamos a hablar de comida, no es un analisis nutricional.</span>",
            },
          },
          {
            template: "button",
            widgetFamily: "layout",
            props: {
              text: "Siguiente",
              behaivor: "next_node",
            },
          },
        ],
      },
    },
    {
      nodeType: "path",
      nodeFamily: "control",
      id: "preguntas",
      props: {
        stepper: true,
        nodes: [
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "general",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: {
                    content:
                      "## Marcá todos los tipos de alimentos que consumiste",
                  },
                },
                {
                  template: "emoji-options",
                  widgetFamily: "response",
                  props: {
                    label: "",
                    options: [
                      { emoji: "🥚", label: "Huevos", value: "huevos" },
                      { emoji: "🧀", label: "Lácteos", value: "lacteos" },
                      { emoji: "🥔", label: "Tubérculos", value: "tuberculos" },
                      { emoji: "🍄", label: "Hongos", value: "hongos" },
                      { emoji: "🌱", label: "Semilas", value: "semillas" },
                      {
                        emoji: "🌰",
                        label: "Frutos secos",
                        value: "frutos-secos",
                      },
                      {
                        emoji: "🍎",
                        label: "Frutas",
                        value: "frutas",
                      },
                      {
                        emoji: "🥬",
                        label: "Verduras",
                        value: "verduras",
                      },
                    ],
                    dataKey: "general-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "general-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí nada de esto",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "general-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "carnes",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Carnes" },
                },
                {
                  template: "multiple-check",
                  widgetFamily: "response",
                  props: {
                    label: "Si consumiste carne, ¿cuales fueron? Marcá todas.",
                    options: [
                      { label: "Pescado", value: "pescado" },
                      { label: "Carne roja", value: "carne-roja" },
                      { label: "Pollo", value: "pollo" },
                      { label: "Víceras", value: "viceras" },
                      { label: "Otras", value: "otras" },
                    ],
                    dataKey: "carnes-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "carnes-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí carnes",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "carnes-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "legumbres",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Legumbres" },
                },
                {
                  template: "multiple-check",
                  widgetFamily: "response",
                  props: {
                    label:
                      "Si consumiste legumbres, ¿cuales fueron? Marcá todas.",
                    options: [
                      { label: "Garbanzo", value: "garbanzo" },
                      { label: "Arvejas", value: "arvejas" },
                      { label: "Lentejas", value: "lentejas" },
                      { label: "Porotos", value: "porotos" },
                      { label: "Maní", value: "mani" },
                      { label: "Soja", value: "soja" },
                      { label: "Otras", value: "otras" },
                    ],
                    dataKey: "legumbres-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "legumbres-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí legumbres",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "legumbres-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "frutas",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Frutas" },
                },
                {
                  template: "color-options",
                  widgetFamily: "response",
                  props: {
                    label:
                      "¿De que colores fueron las frutas que comiste? Marcá todas.",
                    options: [
                      { color: "#E41722", label: "Rojo", value: "rojo" },
                      { color: "#EE521D", label: "Naranja", value: "naranja" },
                      {
                        color: "#EBAC11",
                        label: "Amarillo",
                        value: "amarillo",
                      },
                      {
                        color: "#43b146",
                        label: "Verde oscuro",
                        value: "verde-oscuro",
                      },
                      {
                        color: "#96c239",
                        label: "Verde claro",
                        value: "verde-claro",
                      },
                      { color: "#1669b0", label: "Azulado", value: "azulado" },
                      { color: "#ae256b", label: "Morado", value: "morado" },
                      { color: "#791601", label: "Marrón", value: "marron" },
                    ],
                    dataKey: "frutas-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "frutas-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí frutas",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "frutas-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "verduras",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Verduras" },
                },
                {
                  template: "color-options",
                  widgetFamily: "response",
                  props: {
                    label:
                      "¿De que colores fueron las verduras que comiste? Marcá todas.",
                    options: [
                      { color: "#E41722", label: "Rojo", value: "rojo" },
                      { color: "#EE521D", label: "Naranja", value: "naranja" },
                      {
                        color: "#EBAC11",
                        label: "Amarillo",
                        value: "amarillo",
                      },
                      {
                        color: "#43b146",
                        label: "Verde oscuro",
                        value: "verde-oscuro",
                      },
                      {
                        color: "#96c239",
                        label: "Verde claro",
                        value: "verde-claro",
                      },
                      { color: "#1669b0", label: "Azulado", value: "azulado" },
                      { color: "#ae256b", label: "Morado", value: "morado" },
                      { color: "#791601", label: "Marrón", value: "marron" },
                    ],
                    dataKey: "verduras-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "verduras-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí verduras",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "verduras-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "cereales",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Cereales" },
                },
                {
                  template: "multiple-check",
                  widgetFamily: "response",
                  props: {
                    label:
                      "Si consumiste cereales, ¿cuales fueron? Marcá todas.",
                    options: [
                      {
                        label: "Trigo (panificados, pastas, harina blanca)",
                        value: "trigo",
                      },
                      { label: "Maíz (polenta)", value: "maiz" },
                      { label: "Arroz blanco", value: "arroz-blanco" },
                      { label: "Arroz integral", value: "arroz-integral" },
                      { label: "Cebada", value: "cebada" },
                      { label: "Centeno", value: "centeno" },
                      { label: "Avena", value: "avena" },
                      { label: "Quinoa", value: "quinoa" },
                      { label: "Otros", value: "otros" },
                    ],
                    dataKey: "cereales-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "cereales-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí cereales",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "cereales-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "hierbas",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Hierbas" },
                },
                {
                  template: "checkbox",
                  widgetFamily: "response",
                  props: {
                    label:
                      "Si consumiste hierbas, ¿cuales fueron? Marcá todas.",
                    options: [
                      { label: "Óregano", value: "oregano" },
                      { label: "Romero", value: "romero" },
                      { label: "Laurel", value: "laurel" },
                      { label: "Salvia", value: "salvia" },
                      { label: "Tomillo", value: "tomillo" },
                    ],
                    dataKey: "hierbas-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "hierbas-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí hierbas",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "hierbas-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "especias",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Especias" },
                },
                {
                  template: "checkbox",
                  widgetFamily: "response",
                  props: {
                    label:
                      "Si consumiste especias, ¿cuales fueron? Marcá todas.",
                    options: [
                      { label: "Cúrcuma", value: "curcuma" },
                      { label: "Pimienta", value: "pimienta" },
                      { label: "Comino", value: "comino" },
                      { label: "Jengibre", value: "jengibre" },
                      { label: "Pimentón", value: "pimenton" },
                      { label: "Canela", value: "canela" },
                      { label: "Otras", value: "otras" },
                    ],
                    dataKey: "especias-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "especias-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí especias",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "especias-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "infusiones",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Infusiones" },
                },
                {
                  template: "checkbox",
                  widgetFamily: "response",
                  props: {
                    label:
                      "Si tomaste infusiones, ¿cuales fueron? Marcá todas.",
                    options: [
                      { label: "Café", value: "cafe" },
                      { label: "Te (negro, verde o blanco)", value: "te" },
                      { label: "Mate", value: "mate" },
                      { label: "Manzanilla", value: "manzanilla" },
                      { label: "Boldo", value: "boldo" },
                      { label: "Tilo", value: "tilo" },
                      { label: "Cedrón", value: "cedron" },
                    ],
                    dataKey: "infusiones-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "infusiones-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí infusiones",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "infusiones-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "carne-semanal",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: {
                    content: "## Semanalmente, ¿cuánta carne consumís?",
                  },
                },
                {
                  template: "radio",
                  widgetFamily: "response",
                  props: {
                    label: "",
                    options: [
                      { label: "Nunca", value: "nunca" },
                      {
                        label: "Menos de una vez a la semana",
                        value: "<1",
                      },
                      { label: "1 o 2 veces por semana", value: "1-2" },
                      { label: "3 a 5 veces por semana", value: "3-5" },
                      {
                        label: "Todos o casi todos los días",
                        value: "todos-o-casi-todos-los-dias",
                      },
                      {
                        label: "Todos los días en más de una comida",
                        value: "todos-los-dias-mas-de-1",
                      },
                    ],
                    dataKey: "carne-frecuencia",
                    required: true,
                  },
                },
                {
                  template: "button",
                  widgetFamily: "layout",
                  props: {
                    text: "Siguiente",
                    behaivor: "next_node",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      nodeType: "checkpoint",
      nodeFamily: "core",
      id: "checkpoint-1",
      props: {},
    },
    {
      nodeFamily: "study",
      nodeType: "custom-view",
      id: "feedback",
      props: {
        slug: "feedback-comer",
      },
    },
    { nodeType: "finish", nodeFamily: "core", id: "", props: {} },
  ],
};

export default function Experiment({
  params,
}: {
  params: { experimentId: string };
}) {
  const state = useExperimentStore((e) => e.state);
  const init = useExperimentStore((e) => e.init);
  const unsubTransient = useExperimentStore((e) => e.unsubTransient);

  useEffect(() => {
    init(experiment.nodes);
    return () => {
      unsubTransient();
    };
  }, [init, unsubTransient]);

  return (
    <div className="flex flex-col mx-auto gap-4 max-w-lg w-full p-6 border border-black flex-1">
      <RenderState state={state} />
    </div>
  );
}