"use client";
import { FrameworkWidget } from "@/lib/widgets";
import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

export interface ViewProps {
  widgets: FrameworkWidget[];
}

export function defaultByType(
  type: FrameworkWidget["template"]
): FrameworkWidget {
  switch (type) {
    case "button": {
      return {
        template: "button",
        widgetFamily: "layout",
        props: {
          text: "Button",
          behaivor: "next_node",
        },
      };
    }
    case "slider": {
      return {
        template: "slider",
        widgetFamily: "response",
        props: {
          minLabel: "Nada",
          maxLabel: "Mucho",
          dataKey: "slider",
          label: "¿Qué tanto te gusta hacer ejercicio físico?",
        },
      };
    }
    case "rich_text": {
      return {
        template: "rich_text",
        widgetFamily: "content",
        props: {
          content: "# Para empezar:",
        },
      };
    }
    case "checkbox": {
      return {
        template: "checkbox",
        widgetFamily: "response",
        props: {
          label: "¿Qué tipo de carne comes?",
          options: [
            { label: "Res", value: "res" },
            { label: "Cerdo", value: "cerdo" },
            { label: "Pollo", value: "pollo" },
            { label: "Pescado", value: "pescado" },
          ],
          dataKey: "carne-tipo",
          required: true,
        },
      };
    }
    case "single_checkbox": {
      return {
        template: "single_checkbox",
        widgetFamily: "response",
        props: {
          label: "Acepto los terminos y deseo participar.",
          dataKey: "terminos",
          required: true,
          defaultValue: true,
        },
      };
    }
    case "radio": {
      return {
        template: "radio",
        widgetFamily: "response",
        props: {
          label: "¿Cada cuánto comes carne?",
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
      };
    }
    case "dropdown": {
      return {
        template: "dropdown",
        widgetFamily: "response",
        props: {
          label: "¿En qué país vivís?",
          options: [
            { label: "Argentina", value: "argentina" },
            { label: "Brasil", value: "brasil" },
            { label: "Chile", value: "chile" },
            { label: "Colombia", value: "colombia" },
            { label: "Ecuador", value: "ecuador" },
            { label: "Paraguay", value: "paraguay" },
            { label: "Perú", value: "peru" },
            { label: "Uruguay", value: "uruguay" },
            { label: "Venezuela", value: "venezuela" },
          ],
          dataKey: "pais",
        },
      };
    }
    default: {
      return {
        template: "group",
        widgetFamily: "layout",
        props: {
          widgets: [],
          name: "Group",
        },
      };
    }
  }
}

export interface ViewState extends ViewProps {
  addWidget: (widget: FrameworkWidget) => void;
  removeWidget: (widgetId: string) => void;
  moveWidgetUp: (widgetId: string) => void;
  moveWidgetDown: (widgetId: string) => void;
  updateWidget: (widget: FrameworkWidget) => void;
}

export type ViewStore = ReturnType<typeof createViewStore>;

export const createViewStore = (initProps?: Partial<ViewProps>) => {
  const DEFAULT_PROPS: ViewProps = {
    widgets: [],
  };
  return createStore<ViewState>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addWidget: (widget) => {
      set({
        widgets: [...get().widgets, widget],
      });
    },
    removeWidget: (widgetId) => {
      set({
        widgets: get().widgets.filter((widget) => widget.id !== widgetId),
      });
    },
    moveWidgetDown: (widgetId) => {
      const widgets = get().widgets;
      const i = widgets.findIndex((widget) => widget.id === widgetId);
      if (i === widgets.length - 1) return;
      const newWidgets = [...widgets];
      const temp = newWidgets[i];
      newWidgets[i] = newWidgets[i + 1];
      newWidgets[i + 1] = temp;
      set({
        widgets: newWidgets,
      });
    },
    moveWidgetUp: (widgetId) => {
      const widgets = get().widgets;
      const i = widgets.findIndex((widget) => widget.id === widgetId);
      if (i === 0) return;
      const newWidgets = [...widgets];
      const temp = newWidgets[i];
      newWidgets[i] = newWidgets[i - 1];
      newWidgets[i - 1] = temp;
      set({
        widgets: newWidgets,
      });
    },
    updateWidget: (widget) => {
      set({
        widgets: get().widgets.map((w) => (w.id === widget.id ? widget : w)),
      });
    },
  }));
};

export type ViewProviderProps = React.PropsWithChildren<ViewProps>;

export const ViewContext = createContext<ViewStore | null>(null);

export function ViewProvider({ children, ...props }: ViewProviderProps) {
  const storeRef = useRef<ViewStore>();
  if (!storeRef.current) {
    storeRef.current = createViewStore(props);
  }
  return (
    <ViewContext.Provider value={storeRef.current}>
      {children}
    </ViewContext.Provider>
  );
}

export function useViewContext<T>(selector: (state: ViewState) => T): T {
  const store = useContext(ViewContext);
  if (!store) throw new Error("Missing ViewContext.Provider in the tree");
  return useStore(store, selector);
}
