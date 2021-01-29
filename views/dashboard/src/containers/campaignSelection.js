import { connect } from 'react-redux'
import CampaignSelection from '../components/campaignManager/campaignSelection'

 import { campaigns } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        // user: state.user,
        // cars: state.cars
    }
}

// add mapDispatchToProps function here
const mapDispatchToProps = (dispatch) => {
    return {
        campaigns: (payload) => dispatch(campaigns(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignSelection)