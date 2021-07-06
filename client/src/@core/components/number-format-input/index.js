import React from "react"
import { useFormikContext } from "formik"
import NumberFormat from 'react-number-format'

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"]
  if (touched && errors) {
    classes.push("is-invalid")
  }

  return classes.join(" ")
}

function NumberInput({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  type = "number",
  ...props
}) {
  const { setFieldValue } = useFormikContext()
  return (
    <>
      <NumberFormat
        thousandSeparator={true}
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        onValueChange={val => {
          setFieldValue(field.name, val.value)
        }}
        {...props}
        {...field}
      />
    </>
  )
}

export default NumberInput