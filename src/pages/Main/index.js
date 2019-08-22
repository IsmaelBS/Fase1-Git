import React, { Component } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, SubmitButton, Form, List } from './Style';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  handleInputNewRepo = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
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
      });
    }
  };

  render() {
    const { newRepo, loading, repositories } = this.state;

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
              <a href="">Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
