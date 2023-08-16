import { ColorOptionsWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Fragment } from "react";

export default function ColorOptions(props: { widget: ColorOptionsWidget }) {
  const { values, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="grid grid-cols-4 gap-6 w-full">
        {props.widget.props.options.map((option, i) => {
          const isSelected = (
            (values[props.widget.props.dataKey] || []) as string[]
          ).includes(option.value);

          return (
            <Fragment key={i}>
              <input
                type="checkbox"
                name={props.widget.props.dataKey}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor={option.value}
                className="col-span-1 flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div
                  key={`circle-${option.value}`}
                  className={`w-8/12 border border-gray-400 flex items-center justify-center aspect-square rounded-full shadow-md`}
                >
                  <div
                    className="w-9/12 aspect-square rounded-full"
                    style={{ background: option.color }}
                  ></div>
                </div>
                <div
                  className={`text-xs group-hover:text-black ${
                    isSelected ? "text-black font-medium" : "text-gray-400"
                  }`}
                >
                  {option.label}
                </div>
              </label>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}