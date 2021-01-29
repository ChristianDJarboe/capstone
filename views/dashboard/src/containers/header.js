import { connect } from 'react-redux'
import Header from '../components/header'


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}




export default connect(mapStateToProps,)(Header)