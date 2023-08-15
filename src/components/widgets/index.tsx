import { Widget } from "@/lib/widgets";

interface Props {
  widget: Widget;
}

export function WidgetRenderer(props: Props) {
  switch (props.widget.template) {
    default: {
      return (
        <pre>
          <code>{JSON.stringify(props.widget, null, 2)}</code>
        </pre>
      );
    }
  }
}
