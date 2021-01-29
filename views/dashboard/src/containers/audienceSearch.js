import { connect } from 'react-redux'
import AudienceSearch from '../components/campaignManager/audienceSearch'


const mapStateToProps = (state) => {
    return {
        campaigns: state.campaigns
    }
}




export default connect(mapStateToProps)(AudienceSearch)