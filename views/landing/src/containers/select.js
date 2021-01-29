import { connect } from 'react-redux'
import Select from '../components/select'
import {updateUserType} from "../redux/actions"

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserType: (userType) => dispatch(updateUserType(userType))
    }
}


export default connect(null,mapDispatchToProps)(Select)
