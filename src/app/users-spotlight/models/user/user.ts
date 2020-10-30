export interface User {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    score?: number;
}

export interface FullUser extends User {
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export const exampleUser: User = {
    login: 'example',
    id: 57936,
    node_id: 'MDQ6VXNlcjU3OTM2',
    avatar_url: 'https://avatars1.githubusercontent.com/u/57936?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/example',
    html_url: 'https://github.com/example',
    followers_url: 'https://api.github.com/users/example/followers',
    following_url: 'https://api.github.com/users/example/following{/other_user}',
    gists_url: 'https://api.github.com/users/example/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/example/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/example/subscriptions',
    organizations_url: 'https://api.github.com/users/example/orgs',
    repos_url: 'https://api.github.com/users/example/repos',
    events_url: 'https://api.github.com/users/example/events{/privacy}',
    received_events_url: 'https://api.github.com/users/example/received_events',
    type: 'User',
    site_admin: false,
    score: 1.0
};

export const exampleFullUser: FullUser = {
    login: 'test',
    id: 383316,
    node_id: 'MDQ6VXNlcjM4MzMxNg==',
    avatar_url: 'https://avatars3.githubusercontent.com/u/383316?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/test',
    html_url: 'https://github.com/test',
    followers_url: 'https://api.github.com/users/test/followers',
    following_url: 'https://api.github.com/users/test/following{/other_user}',
    gists_url: 'https://api.github.com/users/test/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/test/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/test/subscriptions',
    organizations_url: 'https://api.github.com/users/test/orgs',
    repos_url: 'https://api.github.com/users/test/repos',
    events_url: 'https://api.github.com/users/test/events{/privacy}',
    received_events_url: 'https://api.github.com/users/test/received_events',
    type: 'User',
    site_admin: false,
    name: null,
    company: null,
    blog: '',
    location: null,
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 5,
    public_gists: 0,
    followers: 24,
    following: 0,
    created_at: '2010-09-01T10:39:12Z',
    updated_at: '2020-04-24T20:58:44Z'
};

export const exampleFollowersData: FullUser[] = [
    exampleFullUser
];
