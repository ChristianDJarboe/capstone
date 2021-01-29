import { connect } from 'react-redux'
import Dashboard from '../components/brandDash'

// import { removeCar } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        // user: state.user,
        // cars: state.cars
    }
}

// add mapDispatchToProps function here
const mapDispatchToProps = (dispatch) => {
    return {
        // removeCar: (index) => dispatch(removeCar(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)