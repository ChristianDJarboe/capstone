import { connect } from 'react-redux'
import Landing from '../components/landing'

const mapStateToProps = (state) => {
    return {
        user_id:state.user_id,
        email:state.email,
        password:state.password,
        token:state.token,
        user_type:state.user_type
    }
}

export default connect(mapStateToProps)(Landing)
