import { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Row, Col } from 'reactstrap'
import axios from 'axios'

import { Formik, Field, Form } from "formik"
import * as Yup from "yup"

const formSchema = Yup.object().shape({
  postcode: Yup.string(),
  locality: Yup.string(),
  state: Yup.string(),
  long: Yup.number(),
  lat: Yup.number(),
  Lat_precise: Yup.string(),
  Long_precise: Yup.string(),
  SA2_NAME_2016: Yup.string(),
  SA3_CODE_2016: Yup.string(),
  SA3_NAME_2016: Yup.string(),
  SA4_CODE_2016: Yup.string(),
  SA4_NAME_2016: Yup.string()
})

const EditModal = ({ modalOpen, toggle, selectedData, onSuccess }) => {
  const handleSubmit = (values) => {
    axios.post('/api/rest/update-postcode', { id: selectedData._id, data: values })
      .then((res) => {
        const { success } = res.data
        if (success === true) {
          onSuccess({ id: selectedData._id, newValues: values })
        } else {
          toggle()
        }
      })
  }

  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update PostCode</ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize
          initialValues={{
            postcode: selectedData ? selectedData.postcode : "",
            locality: selectedData ? selectedData.locality : "",
            state: selectedData ? selectedData.state : "",
            long: selectedData ? selectedData.long : "",
            lat: selectedData ? selectedData.lat : "",
            Lat_precise: selectedData ? selectedData.Lat_precise : "",
            Long_precise: selectedData ? selectedData.Long_precise : "",
            SA2_NAME_2016: selectedData ? selectedData.SA2_NAME_2016 : "",
            SA3_CODE_2016: selectedData ? selectedData.SA3_CODE_2016 : "",
            SA3_NAME_2016: selectedData ? selectedData.SA3_NAME_2016 : "",
            SA4_CODE_2016: selectedData ? selectedData.SA4_CODE_2016 : "",
            SA4_NAME_2016: selectedData ? selectedData.SA4_NAME_2016 : ""
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            handleSubmit(values)
          }}
        >
          {({ errors, touched }) => (
            <Form>
                <Row>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="name">Post Code</Label>
                      <Field
                        name="postcode"
                        id="postcode"
                        className={`form-control ${errors.postcode &&
                          touched.postcode &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="name">Locality</Label>
                      <Field
                        name="locality"
                        id="locality"
                        className={`form-control ${errors.locality &&
                          touched.locality &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="name">State</Label>
                      <Field
                        name="state"
                        id="state"
                        className={`form-control ${errors.state &&
                          touched.state &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="long">Long</Label>
                      <Field
                        name="long"
                        id="long"
                        className={`form-control ${errors.long &&
                          touched.long &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="lat">Lat</Label>
                      <Field
                        name="lat"
                        id="lat"
                        className={`form-control ${errors.lat &&
                          touched.lat &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="Lat_precise">Lat_precise</Label>
                      <Field
                        name="Lat_precise"
                        id="Lat_precise"
                        className={`form-control ${errors.Lat_precise &&
                          touched.Lat_precise &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="Long_precise">Long_precise</Label>
                      <Field
                        name="Long_precise"
                        id="Long_precise"
                        className={`form-control ${errors.Long_precise &&
                          touched.Long_precise &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="SA2_NAME_2016">SA2_NAME_2016</Label>
                      <Field
                        name="SA2_NAME_2016"
                        id="SA2_NAME_2016"
                        className={`form-control ${errors.SA2_NAME_2016 &&
                          touched.SA2_NAME_2016 &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="SA3_CODE_2016">SA3_CODE_2016</Label>
                      <Field
                        name="SA3_CODE_2016"
                        id="SA3_CODE_2016"
                        className={`form-control ${errors.SA3_CODE_2016 &&
                          touched.SA3_CODE_2016 &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="SA3_NAME_2016">SA3_NAME_2016</Label>
                      <Field
                        name="SA3_NAME_2016"
                        id="SA3_NAME_2016"
                        className={`form-control ${errors.SA3_NAME_2016 &&
                          touched.SA3_NAME_2016 &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="SA4_CODE_2016">SA4_CODE_2016</Label>
                      <Field
                        name="SA4_CODE_2016"
                        id="SA4_CODE_2016"
                        className={`form-control ${errors.SA4_CODE_2016 &&
                          touched.SA4_CODE_2016 &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="SA4_NAME_2016">SA4_NAME_2016</Label>
                      <Field
                        name="SA4_NAME_2016"
                        id="SA4_NAME_2016"
                        className={`form-control ${errors.SA4_NAME_2016 &&
                          touched.SA4_NAME_2016 &&
                          "is-invalid"}`}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    className="d-flex justify-content-end flex-wrap mt-2"
                    sm="12"
                  >
                    <Button.Ripple className="mr-1" color="primary" type="submit">
                      Save Changes
                    </Button.Ripple>
                  </Col>
                </Row>
              </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
}
export default EditModal
