# Notes
In here I will collect my notes about this website and list the stuff that need to be done or fixed.

### Next time
- Backups kind of dull
    - Give it some life and readability
- Think of a better way to implement the modal. Way too manual and inconvenient. Should work more like the native popup where it stops progress and returns a value.

- The title details and metadata side by side when there's space along with the trailer.
- Move the title out of the backdrop on mobile and make dots more prominant by moving a bit up like sm amount.
- PROPABLY SHOULD STILL USE THE MAX AMOUNT OF QUERIES AT ONCE SINCE ITS QUITE STUPID TO SEND TENS OF NOT HUNDREADS OF QUERIES AT ONCE AND WAIT FOR THEM ALL!
- FIX THE USER DATA TABLES SO THAT THE LAST UPDATED COLUMN OR WHATEVER UPDATES ONLY WHEN WATCH_COUNT CHANGES! And add to episode details.
- Replace images button.
- Buttons and controls layout workout
- Add favourite and watched in watch list?
- TMDB icon to season and episode rating

### Features to add
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
- Add title
    - Link to tmdb page for deeper checking to ensure its the correct one. 
    - Maybe have it be a link icon or text link because of:
    - after adding make the header link to local title page.

### Known issues
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
- Doesn't use the internal fastapi address but the external 192.168.0.2:800 which is not optimal
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