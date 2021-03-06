export interface UserReposValue {
    name: string;
    html_url: string;
    forks: number;
    stargazers_count: number;
}

export interface UserProfileValue {
    login: string,
    location: string,
    email: string,
    created_at: string,
    followers: number,
    following: number,
    bio: string,
    avatar_url: string;
}
