// pages/CartPage.js
class CartPage {
    constructor(page) {
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
        this.resetSidebarLink = page.locator('#reset_sidebar_link');
        this.burgerCrossBtn = page.locator('#react-burger-cross-btn');
    }

    async gotoCart() {
        await this.cartLink.click();
    }

    async addProduct(productName) {
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });
        await product.locator('button').click();
    }

    async removeProduct(productName) {
        const removeButton = this.page.locator(`button[data-test="remove-${this._formatDataTestName(productName)}"]`);
        await removeButton.click();
    }

    async resetAppState() {
        await this.burgerMenuBtn.click();
        await this.resetSidebarLink.click();
        await this.burgerCrossBtn.click();
    }

    async getCartItems() {
        await this.gotoCart();
        const items = await this.page.$$eval(
            '.cart_item .inventory_item_name',
            elements => elements.map(el => el.textContent)
        );
        return items;
    }

    _formatDataTestName(productName) {
        return productName.toLowerCase().replace(/\s+/g, '-');
    }
}

module.exports = { CartPage };
