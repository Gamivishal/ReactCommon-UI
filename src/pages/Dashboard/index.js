import React , {useEffect} from "react"
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { SITE_TITLE } from "../../common/common";

const Dashboard = (props) => {

  document.title = `Dashboard | ${SITE_TITLE}`;


  const breadcrumbItems = [
    { title: "Lexa", link: "#" },
    { title: "Dashboard", link: "#" }
  ]

  useEffect(() => {
    props.setBreadcrumbItems('Dashboard' , breadcrumbItems)
  },)

 

  return (
    <React.Fragment>

      
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard);