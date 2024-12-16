<template>
	<div>
		<h1>Home page</h1>
		<q>{{ greeting }}</q><br>
		<em style="color: var(--color-text-light);">&mdash; Sun Tzu</em>
		<!-- <p>Some long ass text so that this looks reasonalble and actually I should have just copied a basic copy pasta or lorem ipsum text here but now that I'm writing I guess I'll just keep on writing until I get bored or this starts looking good.</p>
		<p>I guess we got to the point that the paragraph looked decent enough. Here a second shorter one just to pad this out just a little bit more.</p> -->

		<!-- <h2>Ascii art</h2> -->

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
					return "Why are you even awake anymore? The night owls have gone to bed too!";
				} else if (hour < 12) {
					return "Rise and shine, baby! The world is waiting for you to conquer it!";
				} else if (hour < 18) {
					return "Keep on grinding, champ! You're crushing it this afternoon!";
				} else {
					return "It's chill o'clock! Time to unwind and recharge for tomorrow!";
				}
			},
		},
	};
</script>

<style scoped>
	q {
		width: 40ch;
		display: inline-block;
	}
	pre {
		margin-bottom: 0;
		max-width: 100vw;
	}
	@media (max-width: 600px) {
		pre {
			font-size: 10px;
		}
	}
	.spacer {
		border-top: 2px solid var(--color-border);
		margin: 10px;
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
