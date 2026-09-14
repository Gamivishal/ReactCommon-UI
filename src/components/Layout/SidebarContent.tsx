import PropTypes from "prop-types"
import React, { useCallback, useEffect, useMemo, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter, { WithRouterProps } from "components/Common/withRouter"
import { Link, useLocation } from "react-router-dom"
import { parseMenuPages } from "types/menuItem"

const SidebarContent = (props: WithRouterProps) => {
  const location = useLocation()
  const ref = useRef<any>();
  const activateParentDropdown = useCallback((item: any) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = process.env.PUBLIC_URL + props.router.location.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [props.router.location.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
    if (window.innerWidth < 992) {
      document.body.classList.remove("sidebar-enable");
      document.body.classList.remove("vertical-collapsed");
    }
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const dynamicMenu = useMemo(() => {
    try {
      const menuList = parseMenuPages()
      if (!Array.isArray(menuList) || !menuList.length) {
        return []
      }

      const activeItems = menuList
        .filter(item => item && item.isActive && !item.isDeleted)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))

      const menuById = new Map(activeItems.map(item => [Number(item.id), item]))
      const rootParents = activeItems.filter(item => Number(item.parentId) === 0)

      const parentWithChildren = rootParents.map(parent => ({
        ...parent,
        children: activeItems.filter(
          child => Number(child.parentId) === Number(parent.id)
        ),
      }))

      // If backend returns child menu without parent row, show it as top-level.
      const orphanChildrenAsTopLevel = activeItems
        .filter(item => Number(item.parentId) !== 0 && !menuById.has(Number(item.parentId)))
        .map(item => ({
          ...item,
          parentId: 0,
          children: [],
        }))

      return [...parentWithChildren, ...orphanChildrenAsTopLevel]
    } catch (error) {
      return []
    }
  }, [])

  const getDynamicMenuLink = child => {
    const controller = (child?.controller || "").toLowerCase()

    if (child?.url && child.url !== "string") {
      return child.url.startsWith("/") ? child.url : `/${child.url}`
    }

    if (controller) {
      return controller.endsWith("s") ? `/${controller}` : `/${controller}s`
    }

    return "/#"
  }

  const getDynamicMenuIconClass = menuItem => {
    const iconValue = String(menuItem?.icon || "").trim()

    if (!iconValue) {
      return "mdi mdi-folder-outline"
    }

    if (iconValue.startsWith("mdi ")) {
      return iconValue
    }

    if (iconValue.startsWith("mdi-")) {
      return `mdi ${iconValue}`
    }

    return iconValue
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {dynamicMenu.length > 0 && (
              <>
                <li className="menu-title">Menu</li>
                {dynamicMenu.map(parent => (
                  <li key={`dynamic-parent-${parent.id}`}>
                    <Link
                      to={parent.children.length ? "/#" : getDynamicMenuLink(parent)}
                      className={parent.children.length ? "has-arrow waves-effect" : "waves-effect"}
                    >
                      <i className={getDynamicMenuIconClass(parent)}></i>
                      <span>{parent.name}</span>
                    </Link>

                    {parent.children.length > 0 && (
                      <ul className="sub-menu">
                        {parent.children.map(child => (
                          <li key={`dynamic-child-${child.id}`}>
                            <Link to={getDynamicMenuLink(child)}>
                              <i className={`${getDynamicMenuIconClass(child)} me-1`}></i>
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </>
            )}

            {dynamicMenu.length === 0 && (
              <li>
                <Link to="/dashboard" className="waves-effect">
                  <i className="mdi mdi-view-dashboard"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
}

export default withRouter(SidebarContent)
