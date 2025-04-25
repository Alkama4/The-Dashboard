# Notes
This file is a collection of notes for things that need to be done or fixed. It serves as an idea bank where I jot down tasks or thoughts as they come to mind. Most of these issues are typically resolved on their own over time, and the list often goes unnoticed once completed.


### Working on right now
- Home screen combine the backups, charts and drives to a nice big thing
    - Convert some of the chart to driving gauges with single value or other charts. 
    - Also could combine some of them?
    - Backups kind of dull, give it some life and readability

    - Loading
        - Unify acorss site
        - Do not block actions if not absolutely necessary
        - Add and remove block should be util


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
        - Custom placeholders (get rid of generic ones and add missing ones)
        - Custom Password Field  
            - Nothing fancy, maybe not even a component  
            - Change input type when clicking on a button with icon on the right  
            - Toggle between password <-> text  
        - Custome type-select
        - Custom Select  
            - Tab select and arrow keys select value  
        - Since not using form element implement submit from inputs elseway.
    - Modals  
        - Finish the modal windows:  
            - Duplicate  
            - Revamp details modal:  
                - Long and number date, week  
                - Table-like category spread out  
            - .init() or similar that setups a loading animation
                - Cleared when .open()
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
    - When unmounting a page gracefully cancel the mount request if not answered
    - img
        - loading="lazy"
            - Test how it works and if it works.
            - If it not, maybe try out libararies (preferrable not).
    - Custom carousel
        - Do not allow overscrolling to right (so that just one slide is visible)
            - Dots valid positions based on: amount - (width  / (amount * cardwidth))
        - Physics and not animations?
            - Crash to edge and fall back instead of set to last
        - Key input on just active and not all

- Page specifics
    - Spendings page
        - Filters  
            - Dropdown drag-click multiple? Too much effort?  
            - When screen wide enough, always display filters  
            - Headers, spacing, dropdown for sliders? (Not a fan)  
            - Needs a revamp  
            - Accordion (Haitari) mini toggle instead → allows animation  
        - Loading placeholders on mobile have uneven spacing
        - Edit transaction
            - When modifying trasaction_item count the height of the selected transaction doesn't change when the modal closes.

    - Home page
        - The text-area div is offset as I wan't it, but it partially covers the content below.
            - Make not as tall and set position differently

    - Analytics  
        - Balance over month overlapped
            - See visually how each month differs. 
            - Color gradiant from oldest to most recent
            - How many months? Does the user select or always 6/12/all
        - Add the time slieder to charts with time
            - Allows to zoom on parts of the data, starts to be necessary
        - The Last month/year should be a drop down choise with alternate options
            - kk, 3kk, 6kk, 12kk, all
        - List of total amounts (old style) next to new pie chart
            - Add color dots to clearly show what is what
        - Totals should be removed
            - First thing that catches eye with colors and big font
            - Might cause confusion as to what is initially since so large
        - Could be revamped so that month and year are side by side and change with arrows when screen small
            - Or drop down select range
        - Could be compacted quite a bit, especially since charts can be fullscreened

    - Watch List
        - Change to discover feed
        - Add big suggestion slider at the start and make more card sliders
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

    - all titles list
        - If not found suggest a straight link for it from tmdb.
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
    - Search should be more available.
        - Add a button next to "+"?
        - Search bar to top bar or on the start?
        - Seperate page for all titles list as a search page?

    - Title Details  
        - If no title poster the poster holder collapses
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
        - Notes always visible, even when not in watch_list
        - Use a in watch_list tag instaed of -1 and "< 0"
        - notes `ctrl + s` save
        - Shadow from sides when hovering over backdrop button

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
        - Mark input field
            - negative on fail or invalid input
            - positive on success save success
            - Back to text color on input

    - Admin tools
        - Wipe all
        - Get backup file of data
        - Manage other users

    - Sources and about page?
        - Sources
            - TMDB  
            - OMDB
            - Boxicon  

    - dataQuery.js
        - Follow the same router style as fastapi
            - For "/watch_list/collection/remove_title"
            - Use fastapi.watch_list.collection.remove_title

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
    - Collections shouldn't require an account.
    - Trailers table. Current single triler is quite limiting. Would be cool to have more and actually check out a proper triler, sinse some trailers are not good.


### Feature ideas that might never see the light of day
- Currently none


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