import ICandidate from "../interfaces/Candidate.interface.tsx";

interface IProps {
  candidate: ICandidate;
  removeCandidate(login: string): void;
}

function CandidateTableRow(props: IProps) {
  return (
    <tr>
      <td>
        <img className="avatar" src={props.candidate.avatar_url} alt="Candidate Profile Picture" />
      </td>
      <td>{props.candidate.name}</td>
      <td>{props.candidate.location}</td>
      <td>
        <a href={props.candidate.email}>{props.candidate.email}</a>
      </td>
      <td>
        {props.candidate.company}
      </td>
      <td>
        {props.candidate.bio}
      </td>
      <td>
        <button onClick={() => {
          props.removeCandidate(props.candidate.login)
        }}>-
        </button>
      </td>
    </tr>
  )
}

export default CandidateTableRow;