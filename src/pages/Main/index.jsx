import React from 'react';
import {
  FaGithub,
  FaPlus,
  FaSpinner,
  FaBars,
  FaTrash
} from 'react-icons/fa';
import {
  Container,
  Form,
  SubmitButton,
  List,
  DeleteButton
} from './styles';

import api from '../../services/api';

export default function Main() {

  const [repoName, setRepoName] = React.useState('');
  const [repositorios, setRepositorios] = React.useState(getRepos());
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(null);

  function getRepos() {

    const repoStorage = localStorage.getItem('repos');

    if (repoStorage) {
      return JSON.parse(repoStorage)
    }
    return []

  }

  React.useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null);
      try {

        if (repoName === '') {
          throw new Error('Você precisa indicar um repositorio!');
        }

        const response = await api.get(`repos/${repoName}`);

        const hasRepo = repositorios.find(repo => repo.name === repoName);

        if (hasRepo) {
          throw new Error('Repositorio Duplicado');
        }

        const data = {
          name: response.data.full_name,
        }

        setRepositorios([...repositorios, data]);
        setRepoName('');
      } catch (error) {
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
      }

    }

    submit();

  }, [repoName, repositorios]);

  function handleinputChange(e) {
    setRepoName(e.target.value);
    setAlert(null);
  }

  const handleDelete = React.useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios]);


  return (
    <Container>

      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
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

      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>

    </Container>
  )
}