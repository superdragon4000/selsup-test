import React, { useRef } from "react";
import { ParamEditor } from "./ParamEditor";
import type { ParamEditorRef } from "./ParamEditor";

function App() {
  const ref = useRef<ParamEditorRef>(null);

  return (
    <ParamEditor
      ref={ref}
      params={[
        { id: 1, name: "Назначение", type: "string" },
        { id: 2, name: "Длина", type: "string" },
      ]}
      model={{
        paramValues: [
          { paramId: 1, value: "повседневное" },
          { paramId: 2, value: "макси" },
        ],
        colors: [],
      }}
    />
  );
}

export default App;
