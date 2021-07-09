import { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form, Label, Input } from 'reactstrap'
import axios from 'axios'

const EditModal = ({ modalOpen, toggle, selectedData, onSuccess }) => {
  const [inputValue, updateValue] = useState('')

  useEffect(() => {
    if (selectedData) updateValue(selectedData.name)
  }, [selectedData])

  const handleChange = (e) => {
    updateValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/rest/update-placename', { id: selectedData._id, name: inputValue })
      .then((res) => {
        const { success } = res.data
        if (success === true) {
          onSuccess({ id: selectedData._id, newValue: inputValue })
        } else {
          toggle()
        }
      })
  }

  return (
    <Modal isOpen={modalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Placename</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Placename:</Label>
            <Input type="text" className="form-control" name="placename" value={inputValue} onChange={handleChange} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default EditModal
