import React from "react"
import { useParams } from "react-router-dom"
import { FaArrowLeft } from 'react-icons/fa'
import {
  Container,
  Owner,
  BackButton,
  IssuesList,
  PageAction,
  FilterList,
} from './style'
import api from "../../services/api"

export default function Repository() {
  //  States 
  const [repository, setRepository] = React.useState({})
  const [page, setPage] = React.useState(1)
  const [issues, setIssues] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [filters, setFilters] = React.useState([
    { state: 'all', label: 'Todos', active: false },
    { state: 'open', label: 'Abertos', active: false },
    { state: 'closed', label: 'Fechados', active: true },
  ])
  const [activeItem, setActiveItem] = React.useState(0)
  const { reponame } = useParams()

  // Methods

  function handlePage(action) {
    console.log(action)
    setPage(action === 'next' ? page + 1 : page - 1)
  }

  //  Effect
  React.useEffect(() => {
    api.get(`repos/${reponame}/issues`, {
      params: {
        state: filters[activeItem].state,
        page,
        per_page: 5,
      }
    })
      .then(({ data }) => setIssues(data))
      .catch(({ message }) => console.error(message))

  }, [page, activeItem, filters])

  React.useEffect(() => {
    api.get(`repos/${reponame}/issues`, {
      params: {
        state: filters[activeItem].state,
        per_page: 5,
      }
    })
      .then(({ data }) => setIssues(data))
      .catch(({ message }) => console.error(message))

    api.get(`repos/${reponame}`)
      .then(({ data }) => setRepository(data))
      .then(() => setLoading(false))
      .catch(({ message }) => console.error(message))

  }, [reponame, activeItem, filters])

  //  Render
  return (
    <>
      {!loading ? (
        <Container>

          <BackButton to='/' >
            <FaArrowLeft color="#000" size={14} />
          </BackButton>

          <Owner>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <FilterList active={activeItem}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => { setActiveItem(index) }}
              >
                {filter.label}
              </button>
            ))}
          </FilterList>

          <IssuesList>

            {issues.length <= 0 ?
              <h1>Este repositório não possui Issues!</h1>
              :
              issues?.map((issue) => (
                <li key={issue?.id}>
                  <img src={issue?.user.avatar_url} alt={issue?.user.login} />
                  <div>
                    <strong>
                      <a href={issue?.html_url}>{issue.title}</a>

                      {/*                     {issue?.labels.map((label) => (
                      <span key={label?.id}>{label?.name}</span>
                    ))} */}

                    </strong>
                    <p>{issue?.login}</p>
                  </div>
                </li>
              ))
            }

          </IssuesList>
          <PageAction>
            <button
              disabled={page < 2 ? true : false}
              type="button"
              onClick={() => { handlePage('back') }}>
              Voltar
            </button>

            <button
              type="button"
              onClick={() => { handlePage('next') }}
            >
              Póxima
            </button>
          </PageAction>
        </Container>
      ) : null}
    </>
  )
}