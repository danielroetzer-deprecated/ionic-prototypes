import { AppModule } from "../app/app.module";
import { MenuController } from "ionic-angular";


/********
 * Add '@DisableSideMenu()' Decorator to a page where you
 * don´t want to be able to access the sidemenu with a swipe
 */

export function DisableSideMenu() {

    return function (constructor) {
        const originalDidEnter = constructor.prototype.ionViewDidEnter;
        const originalWillLeave = constructor.prototype.ionViewWillLeave;            

        constructor.prototype.ionViewDidEnter = function () {

            // Get the MenuController instance
            const menuCtrl = AppModule.injector.get(MenuController);

            // Disable the side menu when entering in the page
            menuCtrl.enable(false);

            // Call the ionViewDidEnter event defined in the page
            originalDidEnter && typeof originalDidEnter === 'function' && originalDidEnter.apply(this, arguments);
        };

        constructor.prototype.ionViewWillLeave = function () {

            // Get the MenuController instance
            const menuCtrl = AppModule.injector.get(MenuController);

            // Enable the side menu when leaving the page
            menuCtrl.enable(true);

            // Call the ionViewWillLeave event defined in the page
            originalWillLeave && typeof originalWillLeave === 'function' && originalWillLeave.apply(this, arguments);
        };
    }

}