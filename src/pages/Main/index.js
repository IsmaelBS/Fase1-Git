import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { SubmitButton, Form, List } from './Style';
import Container from '../../components/Container';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({
        repositories: JSON.parse(repositories),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.repositories !== prevState.repositories) {
      localStorage.setItem(
        'repositories',
        JSON.stringify(this.state.repositories)
      );
    }
  }

  handleInputNewRepo = e => {
    this.setState({ newRepo: e.target.value, error: false });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const alreadyExist = this.state.repositories.find(
      repository =>
        repository.name.toLowerCase() === this.state.newRepo.toLowerCase()
    );

    this.setState({ loading: true });

    try {
      if (alreadyExist) {
        throw new Error('Repositório duplicado!');
      }

      const { data: full_info } = await api.get(`/repos/${this.state.newRepo}`);

      const data = {
        id: full_info.id,
        name: full_info.full_name,
      };

      this.setState({
        repositories: [...this.state.repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithub></FaGithub>
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={e => this.handleInputNewRepo(e)}
            value={newRepo}
            placeholder="Adicionar repositório"
            className={error ? 'error' : undefined}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={16}></FaSpinner>
            ) : (
              <FaPlus color="#FFF" size={16}></FaPlus>
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.id}>
              <span>{repository.name}</span>
              <Link to={`repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
