# Github
https://github.com

## SSH Auth Key:
- Create a new ssh key
```bash
ssh-keygen -t ed25519 -C "email@examle.com"
```

- Add the contents of the `.pub` file to github
```bash
cat id_ed25519.pub
```

## GPG Signing Key:
- Generate a new GPG Key
- When asked, choose `ECC (sign and encrypt)`
```bash
gpg --full-generate-key
```

- List GPG keys
```bash
gpg --list-secret-keys --keyid-format=long
```

- Copy the GPG key ID: `sec 4096R/[GPG KEY ID]`
- Copy the GPG public key and add it to github
```bash
gpg --armor --export [GPG KEY ID]
```

- In git, unset previously set key format if any
```bash
git config --global --unset gpg.format
```

- configure git to use the key and sign all commits and tags by default
```bash
git config --global user.signingkey [GPG KEY ID]
git config --global commit.gpgsign true
git config --global tag.gpgSign true
```

## SSH config file
- Create a new file: `~/.ssh/config`
```bash
Host github.com
   HostName github.com
   IdentityFile ~/.ssh/f3yad_private_key
   IdentitiesOnly yes
   
Host github-f3yad
   HostName github.com
   IdentityFile ~/.ssh/f3yad_private_key
   IdentitiesOnly yes
```

- Test ssh connection
```bash
ssh -T git@github.com
ssh -T git@github-f3yad
```
