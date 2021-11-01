import axios from 'axios';

export class GithubService {
    private USER_PER_PAGE = '3';

    private headers = { Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}` };

    private readonly baseUrl = 'https://api.github.com/';

    async getAllUsers(params) {
      return await axios.get(`${this.baseUrl}search/users`, {
        headers: this.headers,
        params: {
          q: params.userName || 'oleg',
          per_page: this.USER_PER_PAGE,
          page: params.currentPage,
        },
      });
    }

    // getAllUsersRepos(data: any) {
    //   return Promise.all(data.map((user: any) => axios.get(user.repos_url, {
    //     params: {
    //       per_page: 1,
    //     },
    //   }).then((response) => (response.data))));
    // }

    getAllUsersRepos(data: any) {
      return Promise.all(data.map((user: any) => axios.get(`${this.baseUrl}search/repositories?q= user:${user.login} fork:true `, {
        params: {
          per_page: 1,
        },
      }).then((response) => {
        console.log(response.data);
        return (response.data);
      })));
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
          per_page: 10,
          page: params.repoPage,
        },
      });
    }
}

const githubServiceInstance = new GithubService();

export default githubServiceInstance;
