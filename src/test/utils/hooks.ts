import { BeforeAll, Before } from '@cucumber/cucumber';
import { getENV } from '../helper/env/env';
import {createLogger} from "winston";
import {loggerFixture, options} from "./logger";


BeforeAll(async function () {
  getENV();
});

Before(async function({pickle}){
  let scenarioName = pickle.name;
  loggerFixture.logger = createLogger(options(scenarioName));
})

