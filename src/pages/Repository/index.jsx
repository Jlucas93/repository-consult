import React from "react"
import { useParams } from "react-router-dom"
import { FaArrowLeft } from 'react-icons/fa'
import {
  Container,
  Owner,
  BackButton,
  IssuesList,
  PageAction,
} from './style'
import api from "../../services/api"

export default function Repository() {
  //  States 
  const [repository, setRepository] = React.useState({})
  const [page, setPage] = React.useState(1)
  const [issues, setIssues] = React.useState([])
  const [loading, setLoading] = React.useState(true)
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
        state: 'open',
        page,
        per_page: 5,
      }
    })
      .then(({ data }) => setIssues(data))
      .catch(({ message }) => console.error(message))

  }, [page])

  React.useEffect(() => {
    api.get(`repos/${reponame}/issues`, {
      params: {
        state: 'open',
        per_page: 5,
      }
    })
      .then(({ data }) => setIssues(data))
      .catch(({ message }) => console.error(message))

    api.get(`repos/${reponame}`)
      .then(({ data }) => setRepository(data))
      .then(() => setLoading(false))
      .catch(({ message }) => console.error(message))

  }, [reponame])

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

          <IssuesList>

            {issues.length <= 0 ?
              <span>Não possui Issues abertas</span>
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