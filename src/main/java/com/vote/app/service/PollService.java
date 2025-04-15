package com.vote.app.service;

import com.vote.app.model.OptionVote;
import com.vote.app.model.Poll;
import com.vote.app.repository.PollRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {
    private final PollRepository pollRepository;

    public PollService(PollRepository pollRepository) {
        this.pollRepository = pollRepository;
    }

    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId,int optionIndex){
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new RuntimeException("Poll is not found"));

        List<OptionVote> options = poll.getOptions();

        if(optionIndex<0 | optionIndex >= options.size()){
            throw new IllegalArgumentException("Invalid option index");
        }

        OptionVote selectedOption = options.get(optionIndex);
        selectedOption.setVoteCount(selectedOption.getVoteCount() + 1);

        pollRepository.save(poll);

     }
}
