import { render, screen, fireEvent } from "@testing-library/react";
import React, { createRef } from "react";
import { ParamEditor } from "./ParamEditor";
import type { ParamEditorRef, Param, Model } from "./ParamEditor";

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
  colors: [],
};

describe("ParamEditor", () => {
  test("отображает поля по params", () => {
    render(<ParamEditor params={params} model={model} />);
    expect(screen.getByText("Назначение")).toBeInTheDocument();
    expect(screen.getByText("Длина")).toBeInTheDocument();
  });

  test("инициализируется из model.paramValues", () => {
    render(<ParamEditor params={params} model={model} />);
    const inputs = screen.getAllByTestId("string-input") as HTMLInputElement[];

    expect(inputs[0].value).toBe("повседневное");
    expect(inputs[1].value).toBe("макси");
  });

  test("getModel() возвращает корректные данные после изменений", () => {
    const ref = createRef<ParamEditorRef>();

    render(<ParamEditor ref={ref} params={params} model={model} />);

    const inputs = screen.getAllByTestId("string-input") as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: "новое значение" } });

    const result = ref.current!.getModel();

    expect(result.paramValues).toContainEqual({
      paramId: 1,
      value: "новое значение",
    });
  });
});
