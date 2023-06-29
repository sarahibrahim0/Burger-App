import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

/**
* @author
* @function WithRouter
**/

function WithRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();

      return (
        <Component
          {...props}
          params = {params}
          navigate = {navigate}
          location= {location}
        />
      );
    }
    return ComponentWithRouterProp;
  }

export default WithRouter;