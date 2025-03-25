import { BeforeAll, Before } from '@cucumber/cucumber';
import {createLogger} from 'winston';
import {loggerFixture, options} from './logger';

Before(async function({pickle}){
  let scenarioName = pickle.name;
  loggerFixture.logger = createLogger(options(scenarioName));
});

