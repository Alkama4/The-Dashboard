# Notes
In here I will collect my notes about this website and list the stuff that need to be done or fixed.

### Next time
- load more
- ordering

### Features to add
- When opening an entry:
    - Auto collapse when opening an other entry
        - And when sorting so make it pagewide
    - Show the items within a transaction
    - Toggles an area which is shown when hovering but expands further
- Navigation
    - link highlight when page open
    - Increase top bar margins
- Finish the modal windows:
    - Edit and duplicate
    - Custom submit text eg. "Create a dubplicate", "Confirm edits"
- popup notification
- Home on splash screen
    - Sää
    - Cotton
    - päivän ajasta riippuva tervehys
    - Linkit nätisti
    - Muuta?
- Charts page
- Backend
    - Setup backend api
    - Setup server
    - Functions:
        - Edit
        - New
        - Delete
- Form QOL
    - autofill
    - calculator / multiple in one entry
- Wide mode where the columns can brethe properly without cropping width wise

### Known issues
- Performance issues on mobile when expanding entries
    - Minimize the amount of elements (like extra tr ja extra divit)
    - Use transforms and not width, height, top, left etc.
- When resizing window a ghost image appears when it tries to center itself. Look for an alternative method of centering.
- Browser warning ref something something...
- Notificatino z-problem with mobile menu
- v-select causes scrolling on modals when opening 
- Modal on mobile being fullscreen not intuitive, make it only match width and not height