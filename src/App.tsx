import { Tabs } from "@mantine/core";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Search } from "./components/Search/Search";
import { Filters } from "./components/Filters/Filters";
import { JobList } from "./components/JobList/JobList";
import { VacancyPage } from "./pages/VacancyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useTypedDispatch } from "./hooks/redux";
import { setPage } from "./store/reducers/JobsSlice";
import Style from "./App.style.module.scss";

const VacanciesPage = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { pathname, search } = useLocation();

  const city = pathname.startsWith("/vacancies/petersburg")
    ? "petersburg"
    : "moscow";

  const handleChangeCity = (value: string | null) => {
    if (value && value !== city) {
      dispatch(setPage(1));
      navigate(`/vacancies/${value}${search}`);
    }
  };

  return (
    <main className={Style.page}>
      <div className={Style.top}>
        <div className={Style.title}>
          <h1>Список вакансий</h1>
          <p>по профессии Frontend-разработчик</p>
        </div>

        <Search />
      </div>

      <div className={Style.content}>
        <Filters />

        <div>
          <Tabs value={city} onChange={handleChangeCity}>
            <Tabs.List>
              <Tabs.Tab value="moscow">Москва</Tabs.Tab>
              <Tabs.Tab value="petersburg">Санкт-Петербург</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Outlet />
        </div>
      </div>
    </main>
  );
};

const App = () => {
  const { search } = useLocation();

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/vacancies/moscow${search}`} replace />}
        />

        <Route path="/vacancies" element={<VacanciesPage />}>
          <Route index element={<Navigate to={`moscow${search}`} replace />} />
          <Route path="moscow" element={<JobList />} />
          <Route path="petersburg" element={<JobList />} />
        </Route>

        <Route path="/vacancies/:id" element={<VacancyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
