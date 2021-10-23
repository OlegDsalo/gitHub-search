import axios from 'axios';

export class GithubService {
    private USER_PER_PAGE = '5';

    private headers = { Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}` };

    private readonly baseUrl = 'https://api.github.com/';

    async getAllUsers(userName: string) {
      return await axios.get(`${this.baseUrl}search/users`, {
        headers: this.headers,
        params: {
          q: userName || 'oleg',
          per_page: this.USER_PER_PAGE,
        },
      });
    }

    getAllUsersRepos(data: any) {
      return Promise.all(data.map((user: any) => axios.get(user.repos_url, {
        params: {
          per_page: 100,
        },
      }).then((response) => (response.data))));
    }

    async getUser(userName: string) {
      return await axios.get(`${this.baseUrl}users/${userName}`, {
        headers: this.headers,
      });
    }

    async getUserRepos(params: any) {
      return await axios.get(`${this.baseUrl}search/repositories?q=${params.inputValue} user:${params.userName} fork:true `, {
        headers: this.headers,
        params: {
          per_page: 100,
        },
      });
    }
}

const githubServiceInstance = new GithubService();

export default githubServiceInstance;
