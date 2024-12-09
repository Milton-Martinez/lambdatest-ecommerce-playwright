import { test, expect } from '@playwright/test';
import { HomePage, Navbar, Shop } from "../pages/index";

test.describe( 'LAMBDATEST: SHOPPING CART TESTS', () =>{
  let homepage:HomePage, navbar:Navbar, shop:Shop;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage( page );
    navbar = new Navbar( page );
    shop = new Shop( page );
    await homepage.openURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  test('Shopping flow', async ({ page }) => {
    //buy the first item
    await navbar.OpenShopByCategoryMenu();
    await navbar.SelectCategory(0);
    await shop.scrollToProducts();
    await shop.addToCart(0);
    //buy the second  item
    await navbar.OpenShopByCategoryMenu();
    await navbar.SelectCategory(1);
    await shop.scrollToProducts();
    await shop.addToCart(1);
    //close popup
    await shop.closePopUp();
    //click cart button
    await shop.clickCartButton();
    //expect
    await shop.compareTotalAndSumPrices();
  });
})
