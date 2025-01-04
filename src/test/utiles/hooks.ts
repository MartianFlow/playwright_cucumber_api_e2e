import { chromium, Page, Browser, BrowserContext } from '@playwright/test'
import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber'
import { pageFixture } from './pageFixture';
import { invokeBrowser } from '../Helper/browsers';
import { getENV } from '../Helper/env/env';
import { createLogger } from 'winston';
import { options } from './logger';

let browser:Browser;
let context:BrowserContext;
let page:Page;

BeforeAll(async function(){
    getENV()
    browser = await invokeBrowser()
    context = await browser.newContext()
    page = await context.newPage()
    pageFixture.page = await page;

})

Before(async function({pickle}){
    let scenarioName = pickle.name + pickle.id;
    context = await browser.newContext()
    page = await context.newPage()
    pageFixture.page = await page;
    pageFixture.logger = createLogger(options(scenarioName))
})

AfterAll(async function(){
    await pageFixture.page.close()
    await context.close()
})

After(async function({ pickle, result }){
    if(result?.status == Status.FAILED){
        const images = await pageFixture.page.screenshot({ path: `./test-result/screenshot/${pickle.name}.png`, type:'png'})
        await this.attach(images, "image/png")
    }
})