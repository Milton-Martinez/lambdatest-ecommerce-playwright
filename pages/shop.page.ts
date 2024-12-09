import { type Locator, type FrameLocator, type Page, expect } from "@playwright/test";
import Methods from "./methods.page";

export class Shop extends Methods{

    /* LOCATORS */
    readonly addItemToCart:Locator;
    readonly productsContainer:Locator;
    readonly productToHover:Locator;

    /** LOCATORS STRING **/
    /* BUTTONS */
    Locator_button_addItemToCart = '.btn.btn-cart'; //return multiple objects
    /* ITEMS TO ACTIVATE HOVER */
    Locator_item_product = '.product-thumb-top'; //return multiple objects

    constructor(page:Page) {
        super(page);
        this.productsContainer = page.locator('[data-list="product-layout product-list col-12"]');
        this.addItemToCart = page.locator(this.Locator_button_addItemToCart);
        this.productToHover = page.locator(this.Locator_item_product);
    }

    async scrollToProducts(){
        await this.productsContainer.scrollIntoViewIfNeeded();
    }
    async addToCart(itemPosition:number = 0){
        await this.hoverAnElement( this.productToHover.nth(itemPosition), this.Locator_item_product);
        await this.clickAnElement( this.addItemToCart.nth(itemPosition), this.Locator_button_addItemToCart );
    }

 }