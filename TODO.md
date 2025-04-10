# Notes
This file is a collection of notes for things that need to be done or fixed. It serves as an idea bank where I jot down tasks or thoughts as they come to mind. Most of these issues are typically resolved on their own over time, and the list often goes unnoticed once completed.


### Working on right now
- Home screen combine the backups, charts and drives to a nice big thing
    - Convert some of the chart to driving gauges with single value or other charts. 
    - Also could combine some of them?
    - Backups kind of dull, give it some life and readability
    - Backend add:
        - disks
        - uptime

- Transaction form rework
    - Make it so that it always tries to be a set width, but is max-width 100% or similarly
    - Make custom v-select
    - unify inputs like buttons and text inputs


## Features
### Feature ideas
- General UI
    - Inputs
        - Match the color of default placholder and the custom ones.
        - Search input
    - Loading placeholers
        - Make them 100vh. It feels better when its overkill because it allows to scroll and is clearer for the user?
    - Navigation  
        - Highlight link when page is open to show location  
            - Not sure if needed, but could be improved  
    - Forms and inputs
        - Custom Password Field  
            - Nothing fancy, maybe not even a component  
            - Change input type when clicking on a button with icon on the right  
            - Toggle between password <-> text  
        - Custome type-select
        - Custom Select  
            - Tab select and arrow keys select value  
    - Modals  
        - Finish the modal windows:  
            - Duplicate  
            - Revamp details modal:  
                - Long and number date, week  
                - Table-like category spread out  
    - Add a class to app device is touch similar to dark mode
        - Make similar with dark mode
        - Useful to keep buttons always visible on touch  
        - At least watch list has a cards and "all title list" which need this
        - Also hover effects could be removed with it?
    - Notification
        - Add the capability to have multiple notifications
    - Colors
        - The positive green and warning yellow could be toned down to make readability with white text better
        - Stolen color palette that looks nice
            - #f99e1c  
            - #e56528  
            - #425d94  
            - #2c3361  
            - #3d3e40  
        - Nice Colors  
            - #601020  

- Page specifics
    - Spendings page
        - Filters  
            - Dropdown drag-click multiple? Too much effort?  
            - When screen wide enough, always display filters  
            - Headers, spacing, dropdown for sliders? (Not a fan)  
            - Needs a revamp  
            - Accordion (Haitari) mini toggle instead → allows animation  
        - Loading placeholders on mobile have uneven spacing

    - Home page
        - The text-area div is offset as I wan't it, but it partially covers the content below.
            - Make not as tall and set position differently

    - Analytics  
        - List of total amounts (old style) next to new pie chart
        - Do no like how it shows the totals immidiately with colors making it the first thing that is shown
        - Could be revamped so that month and year are side by side and change with arrows when screen small
            - Or drop down select range
        - Could be compacted quite a bit

    - Watch List  
        - Add secondary sorting
            - "In progress" should be new episodes -> season in progress -> last modified
        - season(s) and episodes(s) but automated
        - "start year - end year" for tv-shows instead of just "start year"
        - smart image loading
            - by scroll and visible in carousel
            - carousel might already be implemented but confirm
        - Spoiler Mode  
            - Blank details & blur image for unwatched titles  
            - Option at top of page  
        - Watch List functionality to the cards and list  
            - Mark watched & unwatched  
            - Add/remove from favorites  
        - Cards implement a natice router-link element instead of the hacky @something
        - all titles list
            - add sort by options
                - Use the list in fastapi's end
            - Finish filers
                - watched, unwatched, don't care
                - favourite, not favourite, don't care
                - tv, movie, don't care
                - released, not released
                - started...?
            - mobile compability still bad?
            - The un released tag should be different from the genres
            - Remake sidebar filter thingy so that it can be used here
                - And fix the instant hide at the same time.
            - Placeholder like two pixels two small

    - Title Details  
        - Add link to a site that shows where to watch
        - Add a season progress bar?
            - Title also
            - Not necessarily a bar but a clear visualiser
        - Better season and episode handling?
            - Seasons side by side with arrows to scroll trhough them?
        - Season & episode images larger, more bold  
            - Small images never look as good  
        - Add info of how much space the data for a tile takes up
            - Separate images and data?
            - How do I get the data amount?  
        - Have the "user data updated" reflect latest update to title or episode.
            - Did already? 
        - Backdrop base color black so that the gradient is always visible?

    - Search title
        - Looks generally bad
        - Loading placheholder
            - jumps up a bit
            - could have multiple

    - New Entry 
        - Add QOL
            - Autofill buttons, dropdown, or similar  

    - Account page
        - Change password
            - Reset all current sessions
        - Show current password?
        - Danger zone icon spacing

    - Admin tools
        - Wipe all
        - Get backup file of data
        - Manage other users

    - Sources and about page?
        - Sources
            - TMDB  
            - OMDB
            - Boxicon  

