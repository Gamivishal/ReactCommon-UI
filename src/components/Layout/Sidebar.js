import React from "react"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import SidebarContent from "./SidebarContent"

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(Sidebar))
