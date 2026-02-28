import { useState, useEffect } from 'react';

const useGitHub = () => {
    const [data, setData] = useState({
        repos: 0,
        totalStars: 0,
        recentCommits: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const username = import.meta.env.VITE_GITHUB_USERNAME;
                const token = import.meta.env.VITE_GITHUB_TOKEN;

                const headers = token ? { Authorization: `token ${token}` } : {};

                // Fetch user repos
                const reposRes = await fetch(
                    `https://api.github.com/users/${username}/repos?per_page=100`,
                    { headers }
                );
                const repos = await reposRes.json();

                const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
                const repoCount = repos.length;

                // Fetch recent commits (from multiple repos)
                const commits = [];
                for (let i = 0; i < Math.min(3, repos.length); i++) {
                    const commitRes = await fetch(
                        `https://api.github.com/repos/${username}/${repos[i].name}/commits?per_page=5`,
                        { headers }
                    );
                    const repoCommits = await commitRes.json();
                    if (Array.isArray(repoCommits)) {
                        commits.push(
                            ...repoCommits.slice(0, 2).map(c => ({
                                repo: repos[i].name,
                                message: c.commit.message.split('\n')[0],
                                date: c.commit.author.date,
                                sha: c.sha.slice(0, 7),
                            }))
                        );
                    }
                }

                setData({
                    repos: repoCount,
                    totalStars,
                    recentCommits: commits.slice(0, 5),
                    loading: false,
                    error: null,
                });
            } catch (err) {
                console.error('GitHub API Error:', err);
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Failed to load GitHub data',
                }));
            }
        };

        fetchGitHubData();
    }, []);

    return data;
};

export default useGitHub;