- Backend
    - BLOB Cache for tmdb queries
        - What if I need updated info?  
        - Only case would be if there are new titles  
        - How long expiry?  
            - Month? Day? Max count? 50?  
    - Collections for titles
        - Seperate table that has the following columns
            - collection id
            - User id
            - collection name
            - Collection description, if the user wants to have a short description, notes, links
            - Collection color, since would be implemented visually as a tag (clickable?)
        - Join table collection_title
            - Collection id
            - title id
        - How are they implemented on ui?
            - plus icon after tags?
            - can click existing collection tags.
            - click always opens a modal
                - Make own components for show/edit, add
            - Seperate page for creating a collection
    - When adding a tv-show the seasons aren't added because it errors out.


### Feature ideas that might never see the light of day
- Swiper add horizontal scrolling
    - Would make usage with trackpad work. Now awkward.
    - "Swiper" doesn't seem to support it in the way that I hoped it would
    - Might have to can this one for now and if I later wish to I can make my own slider component
    - https://codesandbox.io/p/sandbox/54f29d?file=%2Fsrc%2FApp.vue
    - https://swiperjs.com/demos#scroll-container
- Title details poster also show on mobile layout?
    - Doesn't really fit and doesn't really work with the current layout :/
    - If I figure out how to do it one day will do.
    - Now that we push it over backdrop could be possible?


## Issues
### Waiting to be fixed
- Front end
    - General pile
        - Filterdropdowns not updating when resizing vertically
            - window.eventlistener to update value
        - Ensure everything has a active color in addition to hover. Some improvement made but haven't gone through everything yet.
        - Notification remove the root thingy and just import it
            - Also vue select?
        - When in mobile nav page scrolling isn't disabled
        - Make sure everything has a smooth fade out. 
            - Modal done was major, but the side bar is still atleast missing
            - Go through to find all
        - Filter date slider labels only every 3 months so with transactions on a short timespan it looks odd/broken.
        - v-select width changes when activating causing modal to resize
            - Making my own is on the works.
        - Cannot set 0 as a value for a transaction
            - If I remove check in js and send the 0 as a value mysql throws an error and deletes the transaction items.
            - Be careful when working with this
        - Title details user data updated isn't updated when saving notes on the client side. Need to refresh for it to display.
            - Do not always just set the current date. If the value is the same that it was in the db it doesn't actually update anything.
        
    - Light mode 
        - bg, text, modal, generic button etc. colors need a restructuring. 
            - Try out mirroring what dark mode does instead of brining some stuff to lighter like buttons
            - Light mode colors and hovers suck. Try turning going darker when hovering in light and opposite in dark.
        - Needs quite the overhaul

- Backend and backend related
    - User episodes in mysql might not get deleted on title deletion
    - The api calls aren't cancelled when changing page. Research if they can be cancelled on unmount
    - Delete transaction doesn't use DELETE (not proper REST)


### Delayed to be fixed on a day that might never come
- InfoTooltips positioning is stupid and doesn't detect window borders
    - Make it position itself smartly
    - Currently just left, right and center
    - Would require js and might be a fun project


### Feature or a bug?
- Total log amount is transaction items and not transactions
- In spendings page on a transaction when expanded on mobile it only showws the amounts without the category
    - Or in other words the values are seperated without any labels of what the values mean.
    - Disable when under 777px or just leave it?
- Values aren't cached and are instead queried all the time. For example the options should at the very least be stored?
    - Good placeholders have kind of fixed this, but still worth considerng.
    - Downside of doing this it that the user might be shown data that is not up to date
        - And to fix that we would have to just query the data anyway
        - Is it better to immidiately show old data and change it when the udpated arrives or always show a placeholder?
- Doesn't use the internal fastapi address but the external which is not optimal. 
    - The requests seem to be coming from the client ip and not the webserver so can't do that?
    - Figure out how the requests work