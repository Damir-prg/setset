import React, { useState } from 'react';
import { questions } from './questions';
import { Box, Button, Radio, RadioGroup, FormControlLabel, Typography, Paper, MobileStepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material';

const TestQuiz = ({ onLogout }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const [showResult, setShowResult] = useState(Array(questions.length).fill(false));

  const handleChange = (event) => {
    const updated = [...answers];
    updated[step] = Number(event.target.value);
    setAnswers(updated);
    // Показываем результат сразу после выбора
    const show = [...showResult];
    show[step] = true;
    setShowResult(show);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (finished) {
    return (
      <Box p={1} maxWidth={600} mx="auto" minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={onLogout}
            size="small"
          >
            Выйти
          </Button>
        </Box>
        <Typography variant="h5" gutterBottom align="center">Спасибо за прохождение теста!</Typography>
        <Typography variant="body1" align="center" mb={2}>Ваши ответы сохранены.</Typography>
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Вопрос</TableCell>
                <TableCell>Ваш ответ</TableCell>
                <TableCell>Правильный ответ</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((q, idx) => {
                const userAnswerIdx = answers[idx];
                const isCorrect = userAnswerIdx === q.correctIndex;
                return (
                  <TableRow key={idx} sx={{ bgcolor: isCorrect ? 'success.light' : 'error.light' }}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{q.text}</TableCell>
                    <TableCell>{userAnswerIdx !== null ? q.options[userAnswerIdx] : <em>Нет ответа</em>}</TableCell>
                    <TableCell>{q.options[q.correctIndex]}</TableCell>
                    <TableCell sx={{ color: isCorrect ? 'success.main' : 'error.main', fontWeight: 600 }}>
                      {isCorrect ? 'Верно' : 'Неверно'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  const q = questions[step];
  const selected = answers[step];
  const isAnswered = showResult[step];
  const isCorrect = selected === q.correctIndex;

  return (
    <Box p={1} maxWidth={480} mx="auto" minHeight="100vh" display="flex" flexDirection="column" justifyContent="center">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={onLogout}
          size="small"
        >
          Выйти
        </Button>
      </Box>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>{q.section}</Typography>
        <Typography variant="h6" gutterBottom>{q.text}</Typography>
        <RadioGroup value={selected ?? ''} onChange={handleChange}>
          {q.options.map((opt, idx) => {
            let color = 'default';
            if (isAnswered && selected === idx) {
              color = idx === q.correctIndex ? 'success' : 'error';
            }
            return (
              <FormControlLabel
                key={idx}
                value={idx}
                control={<Radio color={color} />}
                label={opt}
                sx={isAnswered && selected === idx ? {
                  bgcolor: color === 'success' ? 'success.light' : 'error.light',
                  borderRadius: 1,
                  pl: 1
                } : {}}
              />
            );
          })}
        </RadioGroup>
        {isAnswered && (
          <Typography variant="subtitle1" color={isCorrect ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
            {isCorrect ? 'Верно!' : `Неверно. Правильный ответ: ${q.options[q.correctIndex]}`}
          </Typography>
        )}
      </Paper>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Button 
          variant="outlined" 
          color="primary"
          size="small" 
          onClick={handlePrev} 
          disabled={step === 0} 
          sx={{ minWidth: 90, borderRadius: 2, boxShadow: 1 }}
        >
          Назад
        </Button>
        <MobileStepper
          variant="progress"
          steps={questions.length}
          position="static"
          activeStep={step}
          sx={{ flexGrow: 1, mx: 2, p: 0, background: 'none', boxShadow: 'none' }}
          nextButton={null}
          backButton={null}
        />
        <Button 
          size="small" 
          onClick={handleNext} 
          disabled={!isAnswered} 
          variant="contained" 
          color="primary"
          sx={{ minWidth: 90, borderRadius: 2, boxShadow: 1 }}
        >
          {step === questions.length - 1 ? 'Завершить' : 'Далее'}
        </Button>
      </Stack>
    </Box>
  );
};

export default TestQuiz; 