Hosted at:  https://keithrieck.github.io/sdd_openspec_bouncer/index.html

# sdd_openspec_bouncer

This trivial project was developed with [OpenSpec](https://openspec.pro/) and [Codex](https://chatgpt.com/codex/enterprise/).  The model I'm using is gpt-5.3-Codex at the Medium level and standard speed.  I'm editing things in Visual Studio Code.

In a previous project I created specification in the file [`spec-v001.md`](spec-v001.md), using two agent skills:  [`grill-me`](.codex/skills/grill-me/SKILL.md) and [`spec-writer`](.codex/skills/spec-writer/SKILL.md).  When developing graphics programs, I use my [`phaser-game`](.codex/skills/phaser-game/SKILL.md) to set up the [Phaser](https://phaser.io/) game stuff.

## First Iteration

1. After installing OpenSpec and creating my project directory, 
  * execute: `openspec init`     Specify that I'm using Codex.
  * I add the `phaser-game` skill under `.codex/skills`.
  * Copy in the file `spec-v001.md` which I'd created earlier with `grill-me` and `spec-writer`
  * I update [`config.yaml`](openspec/config.yaml) to specify the Tech stack.
2. From within Codes, execute `Openspec Explore`.  This goes into "explore" mode.  I indicate that I  want to "Explore an idea".  Within this chat, tell Codex what we want.
  * `Create a web app showing 64 circles bouncing across the page using the information in spec-v001.md and treat this as a Progressive Web Application and Phaser game using $phaser-game conventions`
3. From within Codex, execute `Openspec Propose`
  * Creates [proposal.md](openspec/changes/archive/2026-05-22-add-bouncing-circles-pwa-phaser/proposal.md)
  * Creates [spec.md](openspec/changes/archive/2026-05-22-add-bouncing-circles-pwa-phaser/specs/bouncing-circles-simulation/spec.md)
  * Creates [design.md](openspec/changes/archive/2026-05-22-add-bouncing-circles-pwa-phaser/design.md)
  * Creates [tasks.md](openspec/changes/archive/2026-05-22-add-bouncing-circles-pwa-phaser/tasks.md)
4. Review the documents and make necessary changes.
5. From within Codex, execute `Openspec Apply Change`
  * Code is generated.  I test it locally and it works perfectly again. 
  * Code should be reviewed at this point.  Problems could be either fixed manually or you could tell Codes what to correct.
  * Everything is commited to a 'master' branch.  It all gets published to Github and I configure Github Pages to host the app.


## Second Iteration

1. Create a feature branch named `small_circles`.
2. In Codex, start the Explore mode again.
  * `I want to change the number of circles to 16 circles.  Their speed should be changed to 100 pixels per second.  Their random colors should all be pastel.`
  * `Make a new class called SmallCircle.  It should extend either Bouncer or Circle, whichever makes more sense.  For SmallCircle, the diameter should be 25 pixels and the speed should be 200 pixels per second.  They should all have random colors but the colors should be saturated.`
  * `The simulation should also have 32 SmallCircles bouncing around the page.`
  * `For collisions implement a custom resolver where a Circle has four times the mass as a SmallCircle.
3. I tell Codex that this should be a new change, so new documents are created.
4. All documents deserve to be reviewed before implementing them.
5. From within Codex, execute `Openspec Apply Change`
  * Code is generated.  I test it locally and it works perfectly. 
  * Code should be reviewed at this point. 
  * I merge the `small_circles` branch into the `master` branch and publish it up to Github.


## Third Iteration

1. Create a feature branch named `animated_sprite`.
2. I add a spritesheet file and its corresponding JSON hash file into the `assets` directory.
3. In Codex, start the Explore mode again.  I tell Codex that this will also be a new change.
  * `Add a new class named Dodecahedron that extends the Bouncer class.  This sprite should use the new spritesheet added under the assets directory.  There should be an animation on this sprite that switches to the next spritesheet image every 200 milliseconds.`
  * `Each Dodecahedron should move at 50 pixels per second.  For collisions, each Dodecahedron should have twice the mass as a Circle.  Add 4 bouncing Dodecahedrons to the simulation.`
4. Review documents.
5. From within Codex, execute `Openspec Apply Change`
  * Code is generated.  I test it locally and this time it fails.  Codex has picked the wrong function name for loading a spritesheet atlas.   I manually fix this.
  * I merge the `animated_sprite` branch into the `master` branch and publish it up to Github.
  * The hardest part about this iteration was getting Gemini to generate the spritesheet.   Also, the resulting spritesheet animation isn't as cool as I'd like and the collision boundaries on the sprite are a little too large.
  

## References:
* [OpenSpec](https://openspec.pro/)
* [OpenSpec in Github](https://github.com/Fission-AI/OpenSpec)
* [How I Use OpenCode, Oh-My-OpenCode-Slim, and OpenSpec to Build My Own AI Coding Environment](https://www.dataleadsfuture.com/how-i-use-opencode-oh-my-opencode-slim-and-openspec-to-build-my-own-ai-coding-environment/)