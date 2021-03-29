import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { IQuestion } from '../interfaces/question';
import { IExercise } from '../interfaces/exercise';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService
{
  questionForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required)
  });

  initializequestionFrom()
  {
    this.questionForm.setValue({
      id: null,
      title: '',
      answer: ''
    });
  }

  poulatequestionForm(Faq: any)
  {
    this.questionForm.setValue(Faq);
  }

  exerciseForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    age: new FormControl(''),
    description: new FormControl('', Validators.required),
    wonder: new FormControl('', Validators.required),
    materials: new FormControl('', Validators.required),
    instructions: new FormControl('', Validators.required),
    extra: new FormControl('')
  });

  initializeexerciseFrom()
  {
    this.exerciseForm.setValue({
      $key: null,
      title: '',
      date: '',
      age: '',
      description: '',
      wonder: '',
      materials: '',
      instructions: '',
      extra: ''
    });
  }
  poulateexerciseForm(exercise: any)
  {
    this.exerciseForm.setValue(exercise);
  }
  constructor(private angularFirestore: AngularFirestore) { }
  // Faq crud service

  getQuestionDoc(id: any)
  {
    return this.angularFirestore.collection('question-collection')
      .doc(id).valueChanges();
  };

  getQuestionsList()
  {
    return this.angularFirestore.collection('question-collection')
      .snapshotChanges();
  }

  createQuestion(question: IQuestion)
  {
    return new Promise<any>(() =>
    {
      this.angularFirestore.collection('question-collection')
        .add(question)
        .then(response => { console.log(response); }, error => console.log
          (error));
    });
  };

  deleteQuestion(question: IQuestion)
  {
    return this.angularFirestore.collection('question-collection')
      .doc(question.$key).delete();
  }

  updateQuestion(question: IQuestion)
  {
    return this.angularFirestore.collection('question-collection')
      .doc(question.$key)
      .update({
        title: question.title,
        answer: question.answer
      });
  }

  getExercise()
  {
    return this.angularFirestore.collection('exercise')
      .snapshotChanges();
  }

  createExercise(exercise: IExercise)
  {
    return new Promise<any>(() =>
    {
      this.angularFirestore.collection('exercise')
        .add(exercise)
        .then(response => { console.log(response); }, error => console.log
          (error));
    });
  }

  updateExercise(exercise: IExercise)
  {
    return this.angularFirestore.collection('exercise')
      .doc(exercise.$key)
      .update({
        title: exercise.title,
        date: exercise.date,
        age: exercise.age,
        description: exercise.description,
        wonder: exercise.wonder,
        materials: exercise.materials,
        instructions: exercise.materials,
        extra: exercise.extra
      });
  }

  deleteExercise(id: any)
  {
    return this.angularFirestore.collection('exercise')
      .doc(id).delete();
  };
}
