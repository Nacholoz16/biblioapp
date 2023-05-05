import { browser, by, element, promise } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('/');
  }

 async getTitleText():Promise<string>{
    return element(by.css('app-root .tituloCard')).getText();
  }

 async getTitleText1():Promise<string>{
    return element(by.css('app-root .titulo')).getText();
 }

 async getTitleText2():Promise<string>{
  return element(by.css('app-root .tituloCard')).getText();
}

async getTitleText3():Promise<string>{
  return element(by.css('app-root .tituloCard')).getText();
}



}
