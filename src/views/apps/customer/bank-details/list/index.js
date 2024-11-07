// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const BankDetails = () => {
  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='4' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Accounts'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>21</h3>}
          />
        </Col>
        <Col lg='4' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Active Accounts'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>19</h3>}
          />
        </Col>
        <Col lg='4' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Pending Accounts'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>237</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default BankDetails
