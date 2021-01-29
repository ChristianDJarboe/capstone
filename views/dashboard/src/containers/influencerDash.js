import { connect } from 'react-redux'
import Dashboard from '../components/influencerDash'

 import { ig } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        // user: state.user,
        // cars: state.cars
    }
}

// add mapDispatchToProps function here
const mapDispatchToProps = (dispatch) => {
    return {
         ig: (payload) => dispatch(ig(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)