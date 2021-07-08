import { useEffect, useState } from 'react'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'
import axios from 'axios'

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true
  }
]

const DataTablesBasic = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/rest/placenames')
      .then((res) => {
        if (res.data.success === true) {
          setData(res.data.data)
        }
      })
  }, [])
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
    </Card>
  )
}

export default DataTablesBasic
