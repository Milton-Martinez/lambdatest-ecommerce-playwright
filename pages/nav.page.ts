import { type Locator, type FrameLocator, type Page, expect } from "@playwright/test";
import Methods from "./methods.page";

export class Navbar extends Methods {

    /** LOCATORS **/
    readonly ShopByCategoryButton:Locator;
    readonly ShopByCategoryMenu:Locator;

    /** LOCATORS STRING **/
    /* BUTTONS */
    Locator_button_ShopByCategory = '.icon-left.both.text-reset';
    /* MENU */
    Locator_menu_ShopByCategoryMenu = '.navbar.no-expand.navbar-light.bg-default.vertical li';
    
    constructor(page: Page) {
        super(page);
        this.ShopByCategoryButton = page.locator(this.Locator_button_ShopByCategory);
        this.ShopByCategoryMenu = page.locator(this.Locator_menu_ShopByCategoryMenu);
    }

    /** METHODS **/
    async OpenShopByCategoryMenu(){
        await this.clickAnElement(this.ShopByCategoryButton, this.Locator_button_ShopByCategory);
    }
    async SelectCategory( itemPosition ){
        await this.clickAnElement( this.ShopByCategoryMenu.nth(itemPosition), this.Locator_menu_ShopByCategoryMenu );
    }


}