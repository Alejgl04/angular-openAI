import { QuestionResponse } from '@interfaces/question.response';
import { environment } from 'environments/environment'

export const postQuestionUseCase = async( threadId: string, question: string ) => {
  try {

    const response = await fetch(`${environment.assistantApi}/user-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ threadId, question })
    });

    const replies = await response.json() as QuestionResponse[];

    return replies;

  } catch (error) {
   throw new Error('Something went wrong. Error creating thread Id')
  }
}
