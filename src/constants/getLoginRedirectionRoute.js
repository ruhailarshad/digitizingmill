import { Route } from "react-router-dom"
import RouteNames from "../routes/RouteNames"

const redirectLinkForRoles = {
    'admin': RouteNames.admin,
    'digitizer': RouteNames.digitizer,
    'sales-agent': RouteNames.salesAgent,
}

export const getRedirectLinkForLogin = (role) => {
    return redirectLinkForRoles[role];
}