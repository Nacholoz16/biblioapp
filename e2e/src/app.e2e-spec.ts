import { AppPage } from './app.po';

describe('Ejemplos de prueba', () => {
  let page: AppPage;

  //configuración
  beforeEach(() => {
    page = new AppPage();
  });


  //unidad de código
  it('Prueba 1',async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('¡Inicia sesión o Registrate!');
  });


  it('Prueba 2', async () => {
   await page.navigateTo();
    expect(await page.getTitleText1()).toEqual('');
  });

  it('Prueba 3', async () => {
    await page.navigateTo();
     expect(await page.getTitleText2()).toContain('Registrate');
   });
   
  it('Prueba 4', async () => {
    await page.navigateTo();
     expect(await page.getTitleText3()).toContain('Inicia');
   });


});
