import axios from "axios";

export class apiRequests{
    private USER_PER_PAGE: string = '25';
    headers = {Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}`};
    constructor(
        private URL:string = 'https://api.github.com/',
    ) {
    }

    async getAllUsers(userName:string){
         return await axios.get(`${this.URL}search/users`,{
            headers:this.headers,
            params:{
                per_page:5,
                q: userName || "oleg",
            },
        }).then((response) => response.data)
            .catch((error) => console.log(error))
    };

    async getAllUsersRepos(users:any) {
        if (users) {
        const res: any = await Promise.all(users.items.map((user: any) => axios.get(user.repos_url, {
            params: {
                per_page: 5,
            }
        })
            .then((response) => (response.data))));
        return res
    }
    };

    async getUser(login:string) {
        return await axios.get(`${this.URL}users/${login}`,{
            headers:this.headers,
        })
            .then((response) => response.data)
            .catch((error) => console.log(error))
    }

    async getUserRepos(login:string):Promise<any>{
        return await axios.get(`${this.URL}users/${login}/repos`,{
            headers:this.headers,
            params:{
                per_page: 5,
            }
        })
            .then((response)=> response.data)
            .catch((error) => console.log(error))
    }
    async getUserCorectRepos(login:string, inputValue:string){
        return await axios.get(`${this.URL}search/repositories?q=repo:${login}/${inputValue}`,{
            headers:this.headers,
        })
            .then((response)=> response.data)
            .catch((error) => console.log(error))
    }
}

const apiRequestInstance = new apiRequests();

export default apiRequestInstance;