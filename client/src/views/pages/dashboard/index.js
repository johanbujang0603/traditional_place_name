import { useEffect, useState } from 'react'
import { Form, FormGroup, Label, Row, Col, Card, CardBody, Button } from 'reactstrap'
import axios from 'axios'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Autosuggest from 'react-autosuggest'

import './theme.css'

const Dashboard = () => {
  const [inputValue, updateInputValue] = useState('')
  const [postCodes, setPostCodes] = useState([])
  const [placeNames, setPlaceNames] = useState([])
  const [selectedPostcode, updateSelectedPostcode] = useState(null)
  const [selectedPlace, updateSelectedPlace] = useState(null)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    const fetchPlaceNames = () => {
      axios.get('/api/rest/placenames')
        .then((res) => {
          const { success } = res.data
          if (success === true) {
            const { data } = res.data
            setPlaceNames(data.map((d) => { return { ...d, value: d._id, label: d.name } }))
          }
        })
    }

    fetchPlaceNames()
  }, [])

  const fetchPostcodes = (value) => {
    setPostCodes([])
    axios.get(`/api/rest/postcodes?q=${value}`)
      .then((res) => {
        const { success } = res.data
        if (success === true) {
          const { data } = res.data
          setPostCodes(data)
        }
      })
  }

  const getSuggestionValue = (suggestion) => {
    updateSelectedPostcode(suggestion._id)
    return suggestion.locality
  }

  const renderSuggestion = (suggestion) => {
    return (
      <span><b>{suggestion.postcode}</b> - {suggestion.locality}</span>
    )
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    if (timer) clearTimeout(timer)

    if (value.length >= 3) setTimer(setTimeout(() => fetchPostcodes(value), 500))
  }

  const onSuggestionsClearRequested = () => {
    setPostCodes([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedPlace || !selectedPostcode) return
    axios.post('/api/rest/match', { placename: selectedPlace, postcode: selectedPostcode })
      .then((res) => {
        const { success } = res.data
        if (success) {
          updateSelectedPlace(null)
          updateSelectedPostcode(null)
          updateInputValue('')
          setTimer(null)
          setPostCodes([])
        }
      })
  }

  return (
    <Card>
      <CardBody>
        <Row>
          <Col sm="12">
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Col sm="6">
                  <Label>Post Code</Label>
                  <Autosuggest
                    suggestions={postCodes}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={
                      {
                        placeholder: "Type at least 3 characters",
                        className: "form-control",
                        value: inputValue,
                        onChange: (e, { newValue }) => {
                          updateInputValue(newValue)
                        }
                      }
                    }
                  />
                </Col>
                <Col sm="6">
                  <Label>Tradition Place Names</Label>
                  <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    value={placeNames.find((p) => p.value === selectedPlace)}
                    options={placeNames}
                    onChange={data => { updateSelectedPlace(data.value) }}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Button color="primary" type="submit">Submit</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Dashboard
