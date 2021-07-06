import React, { useState } from "react"
import PhoneInput from "react-phone-input-2"
import { Spinner } from 'reactstrap'
import { useFormikContext } from "formik"
import axios from "axios"

import "@styles/react/libs/phone-input/phone-input.scss"
import "react-phone-input-2/lib/material.css"

const getFieldCSSClasses = (loading, touched, status) => {
  const classes = ["form-control"]
  if (!loading && touched && (status === "INVALID" || status === "NOTHING")) {
    classes.push("is-invalid")
  }
  return classes.join(" ")
}

const getContainerClasses = (loading, touched, status) => {
  if (!loading && touched && (status === "INVALID" || status === "NOTHING")) {
    return "is-invalid"
  }
  return ""
}

function PhoneNumberInput({
  field,
  ...props
}) {
  const { setFieldValue, setFieldError, setFieldTouched, values, touched } = useFormikContext()
  const [loading, setLoading] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(null)
  
  const handleInputPhoneNumber = async (phone) => {
    setFieldTouched(props.valid_name, true)
    if (!phone) {
      setFieldError(props.valid_name, "Phone number is required!")
      return
    }
    setLoading(false)
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(
      setTimeout(async function () {
        setLoading(true)
        try {
          const res = await axios.get(
            `/api/rest/verify-phone-number?number=${phone}`
          )
          setLoading(false)
          
          if (res.data.valid === true) {
            setFieldValue(props.valid_name, "VALID")
            setFieldValue(field.name, res.data.international_format)
          } else {
            setFieldValue(props.valid_name, "INVALID")
          }
        } catch (error) {
          console.log(error)
          setLoading(false)
          setFieldValue(props.valid_name, "INVALID")
        }
      }, 800)
    )
  }
  return (
    <>
      <PhoneInput
        country={"ng"}
        autoFormat={true}
        specialLabel=" "
        onChange={handleInputPhoneNumber}
        containerClass={getContainerClasses(loading, touched[props.valid_name], values[props.valid_name])}
        inputProps={{
          name: field.name,
          className: getFieldCSSClasses(loading, touched[props.valid_name], values[props.valid_name])
        }}
        onBlur={() => {
          setFieldTouched(props.valid_name)
        }}
        {...props}
      />
      {
          loading && (
            <Spinner color="primary" size={"sm"} />
          )
      }
    </>
  )
}

export default PhoneNumberInput