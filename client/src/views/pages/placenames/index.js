import { useEffect, useState } from 'react'

// ** Third Party Components
import { ChevronDown, Edit } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Button } from 'reactstrap'
import axios from 'axios'

import EditModal from './EditModal'

const DataTablesBasic = () => {
  const [data, setData] = useState([])
  const [editModalOpen, updateEditModalOpen] = useState(false)
  const [selectedData, updateSelectedData] = useState(null)

  useEffect(() => {
    axios.get('/api/rest/placenames')
      .then((res) => {
        if (res.data.success === true) {
          setData(res.data.data)
        }
      })
  }, [])

  const toggleEditModal = () => {
    updateEditModalOpen(!editModalOpen)
  }

  const handleEdit = (row) => {
    updateSelectedData(row)
    updateEditModalOpen(true)
  }

  const onSuccess = (item) => {
    const items = [...data]
    const foundIndex = items.findIndex(x => x._id === item.id)
    items[foundIndex] = { _id: item.id, name: item.newValue, value: item.newValue }
    setData(items)
    updateEditModalOpen(false)
  }

  const basicColumns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true
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
        <CardTitle tag='h4'>Place Names</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        columns={basicColumns}
        className='react-dataTable'
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
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
