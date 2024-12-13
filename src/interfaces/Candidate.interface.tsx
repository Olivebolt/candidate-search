interface ICandidate {
    login: string;
    name: string;
    email: string;
    company: string;
    bio: string;
    status?: number;
    location: string;

    /**
     * Use *this* URL as the href for the profile picture img element!
     */
    avatar_url: string;
}

export default ICandidate;