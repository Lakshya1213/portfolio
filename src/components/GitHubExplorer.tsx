import React, { useState, useEffect } from 'react';
import { Search, Star, GitFork, ExternalLink, Code2, RefreshCw } from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
}

// Fallback cache of Lakshya's 34 GitHub Repositories
const INITIAL_REPOS: Repo[] = [
  { name: 'real-estate-doc-intelligence', description: 'AI document intelligence & OCR extraction for complex real estate deeds', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/real-estate-doc-intelligence', updatedAt: '2026-03-09' },
  { name: 'Multi_agent-main', description: 'Distributed autonomous multi-agent orchestration and tool routing', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Multi_agent-main', updatedAt: '2026-06-23' },
  { name: 'sales-brain', description: 'Predictive sales intelligence, RFM clustering and revenue forecasting', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/sales-brain', updatedAt: '2026-06-10' },
  { name: 'AI_SIGNAL', description: 'Algorithmic quantitative market signal detection and indicator triggers', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/AI_SIGNAL', updatedAt: '2026-06-24' },
  { name: 'meet_translator', description: 'Real-time audio streaming speech recognition and multilingual translation', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/meet_translator', updatedAt: '2026-07-21' },
  { name: 'sales_analysis', description: 'Exploratory data analysis, customer trend clustering, and cohort analysis', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/sales_analysis', updatedAt: '2026-07-30' },
  { name: 'Multi_agent', description: 'Experimental multi-agent reasoning and task decomposition pipeline', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Multi_agent', updatedAt: '2026-06-15' },
  { name: 'Task-5', description: 'Ultra-fast Markdown parser and ANSI syntax highlighter written in modern C++', language: 'C++', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Task-5', updatedAt: '2025-02-16' },
  { name: 'Advanced_chatbot', description: 'Conversational LLM assistant with custom knowledge grounding', language: 'Jupyter Notebook', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Advanced_chatbot', updatedAt: '2026-02-12' },
  { name: 'Metallurgy_Project', description: 'Computational materials simulation and mechanical data modeling at IIT Indore', language: 'Jupyter Notebook', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Metallurgy_Project', updatedAt: '2026-01-24' },
  { name: 'netflix-data-analysis', description: 'Exploratory data analysis and content trends clustering on Netflix global dataset', language: 'Jupyter Notebook', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/netflix-data-analysis', updatedAt: '2025-04-17' },
  { name: 'Airbnb-data-_analysis', description: 'Multivariate pricing and spatial demand modeling for hospitality data', language: 'Jupyter Notebook', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Airbnb-data-_analysis', updatedAt: '2025-04-17' },
  { name: 'Diabeties', description: 'Clinical predictive classification model using Scikit-Learn algorithms', language: 'Jupyter Notebook', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Diabeties', updatedAt: '2025-11-15' },
  { name: 'TextUtils-React', description: 'Interactive React application for text transformation and readability analysis', language: 'JavaScript', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/TextUtils-React', updatedAt: '2026-01-11' },
  { name: 'My-project', description: 'Interactive flash card & recommendation engine web application', language: 'JavaScript', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/My-project', updatedAt: '2025-01-25' },
  { name: 'Site_scraping', description: 'High-throughput automated web scraping and structured data pipeline', language: 'JavaScript', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Site_scraping', updatedAt: '2026-07-02' },
  { name: 'WEBSCRAPING', description: 'Python data harvesting pipeline with rate limiting and HTML sanitization', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/WEBSCRAPING', updatedAt: '2026-06-24' },
  { name: 'App_development', description: 'Native mobile application architecture in Kotlin', language: 'Kotlin', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/App_development', updatedAt: '2026-07-09' },
  { name: 'IITISOC', description: 'IIT Indore Summer of Code engineering repository and open-source contributions', language: 'Python', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/IITISOC', updatedAt: '2025-06-28' },
  { name: 'Power_BI-Project-', description: 'Executive KPI dashboards and relational data models in Power BI', language: 'Power BI', stars: 0, forks: 0, url: 'https://github.com/Lakshya1213/Power_BI-Project-', updatedAt: '2025-07-07' }
];

export const GitHubExplorer: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>(INITIAL_REPOS);
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live repos from GitHub API
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://api.github.com/users/Lakshya1213/repos?per_page=100&sort=updated');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: Repo[] = data.map((r: any) => ({
              name: r.name,
              description: r.description || 'Open-source project on GitHub',
              language: r.language || 'Code',
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              url: r.html_url,
              updatedAt: r.updated_at ? r.updated_at.split('T')[0] : '2026'
            }));
            setRepos(mapped);
          }
        }
      } catch (err) {
        console.warn('Using cached GitHub repos due to network/rate limits:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const languages = ['All', 'Python', 'Jupyter Notebook', 'C++', 'JavaScript', 'Kotlin'];

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
    const matchesLang =
      selectedLanguage === 'All' || r.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <section className="py-14 sm:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 p-6 sm:p-10 backdrop-blur-2xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                <GithubIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-outfit font-black text-2xl sm:text-3xl text-white">
                  GitHub Repositories
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  Live synchronized from @Lakshya1213 • 34 Public Repositories
                </p>
              </div>
            </div>

            {/* GitHub Profile Button */}
            <a
              href="https://github.com/Lakshya1213"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold transition-all self-start md:self-auto"
            >
              <span>View Profile on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Search Bar & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search repositories by name or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    sound.playClick();
                    setSelectedLanguage(lang);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                    selectedLanguage === lang
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="group p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                      {repo.name}
                    </h4>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {repo.description || 'Open-source project on GitHub'}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {repo.language || 'Code'}
                  </span>
                  <span>Updated {repo.updatedAt}</span>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
