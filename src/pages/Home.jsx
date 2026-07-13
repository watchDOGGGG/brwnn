import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import ProgrammesGrid from "../components/ProgrammesGrid";
import BecomeMember from "../components/BecomeMember";

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <ProgrammesGrid />
      <BecomeMember />
    </>
  );
}
