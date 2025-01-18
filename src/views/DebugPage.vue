<template>
    <div class="debug-page">
        <h1>Debug Page</h1>
        <p>This is a basic debug page. For everything debugging and testing related.</p>
		<h2>Notification buttons</h2>
		<button @click="notificationInfo">Info</button>
		<button @click="notificationSuccess">Success</button>
		<button @click="notificationError">Error</button>
		<button @click="notificationWarning">Warning</button>

        <div class="color-palette">
            <div style="background-color: var(--color-primary);"></div>
            <div style="background-color: var(--color-secondary);"></div>
            <div style="background-color: var(--color-tertiary);"></div>
            <div style="background-color: var(--color-quaternary);"></div>
            <div style="background-color: var(--color-quinary);"></div>
            <div style="background-color: var(--color-jokumikalie);"></div>
            <div style="background-color: var(--color-senary);"></div>
            <div style="background-color: var(--color-septenary);"></div>
            <div style="background-color: var(--color-octonary);"></div>
            <div style="background-color: var(--color-nonary);"></div>
            <div style="background-color: var(--color-denary);"></div>
            <div style="background-color: var(--color-undecenary);"></div>
        </div>

		<h2>Ascii Art</h2>
		<p>Here's some ascii art for your viewing pleasures since I haven't had the time to implement anything else.</p>
			
		<div class="card">
			<pre>
.              +   .                .   . .     .  .
                   .                    .       .     *
  .       *                        . . . .  .   .  + .
            "You Are Here"            .   .  +  . . .
.                 |             .  .   .    .    . .
                  |           .     .     . +.    +  .
                 \|/            .       .   . .
        . .       V          .    * . . .  .  +   .
           +      .           .   .      +
                            .       . +  .+. .
  .                      .     . + .  . .     .      .
           .      .    .     . .   . . .        ! /
      *             .    . .  +    .  .       - O -
          .     .    .  +   . .  *  .       . / |
               . + .  .  .  .. +  .
.      .  .  .  *   .  *  . +..  .            *
 .      .   . .   .   .   . .  +   .    .            +
			</pre>
			<h3>"You are here"</h3>
		</div>

		<div class="card">
			<pre>
              |    |    |      v
          v  )_)  )_)  )_)
v           )___))___))___)\        v
      v    )____)____)_____)\\
         _____|____|____|____\\\__
---------\                   /---------
  ^^^^^ ^^^^^^^^^^^^^^^^^^^^^
    ^^^^      ^^^^     ^^^    ^^
         ^^^^      ^^^
			</pre>
			<h3>Sail boat</h3>
		</div>

		<div class="card">
			<pre>
   .-.                                                   \ /
  ( (                                |                  - * -
   '-`                              -+-                  / \
            \            o          _|_          \
            ))          }^{        /___\         ))
          .-#-----.     /|\     .---'-'---.    .-#-----.
     ___ /_________\   //|\\   /___________\  /_________\  
    /___\ |[] _ []|    //|\\    | A /^\ A |    |[] _ []| _.O,_
....|"#"|.|  |*|  |...///|\\\...|   |"|   |....|  |*|  |..(^).ldb
			</pre>
			<h3>Christmas town</h3>
		</div>

		<div class="card">
			<pre>
                                           /
                        _,.------....___,.' ',.-.
                     ,-'          _,.--"        |
                   ,'         _.-'              .
                  /   ,     ,'                   `
                 .   /     /                     ``.
                 |  |     .                       \.\
       ____      |___._.  |       __               \ `.
     .'    `---""       ``"-.--"'`  \               .  \
    .  ,            __               `              |   .
    `,'         ,-"'  .               \             |    L
   ,'          '    _.'                -._          /    |
  ,`-.    ,".   `--'                      >.      ,'     |
 . .'\'   `-'       __    ,  ,-.         /  `.__.-      ,'
 ||:, .           ,'  ;  /  / \ `        `.    .      .'/
 j|:D  \          `--'  ' ,'_  . .         `.__, \   , /
/ L:_  |                 .  "' :_;                `.'.'
.    ""'                  """""'                    V
 `.                                 .    `.   _,..  `
   `,_   .    .                _,-'/    .. `,'   __  `
    ) \`._        ___....----"'  ,'   .'  \ |   '  \  .
   /   `. "`-.--"'         _,' ,'     `---' |    `./  |
  .   _  `""'--.._____..--"   ,             '         |
  | ." `. `-.                /-.           /          ,
  | `._.'    `,_            ;  /         ,'          .
 .'          /| `-.        . ,'         ,           ,
 '-.__ __ _,','    '`-..___;-...__   ,.'\ ____.___.'
 `"^--'..'   '-`-^-'"--    `-^-'`.''"""""`.,^.`.--' mh
			</pre>
			<h3>Bulbasaur</h3>
		</div>

		<p>All art is from <a href="https://www.asciiart.eu">asciiart.eu</a>.</p>
    </div>
</template>

<script>
import api from '@/utils/dataQuery';
import { notify } from '@/utils/notification';

export default {
    name: 'DebugPage',
    methods: {
        notificationInfo() {
            notify("This is a generic info notification that I can place tips or tricks into.", "info");
        },
        notificationSuccess() {
            notify("The action has been completed successfully!", "success");
        },
        notificationError() {
            notify("An error occurred... I guess?", "error");
        },
		notificationWarning() {
            notify("Somethings not right...", "warning");
        }
    },
    async mounted() {
			// Fetch the transactions
			const response = await api.getTransactions();
			if (response && response.transactions) {
				// Log the values from the transactions API
				console.log("[Transaction] Transaction values:", response.transactions);
			}

			// Fetch the options
			const optionsResponse = await api.getOptions();
			if (optionsResponse && optionsResponse.counterparty && optionsResponse.category) {
				// Log the categories data
				console.log("[Options] All:", optionsResponse);

				// Log individual things
				console.log("[Options] Counterparty:", optionsResponse.counterparty);
				console.log("[Options] Category:", optionsResponse.category);
			}

			// Fetch the options
			const filtersResponse = await api.getFilters();
			if (filtersResponse && filtersResponse.counterparty 
								&& filtersResponse.category 
								&& filtersResponse.amount 
								&& filtersResponse.date) {
				// Log the categories data
				console.log("[Filters] All:", filtersResponse);

				// Log individual things
				console.log("[Filters] Counterparty:", filtersResponse.counterparty);
				console.log("[Filters] Category:", filtersResponse.category);
				console.log("[Filters] Amount:", filtersResponse.amount);
				console.log("[Filters] Date:", filtersResponse.date);
			}
		}
}
</script>

<style scoped>
.debug-page {
    padding: 20px;
}
.color-palette {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* gap: 4px; */
    width: 100%;
    margin-top: 10px;
    margin: var(--spacing-lg) 0;
}

.color-palette div {
    height: 200px;
}
</style>