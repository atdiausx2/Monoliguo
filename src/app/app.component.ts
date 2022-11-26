import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

// require('lodash'); 
// import * as fs from 'fs';
// const fs = window.require('fs');

// const path = require('path')
// import path from 'path';
// import _ from 'lodash';  
const _ = require('lodash')
// import {shuffleSeed} from 'shuffle-seed'; 
// const shuffleSeed = window.require('shuffle-seed')
// require('lodash');

// require('parse_csv'); 

const Diff =require('diff');
// type da
// type DataSet = {
//   features: DataModel
//   // labels: DataModel
//   // testFeatures: DataModel;
//   // testLabels: DataModel;
// };

export type DataModel = Value[][];


type Headers = string[number];
// import typescript 
export type Value = string | number;
type Callback = (value: Value) => Value;
// type Converters = { [key: string]: Callback };
export type Options = {
  dataColumns: string[];
  // labelColumns: string[];
  // converters: Converters;
  // shuffle: boolean;
  // splitTest: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
};




export class CSVManager {
  constructor(public filename: string, public options: Options) {}

  private extractColumns(data: Value[][], columnNames: string[]) {
    const headers = _.first(data);

    let extracted: Value[][] = [];

    if (headers) {
      const indexes = _.map(columnNames, (column:any) => headers.indexOf(column));
      extracted = _.map(data, (row:any) => _.pullAt(row, indexes));
    }

    return extracted;
  }

  // public loadCSV() {
  //   const LIBRARY_PATH = `${__dirname}`;
  //   const HOME_PATH = path.join(`${LIBRARY_PATH}`, '../../..');

  //   let loadedData = fs.readFileSync(`${HOME_PATH}/${this.filename}`, {
  //     encoding: 'utf-8',
  //   });
  //   let rawData = _.map(loadedData.split('\n'), (d:any) => d.split(','));
  //   rawData = _.dropRightWhile(rawData, (val:any) => _.isEqual(val, ['']));
  //   const headers = _.first(rawData) || [];

  //   const new_data = _.map(rawData, (row: Value[], index: number) => {
  //     if (index == 0) {
  //       return row;
  //     }

  //     return _.map(row, (element: Value, index: number) => {
  //       // Based on the column name, activate the converter function
  //       // that will update the value in that column name, in the given row.

  //       // if (this.options.converters[headers[index]]) {
  //       //   const converted = this.options.converters[headers[index]](element);
  //       //   // console.log(converted);
  //       // }
  //       if (typeof element !== 'number') {
  //         element = parseFloat(element.replace('"', ''));
  //       }

  //       return element;
  //     });
  //   });

  //   // let labels: DataModel = this.extractColumns(
  //   //   new_data,
  //   //   this.options.labelColumns
  //   // );
  //   let extractedData: DataModel = this.extractColumns(
  //     new_data,
  //     this.options.dataColumns
  //   );

  //   extractedData.shift();
  //   // labels.shift();

  //   // this.options.shuffle = false; 
  //   // if (this.options.shuffle) {
  //   //   extractedData = shuffleSeed.shuffle(extractedData, 'enrynewton');
  //   //   // labels = shuffleSeed.shuffle(labels, 'enrynewton');
  //   // }
  //   // const trainSize = Math.floor(extractedData.length * this.options.splitTest);
  //     const dataset: Value[][] = extractedData;
  //   // const dataSet: DataSet = {
  //   //   features: extractedData,
  //   //   // labels: labels
  //   //   // testFeatures: extractedData.slice(0, trainSize),
  //   //   // testLabels: labels.slice(0, trainSize),
  //   // };
  //   // dataSet.features
  //   return dataset;
  // }



  }

  // main class for the application 

