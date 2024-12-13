import { useEffect, useState } from "react";
import ICandidate from "../interfaces/Candidate.interface";
import CandidateTableRow from "../components/CandidateTableRow.tsx";

const TABLE_HEADERS = [
  "Image",
  "Name",
  "Location",
  "Email",
  "Company",
  "Bio",
  "Actions"
] as const;

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>(() =>
    JSON.parse(localStorage.getItem("candidates") || "[]")
  );

  const removeCandidate = (login: string) => {
    setCandidates(prevCandidates =>
      prevCandidates.filter(candidate => candidate.login !== login)
    );
  };

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  return (
    <main>
      <h1>Saved Candidates</h1>
      {candidates.length === 0 ? (
        <div className="loading">
          <h2>No candidates have been saved yet</h2>
        </div>
      ) : (
        <table>
          <thead>
          <tr>
            {TABLE_HEADERS.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {candidates.map(candidate => (
            <CandidateTableRow
              key={candidate.login}
              candidate={candidate}
              removeCandidate={removeCandidate}
            />
          ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default SavedCandidates;