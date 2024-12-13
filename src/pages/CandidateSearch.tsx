import { useState, useEffect } from 'react';
import ICandidate from '../interfaces/Candidate.interface';
import CandidateCard from "../components/CandidateCard";
import { searchGithub } from "../api/API";

interface ISearchResult {
  url: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const saveCandidate = (e: React.MouseEvent) => {
    e.preventDefault();
    const candidate = popCandidate();
    const savedCandidates: ICandidate[] = JSON.parse(
      localStorage.getItem('candidates') || "[]"
    );
    localStorage.setItem(
      'candidates',
      JSON.stringify([...savedCandidates, candidate])
    );
  };

  const popCandidate = (e?: React.MouseEvent) => {
    e?.preventDefault();
    const [firstItem, ...rest] = candidates;
    setCandidates(rest);
    return firstItem;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const searchResults: ISearchResult[] = await searchGithub();
        const users = await Promise.all(
          searchResults.map(result =>
            fetch(result.url, {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
              },
            })
              .then(res => res.json())
              .then(data => data.message ? null : data)
          )
        );
        setCandidates(users.filter(Boolean));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (candidates.length < 1) {
      fetchUsers();
    }
  }, [candidates.length]);

  if (isLoading) {
    return (
      <section>
        <h1>Candidate Search</h1>
        <div className="loading">
          <p>Loading candidates...</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1>Candidate Search</h1>
      {candidates.length > 0 ? (
        <div>
          <CandidateCard candidate={candidates[0]} />
          <form>
            <button onClick={saveCandidate} type="button">Save</button>
            <button onClick={popCandidate} type="button">Skip</button>
          </form>
        </div>
      ) : (
        <div className="loading">
          <p>No more candidates available</p>
        </div>
      )}
    </section>
  );
};

export default CandidateSearch;