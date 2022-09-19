import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";

export interface IForm {
  onSubmit: (e: FormEvent, values: any) => void;
  children: () => JSX.Element;
  method?: string;
  id?: string;
  className?: string;
  initialValue: any;
}

const setDefaultFormValue = (initialValue: any) => {
  const formElement = document.getElementById("form__lakasir");
  // set default value for form element via dom formElement object
  formElement?.querySelectorAll("input").forEach((input) => {
    if (["radio", "checkbox"].includes(input.type)) {
      if (initialValue[input.name] === undefined) {
        input.checked = false;
      } else {
        input.checked = initialValue[input.name];
      }
    } else {
      if (initialValue[input.name] === undefined) {
        input.value = "";
      } else {
        input.value = initialValue[input.name];
      }
    }
  });
};

const Form = (props: IForm): JSX.Element => {
  const [values, setValues] = useState<any>();
  useLayoutEffect(() => {
    if (values == undefined) {
      setDefaultFormValue(props.initialValue);
    } else {
      setDefaultFormValue(values);
    }
  });

  return (
    <div>
      <form
        className={props.className}
        id="form__lakasir"
        method={props.method ?? "post"}
        onSubmit={(e) => {
          e.preventDefault();
          const formValues = Object.fromEntries(
            new FormData(e.target as HTMLFormElement)
          );
          props.onSubmit(e, formValues);
          setValues(formValues);
          // setDefaultFormValue(formValues);
        }}
      >
        {props.children()}
      </form>
    </div>
  );
};

export { Form };
