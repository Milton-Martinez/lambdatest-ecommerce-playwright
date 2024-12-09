import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/index";

test.describe( 'LAMBDATEST: SHOPPING CART TESTS', () =>{
  let homepage:HomePage

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage( page );
    await homepage.openURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8');
  });

  test('Shopping flow', async ({ page }) => {
    await page.waitForTimeout( 3000 );
  });
})
