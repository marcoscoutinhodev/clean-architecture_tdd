import { SurveyModel } from '@/domain/models/survey';
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey';

export const mockSurveyModel = (): SurveyModel => (
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'any_answer',
    }, {
      image: 'image_link.link',
      answer: 'other_answer',
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

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
  date: new Date(),
});
