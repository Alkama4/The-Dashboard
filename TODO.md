# Notes
This file is a collection of notes for things that need to be done or fixed. It serves as an idea bank where I jot down tasks or thoughts as they come to mind. Most of these issues are typically resolved on their own over time, and the list often goes unnoticed once completed.


### Working on right now
- Modal remake
    - Think of a better way to implement the modal. 
    - Way too manual and inconvenient. 
    - Should work more like the native popup where it stops progress and returns a value.
    - Split into two. One for simple confimations with customaizeable texts and one for just slotting stuff into

- Title details
    - On update button click open MODAL
        - Impelement once modal remade
    - On metadata have the "user data updated" to reflect latest update to title or episode.    

- Home screen combine the backups, charts and drives to a nice big thing
    - Convert some of the chart to driving gauges with single value or other charts. 
    - Also could combine some of them?
    - Backups kind of dull, give it some life and readability
    - Backend:
        - Add:
            - disks
            - uptime
- watch list
    - Add secondary sorting
        - "In progress" should be new episodes -> season in progress -> last modified
    - season(s) and episodes(s) but automated

- watch list finish the all titles list
    - add sort by
        - Use the list in fastapi's end
    - super basic filters
        - watched, unwatched, don't care
        - favourite, not favourite, don't care
        - tv, movie, don't care
        - released, not released
        - started...?
    - Whole title act as a link should be modified to be different
        - Current implementation confusing for user since similar just expands in spendings
    - mobile compability non existant
    - The un released tag should be different from the genres
    - Remake sidebar filter thingy so that it can be used here
        - And fix the instant hide at the same time.

- Incorporate rest of the info from OMDb to titles table and change naming for vote_average to tmdb_vote_average on the rest of the page.

## Features
### Feature ideas
- Navigation
    - link highlight when page open to show where we are.
        - Don't know. Kind of like it as is but it wouldn't hurt.
- Finish the modal windows:
    - Edit and duplicate
    - Custom submit text in form: eg. "Create a dubplicate", "Confirm edits"
    - Revamp the details modal
        - Long and number date, week
        - table like category spread out.
    - Simple modal confirms shouldn't connect to display edge if mobile
- New entry QOL
    - autofill buttons or drop down or what ever...
- Filters:
    - Drop down drag click multiple? To much effort?
    - when screen wide enough display the filters always
    - Headers, spacing, drop down for sliders as a solution? Don't like it...
    - Needs a rewamp
    - haitari mini toggleen yhen sijaan jotta sais animoitua
- Analytics:
    - A list of the total amounts in the old style nex to the new pie chart?
    - Incomes seperated full chart by month
- Watch list:
    - Start working
    - Layout
    - getting data and storing it myself
        - Make api handle all the querying of data
        - this way it's automatically stored in the db
    - Age rating
        - Exists for tv, but not for movies!?
- Sources?
    - TMDB
    - Boxicon
- Tab navigation now that you know how easy it is. Fix button links by making global.css button-link style.
- Season and episode images larger. More bold. Small images never look as good.
- Title info rating map 
- BLOB cache?
    - What if I need updated info?
    - Only case would be if there are new titles. 
    - How long expiry?
        - Month? Day? Max count? 50?
- If input method touch fullscreen button should enable f11 mode fullscreen also. 
    - And make the fullscreen functionality work on homepage to.
- Custom password field
    - Nothing fancy, maybe not even a component
    - Change input type when clicking on a button with icon hovering on right side
    - password <-> text
- Possible color palette:
    - #f99e1c
    - #e56528
    - #425d94
    - #2c3361
    - #3d3e40
- Nice colors:
    - #601020
- Wathced tag looks bad
    - Add the same tag to seasons and even episodes?
- Title space taken
    - Seperate images and data?
    - How do I get the data amount?
- Titledetails add a season progress like for title. Maybe even a bar
- Custom select tab select and arrow keys select value
- Watch list marked watched and unwatched along with favourite and add/remove from watch list. Add to cards and all titles list.
- Spoiler mode
    - Blank the details and blur the image for titles that aren't watched. 
    - Add the option to the top of page.


