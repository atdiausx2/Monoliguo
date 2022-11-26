// require('fs'); 
// require('lodash'); 
import {fs} from 'fs';
import path from 'path';
import _ from 'lodash';  
import {shuffleSeed} from 'shuffle-seed'; 
require('lodash');

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

  public loadCSV() {
    const LIBRARY_PATH = `${__dirname}`;
    const HOME_PATH = path.join(`${LIBRARY_PATH}`, '../../..');

    let loadedData = fs.readFileSync(`${HOME_PATH}/${this.filename}`, {
      encoding: 'utf-8',
    });
    let rawData = _.map(loadedData.split('\n'), (d:any) => d.split(','));
    rawData = _.dropRightWhile(rawData, (val:any) => _.isEqual(val, ['']));
    const headers = _.first(rawData) || [];

    const new_data = _.map(rawData, (row: Value[], index: number) => {
      if (index == 0) {
        return row;
      }

      return _.map(row, (element: Value, index: number) => {
        // Based on the column name, activate the converter function
        // that will update the value in that column name, in the given row.

        // if (this.options.converters[headers[index]]) {
        //   const converted = this.options.converters[headers[index]](element);
        //   // console.log(converted);
        // }
        if (typeof element !== 'number') {
          element = parseFloat(element.replace('"', ''));
        }

        return element;
      });
    });

    // let labels: DataModel = this.extractColumns(
    //   new_data,
    //   this.options.labelColumns
    // );
    let extractedData: DataModel = this.extractColumns(
      new_data,
      this.options.dataColumns
    );

    extractedData.shift();
    // labels.shift();

    // this.options.shuffle = false; 
    // if (this.options.shuffle) {
    //   extractedData = shuffleSeed.shuffle(extractedData, 'enrynewton');
    //   // labels = shuffleSeed.shuffle(labels, 'enrynewton');
    // }
    // const trainSize = Math.floor(extractedData.length * this.options.splitTest);

    const dataSet: DataSet = {
      features: extractedData,
      // labels: labels
      // testFeatures: extractedData.slice(0, trainSize),
      // testLabels: labels.slice(0, trainSize),
    };
    dataSet.features
    return dataSet;
  }



  }