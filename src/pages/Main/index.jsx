import React from 'react'
import {
  FaGithub,
  FaPlus,
  FaSpinner,
  FaBars,
  FaTrash
} from 'react-icons/fa'
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  DeleteButton,
  SpanError,
} from './styles'

import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function Main() {

  const [repoName, setRepoName] = React.useState('')
  const [repository, setRepository] = React.useState(getRepos())
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  function getRepos() {

    const repoStorage = localStorage.getItem('repos')

    if (repoStorage) {
      return JSON.parse(repoStorage)
    }
    return []

  }

  React.useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repository))
  }, [repository])


  const handleSubmit = React.useCallback((element) => {
    element.preventDefault()

    setLoading(true)

    if (repoName === '') {
      setError('Digite o nome de um repositório')
      setLoading(false)
      return
    }

    const is_repeated = repository.find(repo => repo.full_name === repoName)

    if (is_repeated) {
      setError('Repositório já existe')
      setLoading(false)
      return
    }

    setError(null)
    api.get(`repos/${repoName}`)
      .then(({ data }) => { setRepository([...repository, data]) })
      .catch(({ message }) => {
        setError(`Não foi possível localizar o repositório: ${repoName}`),
          console.error(message)
      })
      .finally(() => {
        setLoading(false)
      })


    setRepoName('')
  }, [repoName, repository])


  function handleinputChange(element) {
    setRepoName(element.target.value)
    setError(null)
  }

  const handleDelete = React.useCallback((id) => {
    const filtred_repos = repository.filter(repository => repository.id !== id)

    setRepository(filtred_repos)

  }, [repository])


  return (
    <Container>

      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <Input
          error={error}
          type="text"
          placeholder="Adicionar Repositorios"
          value={repoName}
          onChange={handleinputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>

      </Form>
      {error ? (<SpanError>{error}</SpanError>) : null}

      <List>
        {repository.map(repo => (
          <li key={repo.full_name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.id)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.full_name}
            </span>
            <Link to={`/repository/${encodeURIComponent(repo.full_name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>

    </Container>
  )
}