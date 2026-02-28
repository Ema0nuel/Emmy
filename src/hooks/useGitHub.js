import { useState, useEffect } from "react";
import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

// Validation on hook initialization
if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    console.warn(
        "GitHub API credentials missing. Check .env file for VITE_GITHUB_TOKEN and VITE_GITHUB_USERNAME"
    );
}

// Axios instance with auth headers
const githubAPI = axios.create({
    baseURL: GITHUB_API_BASE,
    headers: {
        Authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : "",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    },
    timeout: 10000,
});

// Cache management
const cache = new Map();
const CACHE_TIME = import.meta.env.VITE_GITHUB_API_CACHE_TIME || 3600000;

const getCachedData = (key) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
        return cached.data;
    }
    cache.delete(key);
    return null;
};

const setCachedData = (key, data) => {
    cache.set(key, { data, timestamp: Date.now() });
};

// Fetch user profile with stats
export const useGitHubUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Validate credentials
                if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
                    throw new Error(
                        "GitHub credentials not configured. Add VITE_GITHUB_TOKEN and VITE_GITHUB_USERNAME to .env"
                    );
                }

                const cachedUser = getCachedData("user");
                if (cachedUser) {
                    setUser(cachedUser);
                    setLoading(false);
                    return;
                }

                const { data } = await githubAPI.get(`/users/${GITHUB_USERNAME}`);
                setCachedData("user", data);
                setUser(data);
                setError(null);
            } catch (err) {
                const errorMsg =
                    err.response?.status === 401
                        ? "Invalid GitHub token. Check VITE_GITHUB_TOKEN in .env"
                        : err.response?.status === 404
                            ? `GitHub user '${GITHUB_USERNAME}' not found`
                            : err.message || "Failed to fetch user data";
                setError(errorMsg);
                console.error("GitHub User Error:", errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

// Fetch recent commits
export const useGitHubCommits = () => {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
                    throw new Error("GitHub credentials not configured");
                }

                const cachedCommits = getCachedData("commits");
                if (cachedCommits) {
                    setCommits(cachedCommits);
                    setLoading(false);
                    return;
                }

                // Fetch last 6 months of commit events
                const { data } = await githubAPI.get(
                    `/users/${GITHUB_USERNAME}/events/public`,
                    {
                        params: { per_page: 100 },
                    }
                );

                // Filter and map push events to commits
                const commitEvents = data
                    .filter((event) => event.type === "PushEvent" && event.payload?.commits)
                    .slice(0, 20)
                    .map((event) => ({
                        id: event.id,
                        repo: event.repo.name,
                        message: event.payload.commits[0]?.message || "Commit",
                        url: `https://github.com/${event.repo.name}`,
                        timestamp: event.created_at,
                        count: event.payload.commits?.length || 1,
                    }));

                setCachedData("commits", commitEvents);
                setCommits(commitEvents);
                setError(null);
            } catch (err) {
                const errorMsg = err.message || "Failed to fetch commits";
                setError(errorMsg);
                setCommits([]);
                console.error("GitHub Commits Error:", errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchCommits();
    }, []);

    return { commits, loading, error };
};

// Fetch top repositories
export const useGitHubRepos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
                    throw new Error("GitHub credentials not configured");
                }

                const cachedRepos = getCachedData("repos");
                if (cachedRepos) {
                    setRepos(cachedRepos);
                    setLoading(false);
                    return;
                }

                const { data } = await githubAPI.get(`/users/${GITHUB_USERNAME}/repos`, {
                    params: {
                        sort: "stars",
                        order: "desc",
                        per_page: 9,
                        type: "owner",
                    },
                });

                const topRepos = data.map((repo) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description || "No description provided",
                    url: repo.html_url,
                    stars: repo.stargazers_count || 0,
                    forks: repo.forks_count || 0,
                    language: repo.language || "python",
                    topics: repo.topics || [],
                    updatedAt: repo.updated_at,
                }));

                setCachedData("repos", topRepos);
                setRepos(topRepos);
                setError(null);
            } catch (err) {
                const errorMsg = err.message || "Failed to fetch repositories";
                setError(errorMsg);
                setRepos([]);
                console.error("GitHub Repos Error:", errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return { repos, loading, error };
};

// Fetch contribution stats
export const useGitHubContributions = () => {
    const [stats, setStats] = useState({
        totalContributions: 0,
        totalRepos: 0,
        totalFollowers: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
                    throw new Error("GitHub credentials not configured");
                }

                const cachedStats = getCachedData("contributions");
                if (cachedStats) {
                    setStats(cachedStats);
                    setLoading(false);
                    return;
                }

                const { data } = await githubAPI.get(`/users/${GITHUB_USERNAME}`);

                const statsData = {
                    totalContributions: data.public_repos || 0,
                    totalRepos: data.public_repos || 0,
                    totalFollowers: data.followers || 0,
                };

                setCachedData("contributions", statsData);
                setStats(statsData);
                setError(null);
            } catch (err) {
                const errorMsg = err.message || "Failed to fetch stats";
                setError(errorMsg);
                console.error("GitHub Stats Error:", errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
};