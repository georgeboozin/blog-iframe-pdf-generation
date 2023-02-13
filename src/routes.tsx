import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom";
import { Navigator } from "./features/navigator";
import { Classic } from "./features/classic";
import { CssInJs } from "./features/css-in-js";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="" element={<Navigator />} />
      <Route path="classic/*" element={<Classic />} />
      <Route path="css-in-js/*" element={<CssInJs />} />
    </ReactRouterRoutes>
  );
}
