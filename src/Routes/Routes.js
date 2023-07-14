import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouteStrings } from "./RouteStrings";
import { HomeComponents } from "../pages/Home";

export const RoutesComponents = () => {
  return (
    <div>
      <Routes>
        <Route path={RouteStrings.home} element={<HomeComponents />} />
      </Routes>
    </div>
  );
};
