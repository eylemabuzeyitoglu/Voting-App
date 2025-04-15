import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit{

  newPoll: Poll = {
    id: null,
    question: '',
    options: [
      {optionText: '', voteCount: 0},
      {optionText: '', voteCount: 0}
    ]
  }
  polls: Poll[] = [];
  constructor(private pollService:PollService){}

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls(){
    this.pollService.getPolls().subscribe({
      next: (data: Poll[]) =>{
        this.polls = data;
      },
      error:(error: any)=>{
        console.error("Error fetching polls: ",error);
      }
    });
  }
  addOption(){
    this.newPoll.options.push({optionText: '', voteCount: 0})
  }

  createPoll(){
    this.pollService.createPoll(this.newPoll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
      },
      error: (error:any) => {
        console.error("Error creating polls: ",error);
      }
    });
  }

  resetPoll(){
    this.newPoll = {
      id: null,
      question: '',
      options: [
        {optionText: '', voteCount: 0},
        {optionText: '', voteCount: 0}
      ]
    }
  }

  vote(pollId: number | null , optionIndex:number){
    if (pollId !== null) {
    this.pollService.vote(pollId,optionIndex).subscribe({
      next: () => {
        const poll = this.polls.find(p => p.id == pollId);
        if(poll){
          poll.options[optionIndex].voteCount++;
        }
      },
      error: (error:any) => {
        console.error("Error voting on a poll: ",error);
      }
    });
  } else {
    console.error('Poll ID is null');
  }
  }

  trackByIndex(index: number): number{
    return index;
  }
}
