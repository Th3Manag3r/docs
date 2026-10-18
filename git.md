# Git
Git Website: https://git-scm.com/  
Git book: https://git-scm.com/book/  


## 1. install

- linux
```bash
apt install git   # debian
yum install git   # RPM-based old
dnf install git   # RPM-based newer
pacman -S git     # archlinux

# PPA for the latest stable upstream git version
add-apt-repository ppa:git-core/ppa
apt update
apt install git
```

- windows (binary: https://git-scm.com/install/windows)
```powershell
# winget
winget install --id Git.Git -e --source winget
```


## 2. Getting Started

### Git Config

- repo-specific configs, should be run inside the repo
```bash
git config user.name "value"          # default, same as --local
git config --local user.name "value"  # [repo_path]/.git/config
```

- user-specific configs, global configs
```bash
git config --global user.name "value"   # ~/.gitconfig | ~/.config/git/config
```

- system-wide configs, needs sudo access
```bash
sudo git config --system user.name "value"   # /etc/gitconfig
```

- show all set configs along with the config source/origin file
```bash
git config --list --show-origin               # list all
git config --local --show-origin              # list local configs
git config --global --show-origin             # list global configs
git config --system --show-origin             # list system configs
git config --global --show-origin user.name   # list a specific global config
```
  
- identity configs should be set after git is installed
```bash
git config --global user.name "Name Surname"
git config --global user.email "email@example.com"
```

- default editor
```bash
git config --global core.editor "vim"
```

- defualt branch name, "main" is commonly the default
```bash
git config --global init.defaultBranch "main"
```

### Help
- three equivalent ways to get the comprehensive manual page (manpage) help
```bash
git help pull     # git help <verb>
git pull --help   # git <verb> --help
man git-pull      # man git-<verb>
```

- for a quick refresher of the available options, no manpage
```bash
git pull -h   # git <verb> -h
```


## 3. Git Basics

### getting a repo

- init a new repo
```bash
git init                # init a new repo

# initial commit
git add *
git commit -m "Inintial commit"
```

- clone a repo
```bash
# git clone <url> - clone a repo to a dir named same as the repo name
git clone https://github.com/libgit2/libgit2

# git clone <url> <target_dir_name> - clone a repo to creates a dir named as specified 
git clone https://github.com/libgit2/libgit2 libgit2_repo
```

### check the status of the repo

```bash
git status          # comprehensive status
git status -s       # same as git status --short
git status --short  # short status
# output of --short: 
# XY  file_name 
# X: status in the staging area
# Y: status in the working directory 
# A     added
# M     modified
# D     deleted
# R     renamed
# C     copied
# U     updated but unmerged (conflict) 
# ?     untracked
# !     ignored
```

### tracking new files

```bash
# git add <pattern | files>
# git add: tracks new files, stages files, marks merge-conflicted files as resolved 
git add .
git add index.html
```

### ignoring files
create a file named `.gitignore` in the root of the repo. it will applies recursively to the entire repository.

additional `.gitignore` files in subdirs are possible.  
the rules in these files applies only to the files under dir where they are located

in a `.gitignore` file:
- blank lines or lines starting with # are ignored
- standard glob patterns work, and will be applied recursively throughout the entire working tree.
  | pattern | description |
  | ------- | ----------- |
  | `*`     | zero or more chars |
  | `?`     | a single char |
  | `**`    | nested dirs |
  | `[abc]` | any char inside the brackets |
  | `[0-9]` | any char between the specified range |
- start patterns with a forward slash (/) to avoid recursivity
- end patterns with a forward slash (/) to specify a directory
- negate a pattern by starting it with an exclamation point (!).

example:
```gitignore
# ignore all .a and .o and .log files
*.[ao]
*.log

# but do track lib.a, even though you're ignoring .a files above
!lib.a

# only ignore the TODO file in the current directory, not subdir/TODO
/TODO

# ignore all files in any directory named build
build/

# ignore doc/notes.txt, but not doc/server/arch.txt
doc/*.txt

# ignore all .pdf files in the doc/ directory and any of its subdirectories
doc/**/*.pdf
```

### diff
- what is changed but not staged yet?
- what is staged and about to be commited?
```bash
git diff            # changed but not changed yet | diff modified and staged
git diff --cached   # same as git diff --staged
git diff --staged   # staged | diff staged and last commit

git difftool                  # see diffs in graphical/external tool
git difftool --tool-help      # see what tools is available on your system
git difftool --tool=vimdiff   # use a specific tool | git difftool --tool=<tool>
```

### committing changes
```bash
git commit                        # launches editor specified by the EDITOR env var or git config core.editor
git commit -m "commit message"    # commit staged files with a commit message

# -a flag, skips staging area, commits modified and staged files
# automatically stages all modified & deleted tracked files before committing.
git commit -a                       # launches editor
git commit -a -m "commit message"   # with a commit message

git commit -v                       # puts diff of changes in the editor
```

### removing files
```bash
git rm file               # removes file from working dir and stages it for removal, the file becomes untracked
git rm --cached file      # keeps file in working dir and stages it for removal, the file becomes untracked
git rm -f file            # force delete a modified or staged file
git rm log/\*.log         # accepts files, dirs and file-globs patterns

# same as git rm file
rm file
git add file
```

### moving files
- git does not explicitly track file movement
- git figures out that it’s a rename implicitly, so it does not matter which way the file is moved
- these 2 methods are exactly the same
```bash
git mv file.txt file.md

# exactly same as git mv file.txt file.md
mv file.txt file.md
git rm file.txt
git add file.md
```

### viewing the commit history
```bash
# -2, -3, ...           show the last n commits
# --since, --after      show commits made after the specified date
# --until, --before     show commits made before the specified date
git log --since "2008-04-01"
git log --since "19 years 2 months 3 days"
git log --until "2008-04-01"
git log --until "19 years 2 months 3 days"
git log --until "19.years.2.months.3.days"
git log --until="19 years 2 months 3 days ago"
git log --until="19 weeks ago"
git log --until=19.years.2.months.3.days

# --author      show commits in which the author entry containing the specified string
# --committer   show commits in which the committer entry containing the specified string
# --grep        show commits with a commit message containing the string
# -S            show commits adding or removing code matching the string
# --all-match   show commits that matches all the above options (logical AND between them - the default is OR)
git log --auther "name" --author "another name"
git log --committer "surname"
git log --grep "first" --grep "fix"
git log -S "function_name"

# -p, --patch           show the diff (patch output)
# --stat                show abbreviated stats
# --shortstat           show short abbreviated stats
# --name-only           show the list of files modified
# --name-status         show the list of files affected with added/modified/deleted information
# --relative-date       show date in relative format
# --abbrev-commit       show abbreviated hash instead of full 40-chars hash
# --oneline             same as --pretty=oneline --abbrev-commit
# --graph               show ascii graph showing branch and merge history
# --decorate            show branches, tags, HEAD
# --pretty=<option>     show output in another formats, options: [oneline, short, full, fuller, format]

# --pretty=format:"Specifiers"    
# specifiers:
#     %H      Commit hash
#     %h      Abbreviated commit hash
#     %T      Tree hash
#     %t      Abbreviated tree hash
#     %P      Parent hashes
#     %p      Abbreviated parent hashes
#     %an     Author name
#     %ae     Author email
#     %ad     Author date (format respects the --date=option)
#     %ar     Author date, relative
#     %cn     Committer name
#     %ce     Committer email
#     %cd     Committer date
#     %cr     Committer date, relative
#     %s      Subject

git log -2 --pretty=format:"%h - %an - %ar - %s"
```

### undoing things
- add staged files to the last commit
- changes the commit message and the hash of the last commit
```bash
git commit --amend                # launches editor for a commit message
git commit --amend -m "message"   # amends with a commit message
```

- unstaging a staged file
- the `--` tells git that whats after it is a file/path not a ref (branch/tag/commit)
- without `--` git will try to handle the string after as a ref if it exists then a file/path
```bash
git restore --staged file.md    # modern, git 2.23.0
git reset HEAD file.md          # old way
git reset HEAD -- file.md       # old way
```

- unmodifying a modified file, replaces the file with the last staged or committed version
```bash
git restore file.md       # modern
git checkout -- file.md   # old way
```

### working with remotes
```bash
git remote                      # show configured remotes
git remote -v                   # show urls for remotes
git remote add shortname url    # add remote
git remote show origin          # inspect a remote | git remote show <remote>
git remote rename origin org    # rename a remote | git remote rename <remote> <new_name>
git remote remove origin        # remove a remote | git remote remove <remote>
git remote rm origin            # same as git remote remove

git fetch origin      # only downloads data, does not merge | git fetch <remote>
git pull origin       # fetch and merge | git pull <remote>
it push origin main   # push current branch to <remote> <branch> | git ush <remote> <branch>
```

### tagging

- tags are listed in alphabetical order
```bash
git tag             # list tags
git tag -l          # same as git tag
git tag --list      # same as git tag
git tag -l "v1.*"   # list tags matching a pattern
```

- there are 2 types of tags:
  - lightweight tag: like a branch that doesn't change, it is a pointer to a commit
  - annotated tag: stored as full objects in git database; checksummed; contains tagger name, email and date; have a tagging message, can be signed and verified
```bash
git tag tagname                         # creates a lightweight tag
git tag -a tagname -m "version 1.4"     # creates an annotated tag with a tagging message
git tag -a tagname                      # creates an annotated tag, launches editor for message
git tag -a tagname abc1234              # tagging a previous commit | git tag <tagname> <commit_hash>
git show tagname                        # show tag info
```

- git push does not pushes tags, tags need to be explicitly pushed
- there is no option to push only lightweight tags
```bash
git push origin tagname              # push a tag | git push <remote> <tagname>
git push origin --tags               # push all tags annotated and lightweight
git push origin --follow-tags        # push all annotated tags
```

- deleting a tag
```bash
git tag -d tagname                    # delete a tag
git push origin --delete tagname      # delete a tag from remote | git push <remote> --delete <tagname>

# the null value before the colon is being pushed to the remote tag name, effectively deleting it
git push origin :refs/tags/tagname    # another way to delete a tag from remote
```

- checking out tags
- in `detached HEAD` state, commits won't belong to any branch and will be unreachable except by commit hash
```bash
git checkout tagname              # checkout a tag, puts repo in "detached HEAD" state
git checkout -b branch tagname    # checkout a tag, creating a new branch
```

### git aliases
- to run an external command rather than a git subcommand, start the command with `!` char
```bash
git config --global alias.ci commit                 # git ci = git commit
git config --global alias.st status                 # git st = git status
git config --global alias.unstage "reset HEAD --"   # git unstage file = git reset HEAD -- file
git config --global alias.last "log -1 HEAD"        # git last = git log -1 HEAD
git config --global alias.visual "!gitk"            # git visual = gitk
```


## 4. Git Branching
- a branch is a lightweight movable pointer to a commit
- no branch is more special than any other branch, all branches are equal
- HEAD is a special pointer to a branch/commit, thats how git knows what branch we're on
- the HEAD branch moves forward when a commit is made

### listing branches
```bash
git branch                              # list all branches
git branch -v                           # list all branches with their last commit
git branch --merged                     # list branches merged into current branch (HEAD)
git branch --no-merged                  # list branches not merged into current branch (HEAD)
git branch --merged branch_name         # list branches merged into branch_name
git branch --no-merged branch_name      # list branches not merged into branch_name
git branch --merged <commit_hash>       # List branches whose commits are included in this commit
git branch --no-merged <commit_hash>    # List branches whose commits are not included in this commit
```

### creating a branch
- these commands create a branch **without** switching to it
```bash
git branch branch_name                  # create a branch at the current commit
git branch branch_name <commit_hash>    # create a branch at a specific commit
```

### switching to a branch
```bash
git switch branch_name            # switch to a branch, modern
git switch -c branch_name         # creata a branch and switch to it, modern
git switch --create branch_name   # -c is same as --create
git switch -                      # return to previously checked out branch

git checkout branch_name          # switch to a branch, old way
git checkout -b branch_name       # creata a branch and switch to it, old way
```

### merging a branch
- `fast-forward`: when merging `subBranch` into `mainBranch` and `subBranch` is directly ahead of `mainBranch`, git simply moves the pointer forward and no merge commit is made.
- merge commits are special in that they have more than one parent
```bash
git merge branch_name       # merge branch_name into current branch
```

### deleting a branch
```bash
git branch -d branch_name   # delete a merged branch
git branch -D branch_name   # force delete an unmerged branch
```

### renaming a branch
```bash
git branch --move old_name new_name         # renaming a branch locally
git push --set-upstream origin new_name     # pushing new branch name to remote, doesn't remove old name
git push origin --delete old_name           # deleting old branch name from remote
```

### resolving conflicts
```bash
git mergetool     # use an external tool to resolve conflicts
```

### remote branches

- `remote reference`: references (pointers) in the remote repo including branches, tags, ...etc.
```bash
git ls-remote <remote>        # full list of remote references explicitly
git remote show <remote>      # remote branches with additional info
```

### remote-tracking branches
- local references to the state of remote branches.
- we can't move them, git moves them whenever we do network communication to make sure they accurately represent the state of the remote repo
- names take the form `<remote>/<branch>`:
  - `main` is local
  - `origin/main` is remote
- `origin` is not special, it is just the default name when `git clone` is run
```bash
git clone <url>                   # cloning a repo, setting "origin" as the default remote name 
git clone -o remote_name <url>    # cloning a repo, setting remote_name as the remote name

git fetch remote_name             # updates remote-tracking branches, fetch everything the remote has that we don't
```

### pushing branches to remote
- `left side is local`:`right side is remote`
```bash
# git automatically expands it to: git push refs/heads/branch_name:refs/heads/branch_name
git push remote_name branch_name                # push a branch to remote
git push remote_name branch_name:branch_name    # push a branch to remote
```

- a local branch can be pushed into remote branch with a different name
```bash
git push remote_name local_branch_name:remote_branch_name
```

### save credential when using http
- stores username/password for about 15 mins (by default) temporarily in memory 
```bash
git config --global credential.helper cache.
```

### tracking branches
- creating a local branch for remote branch
- cheking out a local branch from a remote-tracking branch, automatically creates a `tracking branch` and the branch it tracks is called an `upstream branch`
```bash
git checkout -b localbranch remote/branch   # creates localbranch tracking remote/branch
git checkout --track remote/branch          # creates a local branch tracking a remote branch and matching its name
git checkout branchname                     # same as above, if branchname doesnt exist locally and exactly matches a name on only one remote

git branch -u remote/branchname                 # set the current local branch to track origin/branchname 
git branch --set-upstream-to remote/branchname  # same as git branch -u remote/branchname
```

- `@{U}` or `@{upstream}` shorthands can be used to reference the upstream branch of the current branch
```bash
git merge remote/branchname     # merges remote/branchname into its current local tracking branch
git merge @{u}                  # shorthand, same as above
git merge @{upstream}           # shorthand, same as above
```

- see what tracking branches set up
```bash
git branch -vv
```
- the info (commits ahead/behind) is since the last time we fetched, the command does not reach out to the server.
- fetch first to get the latest info
- fetched data for all branches
```bash
git fetch --all
git branch -vv
```

### pulling
- `fetch` does not merge, and will not modify the working dir at all
- `pull` in most cases is essentially fetch followed by a try to merge or rebase, depending on config
- `pull` works on the current branch

### deleting remote branches
- this removes the pointer from the server
- a garbage collection runs aftera while to clean up
- easy to recover if deleted by accident
```bash
git push origin --delete branchname
```

### rebasing
- in git there are 2 main ways to integrate changes from one branch to another: `merge` and `rebase`
- you rebase your current branch onto another branch
- the result of a `merge`/`rebase` is the same, it's only the history that is different 
```bash
git checkout featureBranch
git rebase main             # rebase featureBranch onto main 

git checkout main
git merge featureBranch     # now we can do a fast-forward merge
```

- rebasing a branch off another branch 
- replay patches from `feat` since it diverged from `server` onto `main`
- rebase `feat` onto `main` as if `feat` was based directly off `main`
```bash
git rebase --onto main server feat
```

- rebase `feat` onto `main` without checking out `feat` first
- this checks out `feat` for us and replays it onto `main`
```bash
git rebase main feat
```

- rebase instead of merge when pulling
```bash
git pull --rebase
git config --global pull.rebase true    # permanent

git fetch
git rebase remote/branch    # manual fetch + rebase
```
