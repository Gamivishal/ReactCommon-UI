import PropTypes from 'prop-types'
import React, { Component } from "react"
import withRouter from './Common/withRouter'

interface NonAuthLayoutProps {
  children?: React.ReactNode
  location?: any
}

class NonAuthLayout extends Component<NonAuthLayoutProps, {}> {
  constructor(props: NonAuthLayoutProps) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.object
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

export default withRouter(NonAuthLayout)
