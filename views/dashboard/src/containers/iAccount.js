import { connect } from 'react-redux'
import InfluencerAccount from '../components/influencerAccount'

 import { ig } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
       ig: state.ig
    }
}

// add mapDispatchToProps function here
const mapDispatchToProps = (dispatch) => {
    return {
        //  ig: (payload) => dispatch(ig(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerAccount)