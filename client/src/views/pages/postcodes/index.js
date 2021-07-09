import { useEffect, useState } from 'react'

// ** Third Party Components
import { ChevronDown, Edit } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Spinner, Button } from 'reactstrap'
import axios from 'axios'

import EditModal from './EditModal'

const DataTablesBasic = () => {
  const [data, setData] = useState([])
  const [selectedData, updateSelectedData] = useState(null)
  const [editModalOpen, updateEditModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('/api/rest/all-postcodes')
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          setData(res.data.data)
        }
      })
  }, [])

  const handleEdit = (row) => {
    updateSelectedData(row)
    updateEditModalOpen(true)
  }

  const toggleEditModal = () => {
    updateEditModalOpen(!editModalOpen)
  }
  

  const onSuccess = (item) => {
    const items = [...data]
    const foundIndex = items.findIndex(x => x._id === item.id)
    items[foundIndex] = { ...items[foundIndex], ...item.newValues }
    setData(items)
    updateEditModalOpen(false)
  }


  const basicColumns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
      maxWidth: '100px'
    },
    {
      name: 'Postcode',
      selector: 'postcode',
      sortable: true,
      minWidth: '225px'
    },
    {
      name: 'Locality',
      selector: 'locality',
      sortable: true,
      minWidth: '310px'
    },
    {
      name: 'State',
      selector: 'state',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: 'Long',
      selector: 'long',
      sortable: true,
      minWidth: '100px'
    },
    {
      name: 'Lat',
      selector: 'lat',
      sortable: true,
      minWidth: '175px'
    },
    {
      name: 'Actions',
      selector: '_id',
      cell: row => (
        <Button.Ripple color='flat-danger' onClick={() => handleEdit(row)}>
          <Edit size={14} />
        </Button.Ripple>
      )
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Post Codes</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        columns={basicColumns}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        progressPending={loading}
        progressComponent={
          <div className="py-3 d-flex align-items-center text-primary">
            <Spinner color="primary" size="24" className="mr-1" /> Loading...
          </div>
        }
      />
      <EditModal
        modalOpen={editModalOpen}
        toggle={toggleEditModal}
        selectedData={selectedData}
        onSuccess={onSuccess}
      />
    </Card>
  )
}

export default DataTablesBasic
