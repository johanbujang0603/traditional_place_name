import { useEffect, useState } from 'react'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Spinner } from 'reactstrap'
import axios from 'axios'

// ** Table Zero Config Column
export const basicColumns = [
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
  }
]

const DataTablesBasic = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get('/api/rest/all-postcodes')
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          console.log(res.data.data)
          setData(res.data.data)
        }
      })
  }, [])
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
    </Card>
  )
}

export default DataTablesBasic
