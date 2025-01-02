<template>
	<div>
		<h1>{{ greeting[0] }}</h1>
		<span class="header-sub-text">{{ greeting[1] }}</span><br>

		<h2>Quick Tiles</h2>
		<div class="tile-container">
			<a href="https://pibox.lan:9443" class="no-decoration">
				<button class="tile-button">
					<img src="../assets/thumbnails/portainer.svg" alt="Service logo">
					<span>Portainer</span>
				</button>
			</a>
			<a href="http://pibox.lan:82/admin/" class="no-decoration">
				<button class="tile-button">
					<img src="../assets/thumbnails/pihole.png" alt="Service logo">
					<span>Pihole</span>
				</button>
			</a>
		</div>

		<h2>Ascii Art</h2>
		<p>Here's some ascii art for your viewing pleasures since I haven't had the time to implement anything else.</p>
		<div class="wrapper">
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

		<div class="wrapper">
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

		<div class="wrapper">
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

		<div class="wrapper">
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
	export default {
		name: 'HomePage',
		data() {
			return {
				greeting: this.getGreeting(),
			};
		},
		methods: {
			getGreeting() {
				const hour = new Date().getHours();
				if (hour < 5) {
					return ["Night!", "Up a little early, aren't we? The world is still asleep!"];
				} else if (hour < 12) {
					return ["Good morning!", "It's a beautiful morning! Time to rise and shine!"];
				} else if (hour < 18) {
					return ["Good afternoon!", "Keep on grinding, champ! You're crushing it!"];
				} else {
					return ["Good evening!", "It's chill o'clock! Time to unwind and recharge for tomorrow!"];
				}
			},
		},
	};
</script>

<style scoped>
	h1 {
		margin-bottom: var(--spacing-sm);
	}
	.header-sub-text {
		display: inline-block;
		color: var(--color-text-light);
	}
	pre {
		margin-bottom: 0;
		max-width: 100vw;
	}
	@media (max-width: 600px) {
		pre {
			font-size: 8px;
		}
	}
	.spacer {
		border-top: 2px solid var(--color-border);
		margin: 10px;
	}
	
	.tile-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.tile-button {
		position: relative;
		display: flex;
		flex-direction: column;
		aspect-ratio: 1;
		width: 150px;
		border-radius: var(--border-radius-medium);
	}
	.tile-button img {
		position: absolute;
		top: var(--spacing-md);
		width: 80px;
		aspect-ratio: 1;
	}
	.tile-button span {
		position: absolute;
		bottom: var(--spacing-md);
	}

	.wrapper {
		width: fit-content;
		margin-inline: auto;
		background-color: var(--color-background-card);
		padding: var(--spacing-md);
		border-radius: var(--border-radius-large);
		margin-bottom: var(--spacing-lg);
        box-shadow: var(--shadow-card);
	}
	h2 {
		padding-top: var(--spacing-lg);
	}
	h3 {
		margin: 0;
		border-top: 2px solid var(--color-border);
	}
</style>
