import React,{useEffect} from "react"
import { connect } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { SITE_TITLE } from "../../common/common";

const PagesBlank = (props) => {
    document.title = `Blank Page | ${SITE_TITLE}`;

    const breadcrumbItems = [
        { title: "Lexa", link: "#" },
        { title: "Pages", link: "#" },
        { title: "Blank page", link: "#" },
    ]

    useEffect(() => {
        props.setBreadcrumbItems('Blank page', breadcrumbItems)
    })

    return (
        <React.Fragment>
        </React.Fragment>
    )
}

export default connect(null, { setBreadcrumbItems })(PagesBlank);