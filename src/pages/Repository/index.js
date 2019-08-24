import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PropTypes from 'prop-types';
import Container from '../../components/Container';
import { Loading, Owner, IssuesList, Pagination } from './Styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    states: ['open', 'closed', 'all'],
    selectedState: 'closed',
    currentPage: 1,
  };

  async componentDidMount() {
    const repo_name = decodeURIComponent(this.props.match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`repos/${repo_name}`),
      api.get(`repos/${repo_name}/issues`, {
        params: {
          state: this.state.selectedState,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async componentDidUpdate(_, prevState) {
    if (this.state.selectedState !== prevState.selectedState) {
      const { data: issues } = await api.get(
        `repos/${this.state.repository.full_name}/issues`,
        {
          params: {
            state: this.state.selectedState,
            per_page: 5,
            page: 1,
          },
        }
      );

      this.setState({ issues, currentPage: 1 });
    }

    if (this.state.currentPage !== prevState.currentPage) {
      const { data: issues } = await api.get(
        `repos/${this.state.repository.full_name}/issues`,
        {
          params: {
            state: this.state.selectedState,
            per_page: 5,
            page: this.state.currentPage,
          },
        }
      );

      this.setState({ issues });
    }
  }

  handleStateChange = e => {
    this.setState({ selectedState: e.target.value });
  };

  handlePrevPage = e => {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage - 1 < 1 ? currentPage : currentPage - 1,
    });
  };

  handleNextPage = e => {
    const { currentPage } = this.state;
    this.setState({
      currentPage: currentPage + 1,
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      states,
      selectedState,
      currentPage,
    } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.name} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesList>
          <select
            onChange={this.handleStateChange}
            defaultValue={selectedState}
          >
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}

          <Pagination>
            <button
              disabled={currentPage <= 1}
              onClick={this.handlePrevPage}
              type="button"
            >
              Prev
            </button>
            <button onClick={this.handleNextPage} type="button">
              Next
            </button>
          </Pagination>
        </IssuesList>
      </Container>
    );
  }
}
