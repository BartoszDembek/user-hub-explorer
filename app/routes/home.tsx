import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "User Hub Explorer" },
    { name: "description", content: "User Hub Explorer." },
  ];
}

export default function Home() {
  return <Welcome />;
}
