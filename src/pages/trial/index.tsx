import React from "react";
import ReactGridLayoutDemo from "./components/reactGridLayoutDemo";
import GenesisDemo from "./components/genesisDemo";
import KLineChart from "./components/kLineDemo";

const TrialView: React.FC = () => {
  return (
    <>
      {/* <ReactGridLayoutDemo /> */}
      <GenesisDemo />
      <KLineChart />
    </>
  );
};

export default TrialView;
