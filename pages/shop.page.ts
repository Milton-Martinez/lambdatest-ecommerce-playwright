import { type Locator, type FrameLocator, type Page, expect } from "@playwright/test";
import Methods from "./methods.page";

export class Shop extends Methods{

    /* LOCATORS */
    readonly addItemToCart:Locator;
    readonly cart:Locator;
    readonly productsContainer:Locator;
    readonly productToHover:Locator;
    readonly closeButtonPopup:Locator;
    readonly popupContainer:Locator;
    readonly prices:Locator;
    purchasedItems = 0;

    /** LOCATORS STRING **/
    /* BUTTONS */
    Locator_button_addItemToCart = '.btn.btn-cart'; //return multiple objects
    Locator_button_cart = '.cart'; //return multiple objects
    /* ITEMS TO ACTIVATE HOVER */
    Locator_item_product = '.product-thumb-top'; //return multiple objects
    /* PRICES */
    Locator_item_purchased = 'td.text-right'

    constructor(page:Page) {
        super(page);
        this.productsContainer = page.locator('[data-list="product-layout product-list col-12"]');
        this.addItemToCart = page.locator(this.Locator_button_addItemToCart);
        this.cart = page.locator(this.Locator_button_cart);
        this.productToHover = page.locator(this.Locator_item_product);
        this.closeButtonPopup = page.locator('.ml-2.mb-1.close span');
        this.popupContainer = page.locator('.toast.m-3.fade.show');
        this.prices = page.locator(this.Locator_item_purchased);
    }

    async scrollToProducts(){
        await this.productsContainer.scrollIntoViewIfNeeded();
    }
    async addToCart(itemPosition:number = 0){
        await this.hoverAnElement( this.productToHover.nth(itemPosition), this.Locator_item_product);
        await this.clickAnElement( this.addItemToCart.nth(itemPosition), this.Locator_button_addItemToCart );
        this.purchasedItems++;
    }
    async closePopUp(){
        await this.popupContainer.waitFor({ state:'visible' });
        const popupOn = await this.popupContainer.isVisible();
        if (popupOn) {
            await this.closeButtonPopup.click();
        }
    }
    async clickCartButton(){
        await this.clickAnElement(this.cart.nth(0), this.Locator_button_cart);
    }
    removeDollarSign(item){//Removing $ sign and converting a string to number
        return Number(item.replace('$',''));
    }
    async sumPrices(){
        let sum = 0; //variable to return
        //Getting all values from cart menu
        const itemPriceText =  await this.prices.allTextContents();
        //Removing $ sign and converting a string to number
        const itemPrice = await Promise.all(itemPriceText.map( e =>{
            if (e.includes('$')) {
                return this.removeDollarSign(e);
            }
        }))
        //sum
        for (let index = 0; index < this.purchasedItems; index++) {
            sum = sum+Number(itemPrice[index]);
        }
        return sum;
    }
    
    async compareTotalAndSumPrices(){
        const sum = await this.sumPrices();
        const totalText = await this.prices.nth(5).textContent();
        const total = await this.removeDollarSign(totalText);

        expect(sum).toBe(total);
    }

 }