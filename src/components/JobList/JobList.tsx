import { useEffect } from "react";
import { Loader, Pagination } from "@mantine/core";
import { useMatch, useSearchParams } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { fetchJobs } from "../../store/thunks/JobsThunks";
import { setPage } from "../../store/reducers/JobsSlice";
import { JobCard } from "../JobCard/JobCard";
import Style from "./JobList.style.module.scss";

export const JobList = () => {
  const dispatch = useTypedDispatch();
  const [searchParams] = useSearchParams();
  const petersburgMatch = useMatch("/vacancies/petersburg");

  const city = petersburgMatch ? "Санкт-Петербург" : "Москва";
  const search = searchParams.get("search") ?? "";
  const skillsParam =
    searchParams.get("skills") ?? "JavaScript,React,Redux,Python";

  const { jobs, isLoading, error, page, totalPages } = useTypedSelector(
    (state) => state.jobs,
  );

  useEffect(() => {
    const skills = skillsParam.split(",").filter(Boolean);

    dispatch(fetchJobs({ search, city, skills, page }));
  }, [dispatch, search, city, skillsParam, page]);

  const handleChangePage = (value: number) => {
    dispatch(setPage(value));
  };

  if (isLoading) {
    return (
      <div className={Style.message}>
        <Loader aria-label="Загрузка вакансий" />
      </div>
    );
  }

  if (error) {
    return (
      <p className={Style.message} role="alert">
        {error}
      </p>
    );
  }

  if (jobs.length === 0) {
    return <p className={Style.message}>Вакансии не найдены</p>;
  }

  return (
    <section className={Style.list} aria-label="Список вакансий">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {totalPages > 1 && (
        <Pagination
          className={Style.pagination}
          total={totalPages}
          value={page}
          onChange={handleChangePage}
        />
      )}
    </section>
  );
};
