import { SurveyModel } from '@/domain/models/survey';

export const mockSurveyModel = (): SurveyModel => (
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'image_link.com',
      answer: 'any_answer',
    }],
    date: new Date(),
  }
);

export const mockSurveyModels = (): SurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'image_link.com',
      answer: 'any_answer',
    }],
    date: new Date(),
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'image_link.com',
      answer: 'other_answer',
    },
    {
      answer: 'other_answer',
    }],
    date: new Date(),
  },
]);
