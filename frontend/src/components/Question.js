import React from 'react';
import AnswerOption from './AnswerOption';
import { Card, CardContent, Typography } from '@mui/material';

function Question({ question, onAnswer, userAnswer, correctAnswer }) {
  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {question.question}
        </Typography>
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            questionId={question.id}
            onAnswer={onAnswer}
            correctAnswer={correctAnswer} // Passe a correctAnswer
            userAnswer={userAnswer === option}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default Question;