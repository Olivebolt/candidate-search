import ICandidate from "../interfaces/Candidate.interface.tsx";
import {Link} from "react-router-dom";

interface IProps {
  candidate: ICandidate;
}

function CandidateCard({ candidate: { avatar_url, name, login, email, company, bio } }: IProps) {
  return (
    <div className="candidate-card">
      <img src={avatar_url} alt="Candidates Profile Picture" />
      <h3>{name ? `${name} (${login})` : login}</h3>
      {email && <p>Email: <Link to={email}>{email}</Link></p>}
      {company && <p>Company: {company}</p>}
      {bio && <p>Bio: {bio}</p>}
    </div>
  )
}

export default CandidateCard;