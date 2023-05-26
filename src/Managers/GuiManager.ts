export class GuiManager {
    private menuOpenCallback: (open: (value: boolean) => boolean) => void;


    


    constructor(menuOpenCallback: (open: (value: boolean) => boolean) => void) {
        this.menuOpenCallback = menuOpenCallback;

        this.init();
        
    }

    init() {
        console.log("i'm alive");
    }

    public toggleUserMenu() {
        this.menuOpenCallback(open => !open);
    }

   
}