// title='string'; 
@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  dataset: string[][] = [];
  // public userArray: User[] = [];
  constructor(private http: HttpClient)
  {

    

    this.http.get('assets/NEW_source_texts.tsv', {responseType: 'text'}).
subscribe(
        data => {
            let csvToRowArray = data.split('\n');
            // console.log('csvToRowArrayLength', csvToRowArray.length);
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split("\t");
              // if ( index == 1){ 
                // console.log('row', row);
              // }
              this.dataset.push(row);
            }
            // this.dataset.push()
        this.dataset = csvToRowArray.map(data => data.split("\t") )
        // console.log(this.dataset);
        // console.log(this.dataset[1][9]
        //   )
        //   console.log(this.dataset[23][10])
        },
        error => {
            console.log(error);
        }
        
    );
  }
  title = 'Monoliguo';
  answerInput: string = '';
  result: string = ''
  assignmentSourceChunk:any= '';
  // assignmentText :string='';
  proceed_phrase:string = 'Submit';
  submission_phase: boolean = true; 

  no_assignments: number = 0; 
  difficultyLevel:string = 'intermediate';
  difficultyDictionary = new Map().set('difficult', 3).set('intermediate', 2).set('beginner', 1); 

  assignmentCorruptedText = 'Otrdien, es pieceļos astotais no rīta \r\nEs eju uz vannas istaba un es duša\r\nEs īzeja no dušas un nosusinu matus';
  assignmentCorrectText = 'Otrdien es pieceļos astoņos no rīta. Es eju uz vannas istabu, un es eju dušā. Es izeju no dušas un nosusinu matus.'

  
  dataColumns: string[] = [
    'id',
    'url',
    'image',
    'gender',
     'age', 
     'semesters',
     'mother_tongue',
  'other_languages', 
  'original_text', 
  'corrected_text'];
  first_assignment_pointer: number = 0;
  last_assignment_pointer: any = 0; 
  iter:number = 0;
  assignmentSourceCorruptedChunk:string = '';
  assignmentSourceCorrectChunk:string ='';

  // dataset: any 
  // difficultyDictionary.set('Difficult', 3);

//   var fs = require('fs');
// var parse = require('csv-parse');
// dataColumns =  
// load data\

//   dataset = new CSVManager(__filename = './essays_20211214.csv',
//  { 'dataColumns': this.dataColumns}
//   )
// .loadCSV();

  
  // loadData(){

  // }




  updateAssignment() {
    // this.loadData
    this.submission_phase = true;
    // console.log('difficulty', this.difficultyLevel)

    console.log('dict result', this.difficultyDictionary.get(this.difficultyLevel))
    // console.log(this.dataset)
    this.no_assignments = Math.floor(Math.random()*this.difficultyDictionary.get(this.difficultyLevel))+2;


    this.first_assignment_pointer = Math.floor(Math.random()*1015);
    // console.log(this.dataset[this.first_assignment_pointer][9])
    // console.log(this.dataset[this.first_assignment_pointer][8])
    // console.log('dataset', this.dataset )
    this.assignmentSourceCorruptedChunk = this.dataset[this.first_assignment_pointer][9]; 
    this.assignmentSourceCorrectChunk = this.dataset[this.first_assignment_pointer][10];
    // this.assignment
    // console.log('SourceCorrectChunk', this.assignmentSourceCorrectChunk)

    // this.last_assignment_pointer  = this.first_assignment_pointer + this.no_assignments;
    // this.assignme
    // console.log('this.no_assignments:' ,  this.no_assignments)
    // console.log(this.dataset[this.first_assignment_pointer])
    this.assignmentCorruptedText = this.assignmentSourceCorruptedChunk.split('.').slice(0,this.no_assignments).join(".").replace('"', '') + '.'
    this.assignmentCorrectText= this.assignmentSourceCorrectChunk.split('.').slice(0,this.no_assignments).join(".").replace('"', '') + '.'

    console.log(this.assignmentCorrectText)
// !fixme: we do not need this ! 
// 
  //   for (this.iter = this.first_assignment_pointer; this.iter < this.last_assignment_pointer;  this.iter++)
  //   this.assignmentText += this.assignmentSourceCorruptedChunk[this.iter]
  //   console.log(this.assignmentText)
  // // }
  }

  copyToClipboardEvent(){ 
  };

  clearTextEvent(){
    this.answerInput = '';
  }

  parseData(){
    
  }

  clickEvent(){ 
    this.submission_phase = false;
    this.result='';
    this.proceed_phrase = "Next Assignment";
    const diff = Diff.diffChars(this.answerInput, this.assignmentCorrectText);
    diff.forEach((part
    : any) => {
    // green for additions, red for deletions
    // grey for common parts
    // console.log(part);
    const color = part.added ? 'green' :
      part.removed ? 'red' : 'grey';
      this.result += `<span 
      class=${color}>${part.value}</span>`
  });

  // [ngStyle] ="{'class':${color}

  // console.log(this.result);
  // class=${color}
  }
//  ` }>`
  
    // Check(/)

    // {'background-color':${color}
  
}








  