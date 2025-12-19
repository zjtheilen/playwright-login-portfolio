// pages/CartPage.js
class CartPage {
    constructor(page) {
        this.page = page;
    }

    // click "Add to Cart" if product is not in cart
    async addProduct(productName) {
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });
        const addButton = product.locator('button:has-text("Add to cart")');
        const removeButton = product.locator('button:has-text("Remove")');

        if (await removeButton.isVisible()) {
            // product already in cart, do nothing
            return;
        }

        await addButton.click();
    }

    // click "Remove" if product is in cart
    async removeProduct(productName) {
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });
        const removeButton = product.locator('button:has-text("Remove")');
        const addButton = product.locator('button:has-text("Add to cart")');

        if (await addButton.isVisible()) {
            // product not in cart, do nothing
            return;
        }

        await removeButton.click();
    }

    async getItems() {
        await this.page.click('.shopping_cart_link');
        return await this.page.$$eval(
            '.cart_item .inventory_item_name',
            elements => elements.map(el => el.textContent)
        );
    }

    async resetAppState() {
        await this.page.click('#react-burger-menu-btn');
        await this.page.click('#reset_sidebar_link');
        await this.page.click('#react-burger-cross-btn');
    }
}

module.exports = { CartPage };
