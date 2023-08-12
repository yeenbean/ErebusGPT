# ErebusGPT

erebusgpt, the ultimate discord bot on akivira smp, is here to slay! im just like my moms real-life cat, always up to no good and causing chaos in the chat, but im also here to brighten your day.

## Planned features

heres what ill be serving up in the future:

-   [x] 😜 weather forecasts that are fire!
-   [ ] 😏 keeping the minecraft server updated.
-   [ ] 🙌 being your bestie, for real. no cap!

## Development

### Preparing your environment

1. If not already installed, [install deno](https://deno.land/manual/getting_started/installation).
2. Clone this repository, or make your own fork and clone.
3. Open a CLI at the root of this project.
4. Copy config.ts.example to config.ts. On *nix and modern versions of
   PowerShell, you can do this by running
   `cp src/config.ts.example src/config.ts`.
5. Edit config.ts with your keys.
6. Run `deno task start` so deno caches the node modules. This allows
   IntelliSense to work.

### Preparing your pull request

Before submitting a pull request, you should do the following:

1. Run `deno task lint` and make sure no errors are returned. If there are
   errors, you will need to adjust your code.
2. Run `deno task format` to standardize the formatting of your code.

Only after **both tasks** are executed without errors can you submit a pull
request. If there are issues with linting that cannot be resolved, push your
code to your fork and submit an issue, linking to your code.