export interface OptionVote{
    optionText: string;
    voteCount: number;
}

export interface Poll {
    id: number | null;
    question: string;
    options: OptionVote[];
}
