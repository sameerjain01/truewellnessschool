# /ship

Ship the current site to production.

Steps:
1. Detect the site name from the current repo folder name
2. Detect the production branch (main or master) from `git remote show origin`
3. Run `git checkout develop && git pull origin develop`
4. Use `gh pr create` to open a PR from develop → production branch with title "ship: YYYY-MM-DD"
5. Use `gh pr merge --merge --delete-branch=false` to merge it
6. Run `git checkout <prod-branch> && git pull` to sync locally
7. Tell the user the site is live and Cloudflare will deploy in ~60 seconds
8. Show the production URL

If the `gh` CLI is not authenticated, tell the user to run `gh auth login` first.
If there is already an open PR from develop → production, skip creation and go straight to merge.
