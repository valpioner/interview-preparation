# GIT (Global Information Tracker)

## General recommendations

- Keep origin branch history clean (avoid mess) for readability purposes
  - `squash` commits during MR/PR via GitLab/GitHub/BitBucket OR
  - `squash` local commits using `git rebase -i` (before `git push` or after `git push` using `git push -f` to force override)
- Don't rebase public branches that you do not own (at least without confirmation)
- Consider using `git pull --rebase` as a default approach (depends on what you want)
- Don't push directly into master/dev if you work in a team, instead create MR/PR.
- Don't force push `git push -f` to public branches until it is discussed with a team.

## Core

- `git init`
- `git clone`
- `git status`
- `git branch`
- `git branch feature`
- `git checkout <branch_name>`
- `git checkout -`
- `git checkout -b <branch_name>`
- `git switch` (= `git checkout`)
- `git switch -c` (= `git checkout -b`)

## Branching

### Switch to other branch

- `git checkout <TARGET_BRANCH>`
- `git switch <TARGET_BRANCH>`

### Switch to previous branch

- `git checkout -`
- `git switch -`

### Create and switch to new branch

- `git checkout -b <new_branch>` (same as `git branch <new_branch> && git checkout <new_branch>`)
- `git checkout -b <new_branch> <source_branch>`
- `git switch -c <new_branch>`

### Delete branch

- `git branch -d <target-branch>` delete \<target-branch> locally (should not be current one)
- `git push origin --delete <target-branch>` delete \<target-branch> on remote

### Rename local branch

- `git branch -m <new_name>`
- `git branch -m <old_name> <new_name>`

## Stage

- `git add .`

## Unstage

- `git restore --staged .`
- `git reset`

## Discard unstaged changes

- `git checkout .`
- `git checkout FILE_NAME` (or `git checkout -- FILE_NAME` if same as existing branch)

## Discard both staged/unstaged changes

- `git restore .`
- `git reset --hard`
- `git reset --hard <commit_ID>` use `--keep` instead of `--hard` to keep local changes

## Commit

- `git commit -m 'initial commit'`
- `git commit -am 'initial commit'`
- `git commit --amend -m 'New commit msg'` Change msg of last commit
- `git add . && git commit --amend -m 'New commit msg'` Add missing changes to last commit

## Push

- `git push`
- `git push -u origin BRANCH_NAME`

## Merge (dev -> feat) (will try to fast-forward if possible)

- `git merge dev` // while on feat

## Rebase (dev -> feat)

- `git rebase dev` // while on feat

## Rebase (local commits, using interactive rebase)

1. `git rebase -i HEAD~3` to rebase the last 3 commits
2. setup, close file to proceed
3. rebase process starts, commits will be rebased by order
4. - if no conflicts, it will finish
   - if conflicts:
      1. rebase process will pause before rebasing problematic commit
      2. fix conflicts locally
      3. `git add .` to mark resolved files as staged
      4. - `git rebase --continue` to continue rebase process OR
         - `git rebase --abort` to cancel rebase process, and return to the state before rebase

## Stash

- `git stash`
- `git stash pop`
- `git stash pop stash@{1}`
- `git stash apply`
- `git stash list`
- `git stash -u`
- `git stash -a`
- `git stash drop`
- `git stash drop stash@{1}`

## How do I undo things in Git?

https://www.atlassian.com/git/tutorials/undoing-changes

## Rollback file to a certain commit in history (rollback changes are staged)

- `git checkout <commit_ID> file.txt`

## Creates new commit with reverted changes from specific commit (conflicts may occur, prefer using on public repos to avoid confusion)

- `git revert <commit_ID>`

## Reset working HEAD to specific commit. All commits after this commit will be removed from history (prefer using on local/private branch)

- `git reset --hard <commit_ID>` (use `--keep` instead of `--hard` to keep local changes)



git log
git log --oneline
git log --branches=*
