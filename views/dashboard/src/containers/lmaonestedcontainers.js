import { connect } from 'react-redux'
import Dashboard from '../containers/dashboard'

import { updateUser } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        // user: state.user,
        // cars: state.cars
    }
}

// add mapDispatchToProps function here
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (payload) => dispatch(updateUser(payload))
    }
}

export default connect(null, mapDispatchToProps)(Dashboard)