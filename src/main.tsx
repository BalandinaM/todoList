import { createRoot } from "react-dom/client";
import "./index.css";
import { Header } from "./components/header/Header.tsx";
import { PageTitle } from "./components/pageTitle/PageTitle.tsx";
import { TasksList } from "./components/tasksList/TasksList.tsx";
import { TaskDetails } from "./components/taskDetails/TaskDetails.tsx";

const rootEl = document.getElementById("root");
const reactRoot = createRoot(rootEl!);
reactRoot.render(<MainPage />);

function MainPage() {
  return (
    <div>
      <Header />
      <PageTitle />
      <div style={{ display: "flex", gap: "30px" }}>
        <TasksList />
        <TaskDetails />
      </div>
    </div>
  );
}
