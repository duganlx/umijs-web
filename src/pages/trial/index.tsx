import CardFactory from "./components/card";

const TrialView: React.FC = () => {
  const cards = [
    { title: "a1", conf: "b" },
    { title: "a2", conf: "b" },
    { title: "a3", conf: "b" },
    { title: "a4", conf: "b" },
    { title: "a5", conf: "b" },
    { title: "a6", conf: "b" },
  ];

  return (
    <>
      {cards.map((c) => {
        return <CardFactory ct="test" t={c.title} c={c.conf} />;
      })}
    </>
  );
};

export default TrialView;