### Feature ideas that might never see the light of day
- Swiper add horizontal scrolling
    - "Swiper" doesn't seem to support it in the way that I hoped it would
    - Might have to can this one for now and if I later wish to I can make my own slider component
    - https://codesandbox.io/p/sandbox/54f29d?file=%2Fsrc%2FApp.vue
    - https://swiperjs.com/demos#scroll-container
- Title details poster also show on mobile layout?
    - Doesn't really fit and doesn't really work with the current layout :/


## Issues
### Waiting to be fixed
- InfoTooltips positioning is stupid and doesn't detect window borders
    - Make it position itself smartly
- pie chart fullscren button not aligned properly in either fullscreen or normal view
- Tooltips on chart and component not visible enough without border, but with border inconsistant
    - Just add the border, you cant mouse over them so its fine
- Settings apge not accessicble without account but settings are in localstorage.
    - Move to mysql.
- Filterdropdowns not updating when resizing vertically
    - window.eventlistener to update value
- Go through evertyhing to check the they have a click color in addition to hover.
- Modals header and close X shouldn't scroll with content
- Notification remove the root thingy and just import it
    - Also vue select?
- When in mobile nav page scrolling isn't disabled
- Only mobile nav has smooth fadeout
- Doesn't use the internal fastapi address but the external which is not optimal. 
    - The requests seem to be coming from the client ip and not the webserver so can't do that?
- Filter date slider labels only every 3 months so with transactions on a short timespan it looks odd/broken.
- Light mode bg, text, modal, generic button etc. colors need a restructuring. 
    - Try out mirroring what dark mode does instead of brining some stuff to lighter like buttons
    - Light mode colors and hovers suck. Try turning going darker when hovering in light and opposite in dark.
- v-select width changes when activating causing modal to resize
- Turn link buttons so that the buttons act as the link and don't wrap
    - @click="genericLinkFunctionThatICanImport"
    - One for router and one for a
- Cannot set 0 as a value
    - If I remove check in js and send the 0 as a value mysql throws an error and deletes the transaction items.
    - Be carefule when working with this
- User episodes in mysql might not get deleted on title deletion
- The api calls aren't cancelled when changing page. Research if they can be cancelled on unmount
- Delete transaction doesn't use DELETE (not proper REST)
- Transactions load never ends. 
    - Simple state change when reponse fails and an another v-if element.
- Setting episode wathced/unwatched updates all episodes in the season to be watched on the dom incorrectly even though data on db is correct. Refresh fixes. Check how the data is updated on confirmation.
- Title details user data updated isn't updated when saving notes on the client side. Need to refresh for it to display.
    - Do not always just set the current date. If the value is the same that it was in the db it doesn't actually update anything.
- The all titles listed title-element can't be just a click to the page
    - Mixed signals to the user since the spendings entry doesn't do that.
    - And the user is punished by resetting their filters by opening the page in current tab.
        - Laxy fix by always opening in new tab before proper fix?
- Primary buttons go to normal button when disabled
- Load more button visible when we don't get an aswer from api after the first batch of transactions has been loaded and the "looks like htere's nothing here" shows up


### Feature or a bug?
- Total log amount is transaction items and not transactions
- The amount drop down shows without the types when media under 777px wide.
    - Or in other words the values are seperated without any labels of what the values mean.
    - Disable when under 777px or just leave it?
- v-select causes scrolling on modals when opening
    - (Propably no can do?)
- Some cases of improper "post" usage that should be "get"
    - Propably should go through api and unify it with some optimisation at the same time.
- Kun input aktiivinen harkitte sen ihmeen ympärillä jutun takas käyttöön ottoa. Toi et borderista tulee vaan vahvempi näyttää vähän hoopolta.
    - Korjattu ehkä siten että pitää sen border värin sillon kun aktiivinen
    - Jos tabilla ettii muita juttuja niin pitäs muuttaa sillee et tulis sama border kun input fieldeissä?
- Values aren't cached and are instead queried all the time. For example the options should at the very least be stored?
    - Good placeholders have kind of fixed this, but still worth considerng.
    - Downside of doing this it that its not clear when data is up to date and suddenly updates. Now it always shows that it queries.