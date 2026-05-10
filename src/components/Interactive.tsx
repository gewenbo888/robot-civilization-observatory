"use client";

import { PLATFORM_BY_ID } from "@/data/spec";
import { PLATFORM_ID } from "@/data/self";
import Lab from "./interactive/Lab";
import Atlas from "./interactive/Atlas";
import MatGrid from "./interactive/MatGrid";
import Tree from "./interactive/Tree";
import Qubit from "./interactive/Qubit";
import Agents from "./interactive/Agents";
import Energy from "./interactive/Energy";
import Fleet from "./interactive/Fleet";
import BCI from "./interactive/BCI";
import Recursion from "./interactive/Recursion";

export default function Interactive() {
  const self = PLATFORM_BY_ID[PLATFORM_ID];
  const data = self.sampleData;
  switch (self.kind) {
    case "lab":       return <Lab       data={data} hue={self.hue} />;
    case "atlas":     return <Atlas     data={data} hue={self.hue} />;
    case "matgrid":   return <MatGrid   data={data} hue={self.hue} />;
    case "tree":      return <Tree      data={data} hue={self.hue} />;
    case "qubit":     return <Qubit     data={data} hue={self.hue} />;
    case "agents":    return <Agents    data={data} hue={self.hue} />;
    case "energy":    return <Energy    data={data} hue={self.hue} />;
    case "fleet":     return <Fleet     data={data} hue={self.hue} />;
    case "bci":       return <BCI       data={data} hue={self.hue} />;
    case "recursion": return <Recursion data={data} hue={self.hue} />;
    default:          return null;
  }
}
