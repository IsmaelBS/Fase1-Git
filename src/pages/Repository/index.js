import React, { Component } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';

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
  };

  async componentDidMount() {
    const repo_name = decodeURIComponent(this.props.match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`repos/${repo_name}`),
      api.get(`repos/${repo_name}/issues`, {
        params: {
          state: 'open',
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

  render() {
    const { repository, issues, loading } = this.state;
    return <h1>Repository</h1>;
  }
}
