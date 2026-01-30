import React, {
  useImperativeHandle,
  useMemo,
  useState,
  forwardRef,
} from "react";

export interface Param {
  id: number;
  name: string;
  type: "string";
}

export interface ParamValue {
  paramId: number;
  value: string;
}

export interface Color {
  id: number;
  name: string;
}

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

export interface Props {
  params: Param[];
  model: Model;
}

export interface ParamEditorRef {
  getModel: () => Model;
}

type FieldProps = {
  value: string;
  onChange: (v: string) => void;
};

const StringField: React.FC<FieldProps> = ({ value, onChange }) => {
  return (
    <input
      data-testid="string-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const fieldRegistry: Record<Param["type"], React.FC<FieldProps>> = {
  string: StringField,
};

export const ParamEditor = forwardRef<ParamEditorRef, Props>(
  ({ params, model }, ref) => {
    const initialValues = useMemo(() => {
      const map: Record<number, string> = {};
      model.paramValues.forEach((pv) => {
        map[pv.paramId] = pv.value;
      });
      return map;
    }, [model]);

    const [values, setValues] = useState<Record<number, string>>(initialValues);

    const updateValue = (paramId: number, value: string) => {
      setValues((prev) => ({
        ...prev,
        [paramId]: value,
      }));
    };

    useImperativeHandle(ref, () => ({
      getModel(): Model {
        return {
          ...model,
          paramValues: Object.entries(values).map(([paramId, value]) => ({
            paramId: Number(paramId),
            value,
          })),
        };
      },
    }));

    return (
      <div>
        {params.map((param) => {
          const Field = fieldRegistry[param.type];
          return (
            <div key={param.id}>
              <label>{param.name}</label>
              <Field
                value={values[param.id] ?? ""}
                onChange={(v) => updateValue(param.id, v)}
              />
            </div>
          );
        })}
      </div>
    );
  },
);
