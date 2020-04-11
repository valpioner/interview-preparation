(/* GIT experience */) => {
  /*

  //Core
    git init
    git clone
    git status
    git branch
    git branch feature
    git checkout master
    git checkout -b feature

  //Staging, Commiting, Pushing
    git add .
    git commit -m "initial commit"
    git commit -am "initial commit"
    git push

  //Merging (development ->master)
    git checkout master
    git merge development

  //Rebasing
    git checkout development
    git rebase master
    git rebase -i HEAD~3
    git rebase --abort
    git rebase --continue

  //Stashing
    git stash
    git stash pop
    -git stash pop stash@{1}
    git stash apply
    git stash list
    git stash -u
    git stash -a
    git stash drop
    git stash drop tash@{1}

    //.gitignore
    //readme.md

    _________________How do I undo things in Git?___________________
    //https://www.atlassian.com/git/tutorials/undoing-changes


    -----------------Undo Uncommitted Changes-----------------


    Delete all not commited changes (both staged/unstaged) aka reset to last (~HEAD) commit:
    git reset --hard

    Unstage all staged changes:
    git reset

    Unstage specific file:
    git reset 1.txt
    git reset -- 1.txt

    Discard all unstaged changes:
    git checkout .

    Discard specific unstaged file:
    git checkout 1.txt
    git checkout -- 1.txt

    -----------------Undo Committed Changes-----------------


    Change msg of last commit:
    git commit --amend -m “This is changed commit msg”

    Add missing changes to last commit:
    git add .
    git commit --amend -m “This is updated commit msg”

    Rollback file to a certain commit in history (rollback changes are staged):
    git checkout <commit_ID> path/to/the/file.txt

    Creates new commit with reverted chancges from specific commit (conflicts may occure):
    //prefer to use on public repos to avoid confusion
    git revert <commit_ID>

    Reset working HEAD to specific commit. All commits after this commit will be removed from history
    // prefer to use on local/private branch
    git reset --hard <commit_ID> //use --keep instead of --hard to keep local changes






    -----------------------------------
    git branch

    git log
    git log --oneline
    git log --branches=*

  */
};
